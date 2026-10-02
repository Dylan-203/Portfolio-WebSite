import { useEffect } from 'react'

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function Background() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return
    const root = document.documentElement
    let raf
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', e.clientX + 'px')
        root.style.setProperty('--my', e.clientY + 'px')
      })
    }
    addEventListener('pointermove', move)
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(520px circle at var(--mx) var(--my), rgba(31,77,58,.13), transparent 65%), radial-gradient(800px circle at 0% 0%, rgba(199,211,191,.55), transparent 60%)' }} />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] opacity-[.08] mix-blend-multiply" style={{ backgroundImage: grain }} />
    </>
  )
}
