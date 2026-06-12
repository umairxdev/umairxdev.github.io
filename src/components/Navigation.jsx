import React, { useState } from 'react'
import { playClick } from '../utils/audio'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    playClick()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = () => {
    playClick()
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '2rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ width: '80px' }}></div>
        
        {/* Desktop Navigation */}
        <div className="nav-desktop" style={{
          display: 'flex',
          gap: '2rem',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
        }}>
          <a href="#about" onClick={handleNavClick}>ABOUT</a>
          <a href="#services" onClick={handleNavClick}>SERVICES</a>
          <a href="#experience" onClick={handleNavClick}>EXPERIENCE</a>
          <a href="#projects" onClick={handleNavClick}>PROJECTS</a>
          <a href="#skills" onClick={handleNavClick}>SKILLS</a>
          <a href="#contact" onClick={handleNavClick}>CONTACT</a>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="nav-mobile-toggle"
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 1001,
          }}
        >
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--text)',
            margin: '6px 0',
            transition: '0.4s',
            transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none',
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--text)',
            margin: '6px 0',
            transition: '0.4s',
            opacity: isMenuOpen ? '0' : '1',
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--text)',
            margin: '6px 0',
            transition: '0.4s',
            transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none',
          }}></div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--bg)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <a href="#about" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>ABOUT</a>
        <a href="#services" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>SERVICES</a>
        <a href="#experience" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>EXPERIENCE</a>
        <a href="#projects" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>PROJECTS</a>
        <a href="#skills" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>SKILLS</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
        }}>CONTACT</a>
      </div>
    </>
  )
}

export default Navigation