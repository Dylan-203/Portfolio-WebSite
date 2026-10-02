import { useRef } from 'react'

export default function Magnetic({ children, className = '', ...props }) {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
  }
  return (
    <a ref={ref} onMouseMove={move} onMouseLeave={() => { ref.current.style.transform = '' }}
      className={`inline-block transition-transform duration-200 ease-out ${className}`} {...props}>
      {children}
    </a>
  )
}
