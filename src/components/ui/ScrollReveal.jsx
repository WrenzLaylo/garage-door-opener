import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const presets = {
  fadeUp:    { hidden: { opacity: 0, y: 28 },      visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },              visible: { opacity: 1 } },
  fadeLeft:  { hidden: { opacity: 0, x: -28 },      visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 28 },       visible: { opacity: 1, x: 0 } },
  scale:     { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } },
}

export default function ScrollReveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
  style = {},
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold })
  const variants = presets[preset] || presets.fadeUp

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
