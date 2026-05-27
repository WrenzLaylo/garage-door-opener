import { Star } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { TESTIMONIALS } from '../../constants'

function StarRow({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[...Array(count)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ background: 'white' }}>
      <div className="container">

        {/* Happy customer banner */}
        <ScrollReveal>
          <div style={{
            borderRadius: 20, overflow: 'hidden', marginBottom: 56,
            position: 'relative', height: 280,
            boxShadow: '0 12px 40px rgba(13,31,51,0.12)',
          }}>
            <img
              src="/happy-customer.webp"
              alt="Happy Melbourne homeowners with their new garage door opener"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
            {/* Overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.3) 60%, transparent 100%)',
            }} />
            {/* Text on photo */}
            <div style={{
              position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)',
              maxWidth: 440,
            }}>
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 10 }}>Customer Reviews</div>
              <h2 className="section-title" style={{ color: 'white', margin: '0 0 12px', fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}>
                What Melbourne Homeowners Say
              </h2>
              {/* Google badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 100, padding: '8px 16px',
              }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'white' }}>
                  4.9 out of 5
                </span>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>732 Google Reviews</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Review cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="reviews-grid">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <div className="card" style={{ height: '100%' }}>
                <StarRow count={t.rating} />
                <p style={{ fontSize: '0.92rem', color: 'var(--body)', lineHeight: 1.7, margin: '14px 0 18px', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--blue)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.suburb}, Melbourne</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .reviews-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) {
          .reviews-banner-text { left: 20px !important; }
        }
      `}</style>
    </section>
  )
}
