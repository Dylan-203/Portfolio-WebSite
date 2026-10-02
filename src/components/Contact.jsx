import { useState, useRef } from 'react'
import { contact } from '../content'
import { MapPin, Github, Linkedin, Copy, Check } from 'lucide-react'

const labels = {
  en: { copy: 'Click to copy', copied: 'Copied to clipboard', send: 'Or send an email' },
  zh: { copy: '点击复制邮箱', copied: '已复制到剪贴板', send: '或直接发送邮件' }
}

export default function Contact({ language }) {
  const t = contact[language]
  const l = labels[language]
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.emailValue)
    } catch (e) {
      const ta = document.createElement('textarea')
      ta.value = t.emailValue
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative z-10 flex justify-center bg-ink px-6 py-20 text-paper md:px-16 md:py-32">
      <div className="w-full max-w-7xl text-center">
        <h2 className="mb-8 font-display text-4xl font-normal md:text-6xl">{t.title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-paper/70 md:text-xl">{t.description}</p>

        <button onClick={copy}
          className="border-b border-paper/30 pb-2 font-display text-[clamp(1.6rem,5.5vw,4.5rem)] font-light transition-colors hover:border-sage hover:text-sage">
          {t.emailValue}
        </button>

        <p aria-live="polite" className="mt-5 flex h-6 items-center justify-center gap-2 text-sm text-paper/65">
          {copied ? <><Check className="h-4 w-4 text-sage" />{l.copied}</> : <><Copy className="h-4 w-4" />{l.copy}</>}
        </p>
        <a href={`mailto:${t.emailValue}`} className="mt-3 inline-block text-sm text-sage underline underline-offset-4">{l.send}</a>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <p className="flex items-center gap-2 text-paper/70"><MapPin className="h-5 w-5 text-sage" />{t.locationValue}</p>
          <div className="flex gap-4">
            <a href="https://github.com/DylanAng" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/DylanAngJingYuan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
