// ─── Contact ──────────────────────────────────────────────────────
export const CONTACT = {
  phoneBusiness:    '(03) 8789 9371',
  phoneBusinessRaw: 'tel:0387899371',
  phoneEmergency:    '(03) 8789 9372',
  phoneEmergencyRaw: 'tel:0387899372',
  // Default used in Navbar / single-CTA spots
  phone:    '(03) 8789 9372',
  phoneTel: 'tel:0387899372',
  email:    'enquiries@aggdoors.com.au',
  address:  'Serving Greater Melbourne, VIC',
  hours:    'Mon–Fri: 9am–5pm | Emergency: 24/7',
  abn:      'ABN 27 106 103 315',
}

export const BUSINESS = {
  name:        'Garage Door Opener Melbourne',
  tagline:     'Melbourne\'s Opener Specialists',
  parent:      'AGG Doors',
  parentUrl:   'https://www.aggdoors.com.au',
  siteUrl:     'https://garage-door-opener.com.au',
  established: 2004,
}

// ─── Stats ────────────────────────────────────────────────────────
export const STATS = [
  { value: 15247, suffix: '+', label: 'Openers Repaired',  decimals: 0 },
  { value: 20,    suffix: '+', label: 'Years Experience',  decimals: 0 },
  { value: 4.9,   suffix: '★', label: 'Google Rating',     decimals: 1 },
  { value: 47,    suffix: 'm', label: 'Avg Response Time', decimals: 0 },
]

// ─── Services ─────────────────────────────────────────────────────
export const SERVICES = [
  {
    id:       'repair',
    icon:     'Wrench',
    title:    'Opener Repair',
    desc:     'Motor failures, stripped gears, control boards, broken drive chains — diagnosed and fixed on the first visit. We carry all parts on every van.',
    badge:    'Most Common',
    features: ['All brands', 'Same-day parts', '12-month warranty'],
  },
  {
    id:       'emergency',
    icon:     'AlertTriangle',
    title:    '24/7 Emergency Repair',
    desc:     'Door stuck open overnight? Security risk? We have technicians on call around the clock for urgent same-day callouts across Melbourne.',
    badge:    'Emergency',
    features: ['47-min avg response', 'Available now', 'All suburbs'],
  },
  {
    id:       'motor',
    icon:     'Settings',
    title:    'Motor & Drive Repair',
    desc:     'Chain, belt, and screw drive motor faults fixed on the spot. We rebuild or replace drive assemblies for all major opener brands.',
    badge:    null,
    features: ['Chain & belt drive', 'Motor rebuild', 'Drive assembly'],
  },
  {
    id:       'remote',
    icon:     'Radio',
    title:    'Remote & Sensor Repair',
    desc:     'Remotes not responding, sensors misaligned, keypads dead — we diagnose and fix all control system faults including smart Wi-Fi openers.',
    badge:    null,
    features: ['All remotes', 'Safety sensors', 'Smart systems'],
  },
  {
    id:       'replacement',
    icon:     'RefreshCw',
    title:    'Opener Replacement',
    desc:     'When repair isn\'t viable, we replace with a better, quieter, smarter unit — supply and install included, all remotes programmed.',
    badge:    null,
    features: ['All brands', 'Remotes included', 'Same-day install'],
  },
  {
    id:       'installation',
    icon:     'Zap',
    title:    'New Installation',
    desc:     'No opener yet? We supply and professionally install all major brands including smart Wi-Fi models compatible with Google Home and Alexa.',
    badge:    null,
    features: ['All drive types', 'Smart Wi-Fi', 'Fully tested'],
  },
]

// ─── Brands ───────────────────────────────────────────────────────
export const BRANDS = [
  { name: 'B&D',          subtitle: 'Merlin Series' },
  { name: 'Chamberlain',  subtitle: 'myQ Smart' },
  { name: 'ATA',          subtitle: 'Toro & Ptero' },
  { name: 'Dominator',    subtitle: 'All models' },
  { name: 'Grifco',       subtitle: 'Commercial & Residential' },
  { name: 'Marantec',     subtitle: 'German Engineering' },
  { name: 'FAAC',         subtitle: 'Italian Design' },
  { name: 'Automatic Technology', subtitle: 'ATA Group' },
]

