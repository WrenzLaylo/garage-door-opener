<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const MAX_UPLOAD_BYTES = 8388608;
const MIN_SECONDS_TO_SUBMIT = 3;

$defaultConfig = [
    'elementor_endpoint' => 'https://garagedoorquote.net/wp-admin/admin-ajax.php',
    'turnstile_secret' => '',
    'allowed_origins' => [
        'https://garage-door-opener.com.au',
        'https://www.garage-door-opener.com.au',
    ],
    'rate_limit_dir' => sys_get_temp_dir() . '/gdo_quote_rate_limits',
];

$configPath = dirname(__DIR__) . '/quote-form-config.php';
$externalConfig = is_file($configPath) ? require $configPath : [];
$config = array_replace($defaultConfig, is_array($externalConfig) ? $externalConfig : []);

function respond(int $status, bool $ok, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

function field(string $key): string
{
    return trim((string)($_POST[$key] ?? ''));
}

function formField(string $key): string
{
    $fields = $_POST['form_fields'] ?? [];
    return is_array($fields) ? trim((string)($fields[$key] ?? '')) : '';
}

function clientIp(): string
{
    $candidates = [
        $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '',
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '',
        $_SERVER['REMOTE_ADDR'] ?? '',
    ];

    foreach ($candidates as $candidate) {
        $ip = trim(explode(',', $candidate)[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    return '0.0.0.0';
}

function requestOrigin(): string
{
    $origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
    if ($origin !== '') {
        return rtrim($origin, '/');
    }

    $referer = (string)($_SERVER['HTTP_REFERER'] ?? '');
    if ($referer === '') {
        return '';
    }

    $parts = parse_url($referer);
    if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
        return '';
    }

    return $parts['scheme'] . '://' . $parts['host'];
}

function ensureAllowedOrigin(array $allowedOrigins): void
{
    $origin = requestOrigin();
    if ($origin === '' || !in_array($origin, $allowedOrigins, true)) {
        respond(403, false, 'This form can only be submitted from the official website.');
    }
}

function validateOption(string $label, string $value, array $allowed): void
{
    if (!in_array($value, $allowed, true)) {
        respond(400, false, "Please choose a valid {$label}.");
    }
}

function verifyTurnstile(string $secret, string $token, string $ip): void
{
    if ($secret === '') {
        respond(500, false, 'Spam protection is not configured yet. Please call us directly.');
    }

    if ($token === '') {
        respond(400, false, 'Please complete the spam protection check.');
    }

    if (!function_exists('curl_init')) {
        respond(500, false, 'The form service is missing a required server extension.');
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip,
        ]),
    ]);

    $raw = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = is_string($raw) ? json_decode($raw, true) : null;
    if ($httpCode !== 200 || !is_array($data) || empty($data['success'])) {
        respond(403, false, 'Spam protection check failed. Please try again.');
    }
}

function rateStorePath(string $dir, string $bucket): string
{
    if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
        respond(500, false, 'The form service could not prepare rate limiting.');
    }

    return rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . hash('sha256', $bucket) . '.json';
}

function enforceRateLimit(string $dir, string $bucket, int $limit, int $windowSeconds, string $message): void
{
    $path = rateStorePath($dir, $bucket);
    $now = time();
    $handle = fopen($path, 'c+');
    if (!$handle) {
        respond(500, false, 'The form service could not check rate limits.');
    }

    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $events = is_string($raw) && $raw !== '' ? json_decode($raw, true) : [];
    $events = is_array($events) ? array_values(array_filter($events, fn($ts) => is_int($ts) && $ts > $now - $windowSeconds)) : [];

    if (count($events) >= $limit) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, false, $message);
    }

    $events[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($events));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

