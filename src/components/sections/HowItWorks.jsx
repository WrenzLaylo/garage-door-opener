import ScrollReveal from '../ui/ScrollReveal'
import { STEPS, CONTACT } from '../../constants'
import { Phone } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ background: 'white' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>The Process</div>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Simple as 1, 2, 3</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Getting a new opener installed or repaired is straightforward. Here's how it works.
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}
          className="how-grid">

          {/* Left: residential garage photo */}
          <ScrollReveal preset="fadeLeft">
            <div style={{
              borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 20px 56px rgba(13,31,51,0.1)',
              border: '1.5px solid var(--border)',
              aspectRatio: '4/3',
              background: 'var(--off-white)',
            }}>
              <img
                src="/process-opener-service.webp"
                alt="Garage door opener technician arriving for a Melbourne opener service appointment"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </ScrollReveal>

          {/* Right: steps */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}
              className="steps-list">
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.15}>
                  <div style={{
                    display: 'flex', gap: 20, alignItems: 'flex-start',
                    paddingBottom: i < STEPS.length - 1 ? 32 : 0,
                    position: 'relative',
                  }}>
                    {/* Line connector */}
                    {i < STEPS.length - 1 && (
                      <div style={{
                        position: 'absolute', left: 27, top: 52, bottom: 0,
                        width: 2, background: 'var(--border)',
                        borderRadius: 1,
                      }} />
                    )}

                    {/* Number circle */}
                    <div style={{
                      width: 56, height: 56, flexShrink: 0,
                      background: 'var(--blue)', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
                      zIndex: 1,
                    }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'white' }}>
                        {step.num}
                      </span>
                    </div>

                    <div style={{ paddingTop: 10 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, color: 'var(--heading)' }}>
                        {step.title}
                      </h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--subtle)', lineHeight: 1.7 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <a href={CONTACT.phoneEmergencyRaw} className="btn-primary"
                style={{ marginTop: 36, fontSize: '0.95rem', padding: '13px 24px' }}>
                <Phone size={16} /> Book Now
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .how-grid > *:first-child { display: none; }
        }
      `}</style>
    </section>
  )
}
