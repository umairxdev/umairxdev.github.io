import React from 'react'

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: '100px',
      padding: '2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.05em',
      }}>
        <a href="#about">ABOUT</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#projects">PROJECTS</a>
        <a href="#skills">SKILLS</a>
        <a href="#contact">CONTACT</a>
      </div>
    </nav>
  )
}

export default Navigation