import React from 'react'

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: '300px',
      right: 0,
      padding: '2rem',
      zIndex: 1000,
      mixBlendMode: 'difference',
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
        <a href="#about" style={{ color: 'var(--text)' }}>ABOUT</a>
        <a href="#experience" style={{ color: 'var(--text)' }}>EXPERIENCE</a>
        <a href="#projects" style={{ color: 'var(--text)' }}>PROJECTS</a>
        <a href="#skills" style={{ color: 'var(--text)' }}>SKILLS</a>
        <a href="#contact" style={{ color: 'var(--text)' }}>CONTACT</a>
      </div>
    </nav>
  )
}

export default Navigation