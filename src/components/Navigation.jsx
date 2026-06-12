import React from 'react'

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem',
      zIndex: 1000,
      mixBlendMode: 'difference',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.2rem',
        letterSpacing: '-0.02em',
      }}>
        UA
      </div>
      <div style={{
        display: 'flex',
        gap: '2rem',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.05em',
      }}>
        <a href="#experience" style={{ color: 'var(--text)' }}>EXPERIENCE</a>
        <a href="#projects" style={{ color: 'var(--text)' }}>PROJECTS</a>
        <a href="#skills" style={{ color: 'var(--text)' }}>SKILLS</a>
        <a href="#contact" style={{ color: 'var(--text)' }}>CONTACT</a>
      </div>
    </nav>
  )
}

export default Navigation