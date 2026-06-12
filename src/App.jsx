import React from 'react'
import CustomCursor from './components/CustomCursor'
import ThemeToggle from './components/ThemeToggle'
import GridOverlay from './components/GridOverlay'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

const Divider = () => (
  <div style={{
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 2rem',
  }}>
    <div style={{
      width: '100%',
      height: '1px',
      background: 'var(--text-dim)',
      opacity: 0.3,
    }} />
  </div>
)

function App() {
  return (
    <div className="App">
      <div className="noise-overlay"></div>
      <GridOverlay />
      <CustomCursor />
      <ThemeToggle />
      <Navigation />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Services />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
    </div>
  )
}

export default App