import { about, ui } from '../content'
import SpotlightCard from './ui/SpotlightCard'
import CountUp from './ui/CountUp'

export default function About({ language }) {
  const t = about[language]
  const u = ui[language]

  return (
    <section id="about" className="relative z-10 flex justify-center px-6 py-16 md:px-16 md:py-24">
      <div className="w-full max-w-7xl">
        <h2 className="mb-10 font-display text-4xl font-normal md:text-6xl">{t.title}</h2>

        <div className="grid gap-4 md:grid-cols-6">
          <SpotlightCard className="md:col-span-4 md:row-span-2">
            <p className="font-display text-3xl font-light leading-tight md:text-5xl">{u.lead}</p>
            <p className="mt-10 line-clamp-4 max-w-xl leading-relaxed text-ink/65">{t.paragraphs[1]}</p>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2">
            <p className="text-sm text-ink/65">{u.locLabel}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="font-display text-2xl">{u.location}</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-2">
            <p className="text-sm text-ink/65">{u.eduLabel}</p>
            <div className="mt-6"><p className="leading-snug">{u.edu}</p><p className="mt-3 text-sm text-ink/65">{u.cert}</p></div>
          </SpotlightCard>

          <SpotlightCard className="md:col-span-6">
            <div className="grid grid-cols-3 gap-6">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-light text-accent md:text-6xl"><CountUp value={s.number} /></div>
                  <p className="mt-2 text-sm text-ink/65">{s.label}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
