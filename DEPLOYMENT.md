# Manual cPanel Deployment

Run the production build locally:

```bash
npm run build
```

Upload and extract:

```text
build-artifacts/garage-door-opener-site.zip
```

into the live document root for `garage-door-opener.com.au`.

## Contact Form Config

The frontend posts to:

```text
/quote-submit.php
```

The deployed `quote-submit.php` looks for this private server file:

```text
quote-form-config.php
```

It should live one folder above the public website files, not inside the public document root. This file is intentionally ignored by git because it contains the Cloudflare Turnstile secret and form endpoint settings.

Example cPanel layout:

```text
/home/southeas/quote-form-config.php
/home/southeas/garage-door-opener.com.au/index.html
/home/southeas/garage-door-opener.com.au/quote-submit.php
```
