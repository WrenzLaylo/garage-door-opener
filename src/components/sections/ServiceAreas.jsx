import ScrollReveal from '../ui/ScrollReveal'
import { SUBURBS } from '../../constants'

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Where We Work</div>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Serving All of Greater Melbourne</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            We have technicians across Melbourne metro. Same-day and next-day bookings available in all suburbs below.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {SUBURBS.map(s => (
              <span key={s} className="suburb-badge">{s}</span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            Don't see your suburb? <strong style={{ color: 'var(--blue)' }}>Call us</strong> — we likely cover your area too.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
