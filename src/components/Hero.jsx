import { useState, useEffect, useRef } from 'react'
import { hero, ui } from '../content'
import Magnetic from './ui/Magnetic'

const words = ['React', 'Node.js', 'PostgreSQL', 'PHP', 'Java', 'IoT', 'REST API', 'Vite', 'Tailwind CSS']

export default function Hero({ language }) {
  const t = hero[language]
  const u = ui[language]
  const [role, setRole] = useState(0)
  const nameRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % u.roles.length), 2600)
    return () => clearInterval(id)
  }, [u.roles.length])

  // The one signature interaction: letters soften and thicken as the cursor nears
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return
    const letters = [...nameRef.current.querySelectorAll('[data-l]')]
    let raf
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        letters.forEach((l) => {
          const r = l.getBoundingClientRect()
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
          const k = Math.max(0, 1 - d / 260)
          l.style.fontVariationSettings = `'wght' ${Math.round(320 + k * 240)}, 'SOFT' ${Math.round(k * 100)}`
        })
      })
    }
    addEventListener('pointermove', move)
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [language])

  const name = t.name.toLowerCase().split(' ')
  let n = 0

  return (
    <section id="hero" className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-28 pt-32 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <p className="inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white/45 px-4 py-1.5 text-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          {u.open}
        </p>

        <h1 ref={nameRef} className="mt-8 flex flex-wrap gap-x-[.25em] font-display text-[clamp(3.4rem,12vw,10.5rem)] font-light capitalize leading-[.92] tracking-tight">
          {name.map((w, i) => (
            <span key={w + i} className="block overflow-hidden pb-[.12em]">
              <span className="rise" style={{ '--d': `${i * 110}ms` }}>
                {[...w].map((c, j) => (
                  <span key={j} data-l style={{ fontVariationSettings: "'wght' 320, 'SOFT' 0", transition: 'font-variation-settings .2s' }}
                    className="inline-block">{n++ === 0 ? c.toUpperCase() : c}</span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 h-[1.4em] overflow-hidden font-display text-3xl italic text-accent md:text-5xl">
          <span key={role + language} className="rise">{u.roles[role]}</span>
        </div>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">{u.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic href="#projects" className="rounded-full bg-ink px-8 py-4 text-paper hover:bg-accent">{t.viewProjects}</Magnetic>
          <Magnetic href="#contact" className="rounded-full border border-ink/40 px-8 py-4 hover:border-accent hover:text-accent">{t.getInTouch}</Magnetic>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-ink/15 py-4">
        <div className="marquee flex w-max gap-10 font-display text-2xl italic text-ink/60">
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10">{w}<span className="text-accent">✺</span></span>
          ))}
        </div>
      </div>
    </section>
  )
}
