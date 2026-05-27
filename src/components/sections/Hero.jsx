import { motion } from 'framer-motion'
import { Phone, ChevronRight, CheckCircle, Clock, Wrench } from 'lucide-react'
import { CONTACT } from '../../constants'

const FAULT_TYPES = [
  { label: 'Opener won\'t respond',           urgency: 'Urgent',   color: '#C2410C', bg: '#FFF0E8' },
  { label: 'Door stuck open or closed',       urgency: 'Urgent',   color: '#C2410C', bg: '#FFF0E8' },
  { label: 'Grinding or clicking noise',      urgency: 'Same-day', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Remote stopped working',          urgency: 'Same-day', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Motor runs but door won\'t move', urgency: 'Routine',  color: '#16A34A', bg: '#DCFCE7' },
  { label: 'Door reverses before closing',    urgency: 'Routine',  color: '#16A34A', bg: '#DCFCE7' },
]

const TRUST_ITEMS = [
  { icon: CheckCircle, text: 'No Fix, No Fee' },
  { icon: Clock,       text: '47-Min Avg Response' },
  { icon: Wrench,      text: '12-Month Warranty' },
  { icon: CheckCircle, text: 'All Brands Covered' },
]

export default function Hero() {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" style={{
      background: 'linear-gradient(180deg, #EBF2FB 0%, white 65%)',
      paddingTop: 60,
      paddingBottom: 96,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle, #C8DCEF 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.5,
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, black 40%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(520px, 0.95fr)', gap: 72, alignItems: 'center' }}
          className="hero-grid">

          {/* LEFT */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ marginBottom: 22 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 100, padding: '6px 14px 6px 8px',
                boxShadow: '0 2px 8px rgba(13,31,51,0.06)',
              }}>
                <span className="avail-dot" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--body)' }}>
                  Serving All Melbourne Suburbs
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(2.3rem, 4.3vw, 4.25rem)',
                lineHeight: 1.07, letterSpacing: '-0.03em',
                color: 'var(--heading)', marginBottom: 18,
              }}
            >
              Melbourne's{' '}
              <span style={{
                background: 'linear-gradient(135deg, #1A3D6B, #2563EB)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Garage Door<br />Opener</span>{' '}
              Specialists
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '1.08rem', color: 'var(--subtle)', lineHeight: 1.75, marginBottom: 30, maxWidth: 540 }}>
              Expert repair, installation and replacement of all opener brands.
              Same or next day service across Greater Melbourne.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
              <a href={CONTACT.phoneEmergencyRaw} className="btn-primary" style={{ padding: '13px 22px', fontSize: '0.93rem' }}>
                <Phone size={16} />
                <span>
                  <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, lineHeight: 1, textTransform: 'uppercase' }}>24/7 Emergency</span>
                  {CONTACT.phoneEmergency}
                </span>
              </a>
              <a href={CONTACT.phoneBusinessRaw} className="btn-outline" style={{ padding: '13px 22px', fontSize: '0.93rem' }}>
                <Phone size={16} />
                <span>
                  <span style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.7, lineHeight: 1, textTransform: 'uppercase' }}>Business Hours</span>
                  {CONTACT.phoneBusiness}
                </span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginBottom: 28 }}>
              <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--blue)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Or get a free quote online <ChevronRight size={16} />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} color="var(--blue)" />
                  <span style={{ fontSize: '0.83rem', color: 'var(--subtle)', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: technician photo */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-card-col"
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 24px 72px rgba(13,31,51,0.14)',
              border: '1.5px solid var(--border)',
              aspectRatio: '16/10',
              background: 'var(--off-white)',
            }}>
              <img
                src="/technician-repair.webp"
                alt="AGG Doors technician repairing a garage door opener"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Floating fault card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{
                position: 'absolute', bottom: -20, left: -20,
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 14, padding: '14px 18px',
                boxShadow: '0 10px 32px rgba(13,31,51,0.1)',
                minWidth: 220,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {FAULT_TYPES.slice(0, 3).map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--body)', fontWeight: 500 }}>{f.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700, color: f.color, background: f.bg, padding: '1px 7px', borderRadius: 100, whiteSpace: 'nowrap' }}>{f.urgency}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              style={{
                position: 'absolute', top: -16, right: -16,
                background: 'var(--blue)', borderRadius: 12, padding: '10px 16px',
                boxShadow: '0 8px 28px rgba(37,99,235,0.3)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'white', lineHeight: 1 }}>4.9 ★</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>732 Reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-card-col { position: relative; }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-card-col { display: none; }
        }
      `}</style>
    </section>
  )
}
