import { Phone, Mail, MapPin } from 'lucide-react'
import { CONTACT, BUSINESS } from '../../constants'

const NAV_COLS = [
  {
    title: 'Services',
    links: [
      { label: 'New Installation',   href: '#services' },
      { label: 'Opener Replacement', href: '#services' },
      { label: 'Smart Upgrades',     href: '#services' },
      { label: 'Opener Repair',      href: '#services' },
      { label: 'Remote Programming', href: '#services' },
      { label: 'Annual Servicing',   href: '#services' },
    ],
  },
  {
    title: 'Service Areas',
    links: [
      { label: 'Eastern Suburbs',     href: '#service-areas' },
      { label: 'Western Suburbs',     href: '#service-areas' },
      { label: 'Northern Suburbs',    href: '#service-areas' },
      { label: 'South-East Suburbs',  href: '#service-areas' },
      { label: 'Inner Melbourne',     href: '#service-areas' },
      { label: 'Mornington Peninsula',href: '#service-areas' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Choose Us',  href: '#why-us' },
      { label: 'Reviews',        href: '#testimonials' },
      { label: 'FAQ',            href: '#faq' },
      { label: 'Get a Quote',    href: '#contact' },
      { label: 'AGG Doors',      href: BUSINESS.parentUrl, external: true },
    ],
  },
]

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ background: 'var(--heading)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
      {/* Top section */}
      <div className="container" style={{ padding: '64px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}
          className="footer-grid">

          {/* Brand column */}
          <div>
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img
                src="/logo-icon.png"
                alt="Garage Door Opener Melbourne"
                style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'white', lineHeight: 1.1 }}>
                  Garage Door Opener
                </div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(37,99,235,0.9)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                  Melbourne
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 24, maxWidth: 260 }}>
              Melbourne's trusted garage door opener specialists. Installation, repair and replacement — done right.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: Phone, value: CONTACT.phone,   href: CONTACT.phoneTel },
                { icon: Mail,  value: CONTACT.email,   href: `mailto:${CONTACT.email}` },
                { icon: MapPin,value: CONTACT.address, href: null },
              ].map(({ icon: Icon, value, href }) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={14} color="rgba(37,99,235,0.8)" />
                  {href
                    ? <a href={href} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'white'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                      >{value}</a>
                    : <span style={{ fontSize: '0.85rem' }}>{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '0.78rem', color: 'white',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: 18,
              }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.external
                      ? <a href={link.href} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'white'}
                          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                        >{link.label} ↗</a>
                      : <a href={link.href}
                          onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                          style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'white'}
                          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                        >{link.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{
          padding: '20px 24px',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. {CONTACT.abn}
          </p>

          {/* Powered by AGG Doors */}
          <a
            href={BUSINESS.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by AGG Doors"
            style={{ opacity: 0.45, transition: 'opacity 0.25s', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.45}
          >
            <img
              src="/Powered_by_AGGDoors.png"
              alt="Powered by AGG Doors"
              style={{ height: 30, width: 'auto', objectFit: 'contain', mixBlendMode: 'screen', filter: 'brightness(1.1)' }}
            />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
