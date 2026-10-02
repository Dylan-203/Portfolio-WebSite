import { useState, useEffect } from 'react'
import { ui } from '../content'

const ids = ['about', 'skills', 'experience', 'projects', 'contact']

export default function Navigation({ language, setLanguage }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const t = ui[language].nav

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1))
    }
    addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const link = (id) => (
    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
      className={`text-sm transition-colors hover:text-accent ${active === id ? 'text-accent underline underline-offset-8' : 'text-ink/65'}`}>
      {t[id]}
    </a>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/75 backdrop-blur-md">
      <div className="h-[2px] origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-16">
        <a href="#hero" className="font-display text-2xl">Dylan Ang</a>
        <nav className="hidden items-center gap-8 md:flex">{ids.map(link)}</nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-ink/15 p-0.5 text-sm">
            {[['en', 'EN'], ['zh', '中文']].map(([k, label]) => (
              <button key={k} onClick={() => setLanguage(k)} aria-pressed={language === k}
                className={`rounded-full px-3 py-1 transition-colors ${language === k ? 'bg-ink text-paper' : 'text-ink/65 hover:text-ink'}`}>
                {label}
              </button>
            ))}
          </div>
          <button className="rounded-full border border-ink/15 px-3 py-1 text-sm md:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && <nav className="flex flex-col gap-5 border-t border-ink/10 px-6 py-6 md:hidden">{ids.map(link)}</nav>}
    </header>
  )
}
