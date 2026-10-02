import { useState, useEffect } from 'react'
import Background from './components/Background'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import useSmoothScroll from './hooks/useSmoothScroll'

const initialLang = () => {
  try { const s = localStorage.getItem('lang'); if (s) return s } catch (e) {}
  return navigator.language?.startsWith('zh') ? 'zh' : 'en'
}

export default function App() {
  useSmoothScroll()
  const [language, setLanguage] = useState(initialLang)
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('lang', language) } catch (e) {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  return (
    <div className="relative">
      <CustomCursor />
      <Background />
      <Navigation language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} active={activeSkill} setActive={setActiveSkill} />
        <Experience language={language} />
        <Projects language={language} active={activeSkill} setActive={setActiveSkill} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
