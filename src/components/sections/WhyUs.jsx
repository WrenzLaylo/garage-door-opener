import { Award, ShieldCheck, Star, Zap } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { WHY_US, CONTACT } from '../../constants'

const ICONS = { Award, ShieldCheck, Star, Zap }

export default function WhyUs() {
  return (
    <section id="why-us" className="section" style={{
      background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="why-grid">

          {/* Left: team photo + text */}
          <ScrollReveal preset="fadeLeft">
            {/* Team photo */}
            <div style={{
              borderRadius: 16, overflow: 'hidden', marginBottom: 32,
              boxShadow: '0 20px 56px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.15)',
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.05)',
            }}>
              <img
                src="/team-van.webp"
                alt="AGG Doors team with service van"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', display: 'inline-block', width: 20, height: 2, borderRadius: 1 }} />
              Why Choose Us
            </div>
            <h2 className="section-title" style={{ color: 'white', marginBottom: 20 }}>
              The Melbourne Opener Experts You Can Trust
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 32 }}>
              With over 20 years serving Melbourne homeowners, we've built our reputation on doing the job right the first time. No shortcuts, no upsells — just honest, expert service.
            </p>
            <a href={CONTACT.phoneTel} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: 'var(--blue)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem',
              padding: '13px 24px', borderRadius: 8, textDecoration: 'none',
              transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Call Us Today
            </a>
          </ScrollReveal>

          {/* Right: cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {WHY_US.map((item, i) => {
              const Icon = ICONS[item.icon] || Award
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14, padding: '22px 20px',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  >
                    <div style={{
                      width: 40, height: 40, background: 'rgba(255,255,255,0.15)',
                      borderRadius: 10, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', marginBottom: 14,
                    }}>
                      <Icon size={20} color="white" />
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: 6 }}>
                      {item.title}
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