function uploadedPhoto(): ?array
{
    $files = $_FILES['form_fields'] ?? null;
    if (!is_array($files)) {
        return null;
    }

    $error = $files['error']['photos'] ?? UPLOAD_ERR_NO_FILE;
    if ($error === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if ($error !== UPLOAD_ERR_OK) {
        respond(400, false, 'The uploaded file could not be processed. Please try a smaller file.');
    }

    $tmpName = (string)($files['tmp_name']['photos'] ?? '');
    $name = basename((string)($files['name']['photos'] ?? 'upload'));
    $size = (int)($files['size']['photos'] ?? 0);
    $type = (string)($files['type']['photos'] ?? '');

    if ($size <= 0 || $size > MAX_UPLOAD_BYTES) {
        respond(400, false, 'Please upload a file smaller than 8 MB.');
    }

    $allowed = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
    $detected = function_exists('mime_content_type') ? (string)mime_content_type($tmpName) : $type;
    if (!in_array($detected, $allowed, true)) {
        respond(400, false, 'Please upload a PNG, JPG, WEBP, or PDF file.');
    }

    return ['tmp_name' => $tmpName, 'name' => $name, 'type' => $detected];
}

function forwardToElementor(string $endpoint, ?array $photo): void
{
    if (!function_exists('curl_init')) {
        respond(500, false, 'The form service is missing a required server extension.');
    }

    $payload = [];
    foreach ($_POST as $key => $value) {
        if ($key === '_gotcha' || $key === '_form_started_at' || $key === 'cf-turnstile-response') {
            continue;
        }

        if (is_array($value)) {
            foreach ($value as $innerKey => $innerValue) {
                $payload["{$key}[{$innerKey}]"] = (string)$innerValue;
            }
        } else {
            $payload[$key] = (string)$value;
        }
    }

    if ($photo) {
        $payload['form_fields[photos]'] = new CURLFile($photo['tmp_name'], $photo['type'], $photo['name']);
    }

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 25,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_REFERER => 'https://garage-door-opener.com.au/',
        CURLOPT_USERAGENT => 'Garage Door Opener Melbourne quote proxy',
    ]);

    $raw = curl_exec($ch);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($raw === false || $httpCode < 200 || $httpCode >= 300) {
        respond(502, false, 'The enquiry system did not accept the request. Please call us directly.');
    }

    $decoded = json_decode((string)$raw, true);
    if (is_array($decoded) && array_key_exists('success', $decoded) && !$decoded['success']) {
        respond(502, false, 'The enquiry system rejected the request. Please check your details and try again.');
    }

    respond(200, true, 'Quote request accepted.');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

ensureAllowedOrigin($config['allowed_origins']);

if (field('_gotcha') !== '') {
    respond(400, false, 'Submission rejected.');
}

$startedAt = (int)field('_form_started_at');
if ($startedAt <= 0 || time() - $startedAt < MIN_SECONDS_TO_SUBMIT) {
    respond(400, false, 'Please take a moment to complete the form before sending.');
}

$name = formField('full_name');
$email = formField('email');
$phone = formField('contact_number');
$suburb = formField('suburb');
$propertyType = formField('property_type');
$typeOfService = formField('type_of_service');
$serviceFor = formField('service_for');
$garageDoorType = formField('type_of_garage_door');
$gateType = formField('type_of_gate');
$concern = formField('describe_garage_door_concern');

if ($name === '' || $email === '' || $phone === '' || $suburb === '' || $concern === '') {
    respond(400, false, 'Please complete all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please enter a valid email address.');
}

if (!preg_match('/^[0-9()+#&*\-=.\s]{8,20}$/', $phone)) {
    respond(400, false, 'Please enter a valid contact number.');
}

$suburbs = ['Abbotsford','Airport West','Albert Park','Altona','Balwyn','Bentleigh','Berwick','Blackburn','Box Hill','Brighton','Broadmeadows','Brunswick','Camberwell','Carnegie','Carrum Downs','Caulfield','Cheltenham','Clayton','Coburg','Craigieburn','Cranbourne','Croydon','Dandenong','Doncaster','Epping','Essendon','Ferntree Gully','Footscray','Frankston','Glen Iris','Glen Waverley','Hampton','Hawthorn','Heidelberg','Hoppers Crossing','Ivanhoe','Keilor','Keysborough','Lilydale','Malvern','Melbourne','Mentone','Mitcham','Moorabbin','Mornington','Mount Waverley','Mulgrave','Narre Warren','Noble Park','Northcote','Oakleigh','Pakenham','Parkdale','Point Cook','Preston','Reservoir','Richmond','Ringwood','Rowville','Seaford','South Yarra','Springvale','St Kilda','Sunbury','Tarneit','Thomastown','Toorak','Wantirna','Werribee','Williamstown','Other'];

validateOption('suburb', $suburb, $suburbs);
validateOption('property type', $propertyType, ['Residential', 'Commercial']);
validateOption('service type', $typeOfService, ['Installation', 'Repair', 'Maintenance', 'Automation']);
validateOption('service for', $serviceFor, ['Garage Door', 'Gate', 'Motor', 'Remote']);
validateOption('garage door type', $garageDoorType, ['Roller Door', 'Panel Door', 'Tilt Door', 'Counterweight Tilt Door']);
validateOption('gate type', $gateType, ['Single Swing Gate', 'Dual Swing Gate', 'Sliding Gate']);

$rateDir = (string)$config['rate_limit_dir'];
$ip = clientIp();
enforceRateLimit($rateDir, 'ip-10m-' . $ip, 5, 600, 'Too many quote requests. Please wait a few minutes and try again.');
enforceRateLimit($rateDir, 'ip-24h-' . $ip, 20, 86400, 'Too many quote requests today. Please call us directly.');

verifyTurnstile((string)$config['turnstile_secret'], field('cf-turnstile-response'), $ip);

enforceRateLimit($rateDir, 'identity-24h-' . strtolower($email . '|' . $phone), 3, 86400, 'This contact has already sent several requests today. Please call us directly.');

forwardToElementor((string)$config['elementor_endpoint'], uploadedPhoto());
