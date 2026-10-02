import { useEffect, useRef } from 'react'

const interactive = 'a, button, [role="button"], input, textarea, select, summary, label'

// Mouse-only: a dot that follows the pointer and a ring that trails it and grows over clickable things.
// White + mix-blend-difference keeps both visible on the paper and on the dark covers.
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf, shown = false, hover = false, down = false

    const show = (v) => { dot.current.style.opacity = ring.current.style.opacity = v ? 1 : 0 }
    const scale = () => {
      ring.current.style.setProperty('--s', down ? 0.75 : hover ? 1.7 : 1)
      dot.current.style.setProperty('--s', hover ? 0 : 1)
    }
    const move = (e) => {
      target.x = e.clientX; target.y = e.clientY
      if (!shown) { shown = true; pos.x = target.x; pos.y = target.y; show(true) }
      dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      const h = e.target instanceof Element && !!e.target.closest(interactive)
      if (h !== hover) { hover = h; scale() }
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const press = (v) => () => { down = v; scale() }
    const up = press(false), dn = press(true)
    const leave = () => show(false)
    const enter = () => shown && show(true)

    addEventListener('pointermove', move)
    addEventListener('pointerdown', dn)
    addEventListener('pointerup', up)
    root.addEventListener('mouseleave', leave)
    root.addEventListener('mouseenter', enter)
    raf = requestAnimationFrame(loop)
    return () => {
      root.classList.remove('has-cursor')
      removeEventListener('pointermove', move)
      removeEventListener('pointerdown', dn)
      removeEventListener('pointerup', up)
      root.removeEventListener('mouseleave', leave)
      root.removeEventListener('mouseenter', enter)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base = { opacity: 0, transition: 'opacity .2s' }
  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference" style={base}>
        <div className="-ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-white transition-transform duration-200 ease-out"
          style={{ transform: 'scale(var(--s, 1))' }} />
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference" style={base}>
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200"
          style={{ transform: 'scale(var(--s, 1))' }} />
      </div>
    </>
  )
}
