import { useState, useEffect, useRef } from 'react'
import { experience } from '../content'

// The accent line fills as you scroll; each node lights up once the line reaches it
export default function Experience({ language }) {
  const t = experience[language]
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const [fill, setFill] = useState(0)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    let raf
    const update = () => {
      const el = listRef.current
      if (!el) return
      const y = Math.min(Math.max(innerHeight * 0.6 - el.getBoundingClientRect().top, 0), el.offsetHeight)
      setFill(y)
      setLit(itemRefs.current.filter((n) => n && n.offsetTop + 8 <= y).length)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [language])

  return (
    <section id="experience" className="relative z-10 flex justify-center px-6 py-16 md:px-16 md:py-24">
      <div className="w-full max-w-7xl md:grid md:grid-cols-12 md:gap-12">
        <div className="mb-12 md:col-span-4 md:mb-0">
          <h2 className="font-display text-4xl font-normal md:sticky md:top-28 md:text-6xl">{t.title}</h2>
        </div>

        <div ref={listRef} className="relative md:col-span-8">
          <div aria-hidden className="absolute left-[5px] top-0 h-full w-[2px] bg-ink/15" />
          <div aria-hidden className="absolute left-[5px] top-0 w-[2px] bg-accent" style={{ height: fill }} />

          {t.experiences.map((exp, i) => {
            const on = i < lit
            return (
              <div key={i} ref={(n) => (itemRefs.current[i] = n)}
                className={`relative pb-12 pl-12 transition-opacity duration-500 last:pb-0 md:pl-16 ${on ? 'opacity-100' : 'opacity-40'}`}>
                <span aria-hidden className={`absolute left-0 top-2 z-10 h-3 w-3 rounded-full border-2 transition-colors duration-500 ${on ? 'border-accent bg-accent' : 'border-ink/30 bg-paper'}`} />
                <div className="mb-2 text-sm text-accent">{exp.date}</div>
                <h3 className="mb-2 font-display text-3xl font-normal md:text-4xl">{exp.title}</h3>
                <div className="mb-4 text-lg text-ochre md:text-xl">{exp.company}</div>
                <p className="max-w-3xl text-base leading-relaxed text-ink/65 md:text-lg">{exp.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
