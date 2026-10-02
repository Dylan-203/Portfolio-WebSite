import { skills, projects, caseUi } from '../content'
import { matches } from '../lib/match'

export default function Skills({ language, active, setActive }) {
  const t = skills[language]
  const c = caseUi[language]
  const count = active ? projects[language].projects.filter((p) => matches(active, p)).length : 0

  return (
    <section id="skills" className="relative z-10 flex justify-center bg-sage/35 px-6 py-16 md:px-16 md:py-24">
      <div className="w-full max-w-7xl md:grid md:grid-cols-12 md:gap-12">
        <div className="mb-10 md:col-span-4 md:mb-0">
          <div className="md:sticky md:top-28">
            <h2 className="font-display text-4xl font-normal md:text-6xl">{t.title}</h2>
            <p className="mt-4 text-ink/65">{c.hint}</p>
            <div aria-live="polite" className="mt-6 min-h-[5rem]">
              {active && (
                <div className="flex flex-col gap-2">
                  <span>{c.used(count, active)}</span>
                  <a href="#projects" className="w-fit text-accent underline underline-offset-4">{c.view}</a>
                  <button onClick={() => setActive(null)} className="w-fit text-ink/65 underline underline-offset-4">{c.clear}</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          {t.categories.map((cat) => (
            <div key={cat.name} className="grid gap-4 border-t border-ink/20 py-8 sm:grid-cols-4">
              <h3 className="font-display text-2xl text-accent">{cat.name}</h3>
              <div className="flex flex-wrap gap-2 sm:col-span-3">
                {cat.skills.map((s) => {
                  const on = active === s
                  return (
                    <button key={s} aria-pressed={on} onClick={() => setActive(on ? null : s)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? 'border-accent bg-accent text-paper' : 'border-ink/25 bg-paper/60 hover:border-accent hover:text-accent'}`}>
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
          <div className="border-t border-ink/20" />
        </div>
      </div>
    </section>
  )
}
