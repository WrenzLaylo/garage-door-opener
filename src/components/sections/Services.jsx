import { Wrench, RefreshCw, Smartphone, Settings, Radio, Shield, AlertTriangle, Zap } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { SERVICES, CONTACT } from '../../constants'

const ICONS = { Wrench, RefreshCw, Smartphone, Settings, Radio, Shield, AlertTriangle, Zap }

// Map service IDs to their photos
const SERVICE_IMAGES = {
  repair:       '/opener-motor.webp',
  emergency:    '/service-emergency-repair.webp',
  motor:        '/service-motor-drive-repair.webp',
  remote:       '/smart-remote.webp',
  replacement:  '/residential-garage.webp',
  installation: '/service-new-installation.webp',
}

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>What We Do</div>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Opener Services We Provide</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            From brand new installations to smart upgrades and repairs — we handle every aspect of garage door openers.
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Wrench
            const img  = SERVICE_IMAGES[s.id]
            return (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <div className="card" style={{ height: '100%', position: 'relative', padding: 0, overflow: 'hidden' }}>
                  {/* Photo strip — only for cards that have an image */}
                  {img && (
                    <div style={{ height: 160, overflow: 'hidden', borderRadius: '14px 14px 0 0' }}>
                      <img src={img} alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}

                  <div style={{ padding: '22px 24px 24px' }}>
                    {s.badge && (
                      <div style={{
                        position: 'absolute', top: img ? 136 : 20, right: 20,
                        background: s.badge === 'Emergency' ? 'var(--amber)' : 'var(--blue)',
                        color: 'white', fontSize: '0.68rem', fontWeight: 700,
                        fontFamily: 'var(--font-display)', letterSpacing: '0.08em',
                        textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                      }}>{s.badge}</div>
                    )}

                    {!img && (
                      <div style={{
                        width: 48, height: 48, background: 'var(--blue-light)',
                        borderRadius: 12, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: 18,
                      }}>
                        <Icon size={22} color="var(--blue)" />
                      </div>
                    )}

                    {img && (
                      <div style={{
                        width: 40, height: 40, background: 'var(--blue-light)',
                        borderRadius: 10, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: 14,
                      }}>
                        <Icon size={18} color="var(--blue)" />
                      </div>
                    )}

                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10, color: 'var(--heading)' }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--subtle)', lineHeight: 1.65, marginBottom: 16 }}>{s.desc}</p>
                    <ul className="feature-list">
                      {s.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={CONTACT.phoneTel} className="btn-primary" style={{ fontSize: '1rem' }}>
            Book a Service Today
          </a>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
