import { useState, useEffect } from 'react'
import { projects, caseUi } from '../content'
import { matches } from '../lib/match'
import EnergyDemo from './ui/EnergyDemo'

// Screenshots live in src/assets/covers and are referenced by `cover` in the content.
// Projects without one get a generated cover (color + pattern + initials)
const images = import.meta.glob('../assets/covers/*', { eager: true, import: 'default' })
// No screenshots yet: each project gets a generated cover (color + pattern + initials)
const bgs = ['bg-accent', 'bg-ink', 'bg-ochre']
const pats = [
  'repeating-radial-gradient(circle at 80% 20%, rgba(242,239,230,.2) 0 2px, transparent 2px 22px)',
  'repeating-linear-gradient(135deg, rgba(242,239,230,.18) 0 2px, transparent 2px 18px)',
  'linear-gradient(rgba(242,239,230,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,230,.18) 1px, transparent 1px)'
]
const initials = (t) => {
  const latin = t.match(/[A-Za-z]+/g)
  return latin ? latin.slice(0, 3).map((w) => w[0]).join('') : t.slice(0, 2)
}

const coverClass = (p) => (p.cover ? 'aspect-[2.1/1]' : 'aspect-[16/10]')

function Cover({ p, i, className = '' }) {
  const src = p.cover && images[`../assets/covers/${p.cover}`]
  if (src) {
    return (
      <div className={`overflow-hidden border border-ink/15 bg-white ${className}`}>
        <img src={src} alt={`${p.title} screenshot`} loading="lazy" className="h-full w-full object-cover object-top" />
      </div>
    )
  }
  return (
    <div className={`relative overflow-hidden ${bgs[i % 3]} ${className}`}
      style={{ backgroundImage: pats[i % 3], backgroundSize: i % 3 === 2 ? '28px 28px' : undefined }}>
      <span className="absolute bottom-3 left-6 font-display text-7xl font-normal tracking-tight text-paper md:text-8xl">{initials(p.title)}</span>
    </div>
  )
}

function Modal({ p, i, language, onClose }) {
  const c = caseUi[language]
  useEffect(() => {
    const key = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', key)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [onClose])

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 md:items-center md:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()}
        className="pop max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-paper md:rounded-[28px]">
        <div className="relative">
          <Cover p={p} i={i} className={p.cover ? coverClass(p) : 'h-44'} />
          <button autoFocus onClick={onClose} className="absolute right-4 top-4 rounded-full bg-paper px-4 py-2 text-sm">{c.close}</button>
        </div>
        <div className="space-y-6 p-8">
          <h3 className="font-display text-4xl font-light md:text-5xl">{p.title}</h3>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag) => <span key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">{tag}</span>)}
          </div>
          <p className="max-w-2xl leading-relaxed text-ink/75">{p.description}</p>
          {['problem', 'role', 'result'].map((k) => p[k] && (
            <div key={k}><h4 className="font-display text-xl text-accent">{c[k]}</h4><p className="mt-1 max-w-2xl text-ink/75">{p[k]}</p></div>
          ))}
          {/energy|能耗|能源/i.test(p.title) && <EnergyDemo language={language} />}
          {p.links && (
            <div className="flex gap-6 text-accent underline underline-offset-4">
              {p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer">{c.github}</a>}
              {p.links.demo && <a href={p.links.demo} target="_blank" rel="noreferrer">{c.demo}</a>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ language, active, setActive }) {
  const t = projects[language]
  const c = caseUi[language]
  const [sel, setSel] = useState(null)
  const open = (i) => setSel(i)

  return (
    <section id="projects" className="relative z-10 flex justify-center px-6 py-16 md:px-16 md:py-24">
      <div className="w-full max-w-7xl">
        <h2 className="mb-4 font-display text-4xl font-normal md:text-6xl">{t.title}</h2>
        <p className="mb-10 min-h-[1.5rem] text-ink/65">
          {active && <>{c.used(t.projects.filter((p) => matches(active, p)).length, active)} · <button onClick={() => setActive(null)} className="underline underline-offset-4">{c.clear}</button></>}
        </p>

        <div className="divide-y divide-ink/15 border-y border-ink/15">
          {t.projects.map((p, i) => {
            const dim = active && !matches(active, p)
            return (
              <div key={p.title} role="button" tabIndex={0} onClick={() => open(i)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i) } }}
                className={`group grid cursor-pointer items-center gap-8 py-10 transition-opacity duration-300 md:grid-cols-12 md:gap-14 ${dim ? 'opacity-30' : ''}`}>
                <div className={`md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
                  <Cover p={p} i={i} className={`${coverClass(p)} rounded-[28px] transition-transform duration-500 group-hover:scale-[1.015]`} />
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-display text-3xl font-normal text-accent md:text-5xl">{p.shortTitle || p.title}</h3>
                  <p className="mt-4 line-clamp-4 max-w-xl leading-relaxed text-ink/70">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((tag) => <span key={tag} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">{tag}</span>)}
                  </div>
                  <span className="mt-8 inline-block underline underline-offset-4 transition-colors group-hover:text-accent">{c.more} →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {sel !== null && <Modal p={t.projects[sel]} i={sel} language={language} onClose={() => setSel(null)} />}
    </section>
  )
}
