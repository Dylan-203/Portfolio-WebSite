const text = { en: 'All rights reserved.', zh: '版权所有。' }

export default function Footer({ language }) {
  return (
    <footer className="relative z-10 border-t border-paper/10 bg-ink px-6 py-8 text-center text-sm text-paper/60">
      © {new Date().getFullYear()} Dylan Ang Jing Yuan. {text[language]}
    </footer>
  )
}
