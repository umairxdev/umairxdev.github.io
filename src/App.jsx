import React from 'react'
import CustomCursor from './components/CustomCursor'
import ThemeToggle from './components/ThemeToggle'
import GridOverlay from './components/GridOverlay'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <div className="App">
      <div className="noise-overlay"></div>
      <GridOverlay />
      <CustomCursor />
      <ThemeToggle />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App