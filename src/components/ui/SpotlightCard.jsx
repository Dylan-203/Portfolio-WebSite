export default function SpotlightCard({ className = '', children }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', e.clientX - r.left + 'px')
    e.currentTarget.style.setProperty('--sy', e.clientY - r.top + 'px')
  }
  return (
    <div className={className}>
      <div onMouseMove={move}
        className="group relative h-full overflow-hidden rounded-[28px] border border-ink/15 bg-white/45 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(340px circle at var(--sx) var(--sy), rgba(31,77,58,.13), transparent 70%)' }} />
        <div className="relative flex h-full flex-col justify-between">{children}</div>
      </div>
    </div>
  )
}
