import ScrollReveal from '../ui/ScrollReveal'
import { BRANDS } from '../../constants'

export default function Brands() {
  const doubled = [...BRANDS, ...BRANDS]

  return (
    <section id="brands" style={{ background: 'var(--off-white)', padding: '72px 0', overflow: 'hidden' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Brands We Work With</div>
          <h2 className="section-title" style={{ margin: '0 auto 12px' }}>All Major Opener Brands</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            We install, service and repair every major garage door opener brand available in Australia.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee strip */}
      <div style={{ overflow: 'hidden', marginTop: 32 }}>
        <div className="marquee-track">
          {doubled.map((brand, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '20px 40px',
              borderRight: '1px solid var(--border)',
              minWidth: 180,
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '1.1rem', color: 'var(--heading)',
                whiteSpace: 'nowrap',
              }}>{brand.name}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>{brand.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
