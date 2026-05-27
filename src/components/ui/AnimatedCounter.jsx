import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1800, decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const frameRef = useRef(null)
  const startRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setDisplay(parseFloat((value * eased).toFixed(decimals)))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(value)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [inView, value, duration, decimals])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString()
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}
