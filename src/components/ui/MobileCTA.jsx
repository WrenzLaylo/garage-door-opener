import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ChevronRight } from 'lucide-react'
import { CONTACT } from '../../constants'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="mobile-cta-bar"
          style={{ gap: 10 }}
        >
          <a href={CONTACT.phoneTel} className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}>
            <Phone size={17} /> Call Now — 24/7
          </a>
          <a href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center', padding: '13px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 8, textDecoration: 'none', color: 'white' }}>
            Free Quote <ChevronRight size={15} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
