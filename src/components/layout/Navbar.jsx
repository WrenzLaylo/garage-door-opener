import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronRight } from 'lucide-react'
import { CONTACT } from '../../constants'

const NAV_LINKS = [
  { label: 'Services',      href: '#services' },
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'Brands',        href: '#brands' },
  { label: 'Reviews',       href: '#testimonials' },
  { label: 'Service Areas', href: '#service-areas' },
  { label: 'FAQ',           href: '#faq' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50
        if (scrolledRef.current !== nextScrolled) {
          scrolledRef.current = nextScrolled
          setScrolled(nextScrolled)
        }
        frame = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'white',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(15,23,42,0.08)' : 'none',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/logo-icon.png"
              alt="Garage Door Opener Melbourne logo"
              style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--heading)', lineHeight: 1.1 }}>
                Garage Door Opener
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--blue)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1, marginTop: 2 }}>
                Melbourne
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  color: 'var(--subtle)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.target.style.color = 'var(--blue)'; e.target.style.background = 'var(--blue-light)' }}
                onMouseLeave={e => { e.target.style.color = 'var(--subtle)'; e.target.style.background = 'transparent' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href={CONTACT.phoneEmergencyRaw} className="btn-primary hide-mobile" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            <Phone size={15} />
            <span>
              <span style={{ display: 'block', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', opacity: 0.8, lineHeight: 1, textTransform: 'uppercase' }}>24/7 Emergency</span>
              {CONTACT.phoneEmergency}
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="show-mobile"
            style={{
              display: 'flex',
              background: 'var(--light)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 8,
              color: 'var(--heading)',
              cursor: 'pointer',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 48, backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(300px, 85vw)',
                background: 'white',
                borderLeft: '1px solid var(--border)',
                zIndex: 49,
                padding: '80px 28px 32px',
                display: 'flex', flexDirection: 'column', gap: 4,
                overflowY: 'auto',
              }}
            >
              <button onClick={() => setMobileOpen(false)}
                style={{ position: 'absolute', top: 18, right: 18, background: 'var(--light)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--heading)' }}>
                <X size={20} />
              </button>

              {NAV_LINKS.map((link, i) => (
                <motion.a key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.1rem', color: 'var(--heading)',
                    textDecoration: 'none', padding: '13px 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  {link.label} <ChevronRight size={16} color="var(--muted)" />
                </motion.a>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={CONTACT.phoneTel} className="btn-primary" style={{ justifyContent: 'center' }}>
                  <Phone size={16} /> {CONTACT.phone}
                </a>
                <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                  className="btn-outline" style={{ justifyContent: 'center' }}>
                  Get a Free Quote
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
