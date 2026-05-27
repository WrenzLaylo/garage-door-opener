// ─── StatsBar ─────────────────────────────────────────────────────
import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import { STATS } from '../../constants'

export function StatsBar() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #0D1F33 0%, #1A3D6B 100%)', padding: '48px 0', borderTop: '4px solid var(--amber)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}
          className="stats-grid">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div style={{ padding: '8px 0' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  color: 'white', lineHeight: 1, marginBottom: 6,
                }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {s.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