// ─── How It Works ─────────────────────────────────────────────────
export const STEPS = [
  {
    num:   '01',
    title: 'Call or Book Online',
    desc:  'Describe the fault — door stuck, opener not responding, noisy motor, anything. We\'ll confirm a same-day or emergency booking within minutes.',
  },
  {
    num:   '02',
    title: 'Tech Arrives Fast',
    desc:  'A fully-stocked van is dispatched directly to you. Our average Melbourne metro arrival time is 47 minutes for emergency callouts.',
  },
  {
    num:   '03',
    title: 'Diagnosed & Fixed',
    desc:  '94% of opener faults are fixed on the first visit. We carry parts for all major brands — no waiting, no second trips.',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name:   'Chris B.',
    suburb: 'Box Hill',
    rating: 5,
    text:   'Our opener stopped responding and the door was stuck half open. The technician arrived the same day, replaced the faulty control board and had everything working again before dinner.',
  },
  {
    name:   'Lisa M.',
    suburb: 'Glen Waverley',
    rating: 5,
    text:   'The remote and wall button both failed after a power surge. AGG Doors diagnosed it quickly, reset the limits, replaced the receiver and programmed two remotes on the spot.',
  },
  {
    name:   'Peter H.',
    suburb: 'Ringwood',
    rating: 5,
    text:   'Old opener died completely. They came out the same day with a replacement unit, had it installed and running within 90 minutes. Great price too — well worth it.',
  },
  {
    name:   'Angela T.',
    suburb: 'Doncaster',
    rating: 5,
    text:   'Our garage door kept reversing before it closed. They realigned the safety sensors, serviced the opener and explained what had caused the fault. Honest, quick and very professional.',
  },
  {
    name:   'Mark S.',
    suburb: 'Camberwell',
    rating: 5,
    text:   'Second time using AGG Doors. First rate service again - noisy motor repaired, chain tension adjusted and three remotes reprogrammed. Everything works perfectly.',
  },
  {
    name:   'Rachel W.',
    suburb: 'Brighton',
    rating: 5,
    text:   'Booked online Monday morning, technician arrived Tuesday. Replaced our 15-year old opener with a quiet belt drive. The difference is night and day. Highly recommend.',
  },
]

// ─── Why Us ───────────────────────────────────────────────────────
export const WHY_US = [
  {
    icon:  'Award',
    title: '20+ Years Experience',
    desc:  'Thousands of opener repairs, replacements and installations completed across Melbourne by trained, licensed technicians.',
  },
  {
    icon:  'ShieldCheck',
    title: '12-Month Warranty',
    desc:  'Repair parts, replacement units and installation labour are backed by a 12-month workmanship warranty.',
  },
  {
    icon:  'Star',
    title: '4.9★ Google Rated',
    desc:  'Over 700 verified Google reviews from Melbourne homeowners. Our reputation is built on consistent quality.',
  },
  {
    icon:  'Zap',
    title: 'Same or Next Day',
    desc:  'Our vans carry common opener parts and replacement units, so most faults are fixed on the first visit.',
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────
export const FAQ = [
  {
    q: 'How much does garage door opener repair cost in Melbourne?',
    a: 'Most opener repairs depend on the fault, parts required and door condition. Common remote, sensor and limit issues are usually cheaper than motor, board or drive assembly repairs. We inspect the opener first and provide a firm quote before work starts.',
  },
  {
    q: 'Can you fix a garage door opener on the same day?',
    a: 'Yes - same-day repair is available across Greater Melbourne whenever a technician is nearby. Our vans carry common parts for Merlin, B&D, Chamberlain, ATA and other major opener brands.',
  },
  {
    q: 'What are the most common garage door opener faults?',
    a: 'Common faults include remotes not responding, safety sensors misaligned, doors reversing before closing, noisy motors, worn gears, broken drive chains or belts, and motors running without moving the door.',
  },
  {
    q: 'Which garage door opener brand is best in Australia?',
    a: 'B&D (Merlin), Chamberlain, and ATA are Australia\'s most popular and reliable brands. All carry Australian warranties and have readily available parts. We can recommend the best fit for your door and budget.',
  },
  {
    q: 'When should I replace instead of repair my opener?',
    a: 'Replacement is usually better when the motor is very old, parts are no longer available, the opener is unsafe, or repair costs approach the price of a newer quieter unit. We will always explain both options before you decide.',
  },
  {
    q: 'How much does garage door opener installation cost in Melbourne?',
    a: 'Installation typically costs $450-$900 depending on the brand and drive type chosen. Chain drive openers are most affordable, belt drive quieter, and direct drive the most premium. We provide a firm quote before any work - no surprises.',
  },
  {
    q: 'Can you install a smart Wi-Fi garage door opener?',
    a: 'Yes - we install and fully set up smart openers including Chamberlain myQ, B&D Connecta, and others. We will connect the app to your phone, set up delivery alerts, and integrate with Google Home or Alexa if you want.',
  },
  {
    q: 'Do you service all suburbs of Melbourne?',
    a: 'Yes - we cover all of Greater Melbourne including the Eastern, Western, Northern, and South-Eastern suburbs plus the Mornington Peninsula. Same-day and next-day bookings are available across the metro area.',
  },
]

// ─── Service Areas ────────────────────────────────────────────────
export const SUBURBS = [
  'Box Hill', 'Ringwood', 'Doncaster', 'Camberwell', 'Glen Waverley',
  'Blackburn', 'Nunawading', 'Mitcham', 'Vermont', 'Wantirna',
  'Bayswater', 'Croydon', 'Lilydale', 'Mooroolbark', 'Donvale',
  'Templestowe', 'Bulleen', 'Warrandyte', 'Eltham', 'Greensborough',
  'Bundoora', 'Preston', 'Thornbury', 'Northcote', 'Brunswick',
  'Coburg', 'Reservoir', 'Heidelberg', 'Ivanhoe', 'Kew',
  'Hawthorn', 'Richmond', 'Fitzroy', 'Carlton', 'Dandenong',
  'Frankston', 'Moorabbin', 'Brighton', 'Bayside', 'Mentone',
]
