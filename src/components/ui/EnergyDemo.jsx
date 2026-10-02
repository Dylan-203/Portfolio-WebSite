import { useState, useEffect } from 'react'
import { caseUi } from '../../content'

// Simulated data only: shows the idea of the real system (appliance on/off changes the power curve)
export default function EnergyDemo({ language }) {
  const c = caseUi[language]
  const [on, setOn] = useState(true)
  const [series, setSeries] = useState(() => Array(30).fill(4))
  const [env, setEnv] = useState({ t: 29.5, h: 68 })

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((a) => [...a.slice(1), on ? 118 + Math.random() * 34 : 3 + Math.random() * 3])
      setEnv((e) => ({ t: +(e.t + (Math.random() - 0.5) * 0.3).toFixed(1), h: Math.round(e.h + (Math.random() - 0.5) * 2) }))
    }, 1000)
    return () => clearInterval(id)
  }, [on])

  const pts = series.map((v, i) => `${(i / 29) * 300},${78 - (v / 160) * 70}`).join(' ')

  return (
    <div className="rounded-2xl border border-ink/15 bg-white/50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xl">{c.demoTitle}</p>
        <button onClick={() => setOn(!on)} aria-pressed={on}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${on ? 'bg-accent text-paper' : 'border border-ink/30'}`}>
          {c.appliance}: {on ? c.on : c.off}
        </button>
      </div>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="mt-4 h-28 w-full" role="img" aria-label={c.power}>
        <polyline points={pts} fill="none" stroke="#1F4D3A" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-ink/65">
        <span>{c.power} <b className="text-ink">{Math.round(series[29])} W</b></span>
        <span>{c.temp} <b className="text-ink">{env.t} °C</b></span>
        <span>{c.hum} <b className="text-ink">{env.h} %</b></span>
      </div>
    </div>
  )
}
