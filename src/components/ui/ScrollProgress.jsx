import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const total = document.documentElement.scrollHeight - window.innerHeight
        const pct = total > 0 ? scrolled / total : 0
        bar.style.transform = `scaleX(${pct})`
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

  return <div id="scroll-progress" />
}
