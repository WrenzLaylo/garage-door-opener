import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { FAQ as FAQ_DATA, CONTACT } from '../../constants'

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div style={{
      border: '1.5px solid',
      borderColor: open ? 'var(--blue)' : 'var(--border)',
      borderRadius: 12,
      overflow: 'hidden',
      background: 'white',
      transition: 'border-color 0.2s',
      boxShadow: open ? '0 4px 20px rgba(37,99,235,0.08)' : 'none',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
          gap: 16,
        }}
        aria-expanded={open}
      >
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1rem', color: open ? 'var(--blue)' : 'var(--heading)',
          lineHeight: 1.4, transition: 'color 0.2s',
        }}>{q}</span>
        <div style={{
          width: 28, height: 28, flexShrink: 0,
          background: open ? 'var(--blue)' : 'var(--light)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'background 0.2s',
        }}>
          {open
            ? <Minus size={14} color="white" />
            : <Plus size={14} color="var(--subtle)" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.93rem', color: 'var(--subtle)', lineHeight: 1.75, paddingTop: 16 }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}
          className="faq-grid">
          <ScrollReveal preset="fadeLeft">
            <div style={{ position: 'sticky', top: 100 }}>
              <div className="section-label">FAQ</div>
              <h2 className="section-title">Common Questions</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--subtle)', lineHeight: 1.7, marginBottom: 28 }}>
                Everything you need to know about garage door opener installation, repair and replacement in Melbourne.
              </p>
              <a href={CONTACT.phoneTel} className="btn-primary">
                Still have questions?
              </a>
            </div>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ_DATA.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <FAQItem q={item.q} a={item.a} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 780px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .faq-grid > *:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}
