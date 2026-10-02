import { useEffect, useRef, useState } from 'react'

export default function CountUp({ value }) {
  const m = String(value).match(/^(\d+)(.*)$/)
  const end = m ? Number(m[1]) : 0
  const suffix = m ? m[2] : ''
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!m || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min((t - t0) / 1200, 1)
        setN(Math.round(end * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [end])

  return <span ref={ref}>{m ? n + suffix : value}</span>
}
