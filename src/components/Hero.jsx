import React, { useEffect, useState } from 'react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Umair Ahmed'
  const [showCursor, setShowCursor] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!animationStarted) return
    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [displayText, animationStarted])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(c => !c)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 2rem',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem',
        letterSpacing: '0.1em',
        opacity: animationStarted ? 1 : 0,
        transform: animationStarted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s',
      }}>
        ~/umair-ahmed
      </div>
      
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        marginBottom: '2rem',
        color: 'var(--text)',
      }}>
        {displayText}
        <span style={{
          display: 'inline-block',
          width: '12px',
          height: '0.9em',
          backgroundColor: showCursor ? 'var(--accent)' : 'transparent',
          marginLeft: '4px',
          verticalAlign: 'text-bottom',
          transition: 'background-color 0.1s',
        }}></span>
      </h1>
      
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        color: 'var(--text-muted)',
        maxWidth: '600px',
        lineHeight: 1.7,
        opacity: displayText === fullText ? 1 : 0,
        transform: displayText === fullText ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        AI & Automation Engineer building intelligent systems
        <br />
        <span style={{ color: 'var(--text-dim)' }}>— Python, LLMs, Computer Vision, Web</span>
      </div>

      <div style={{
        marginTop: '4rem',
        display: 'flex',
        gap: '2rem',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        opacity: displayText === fullText ? 1 : 0,
        transition: 'opacity 1s ease 0.5s',
      }}>
        <a href="https://github.com/umairxdev" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
        }}>
          <span style={{ color: 'var(--accent)' }}>→</span> GitHub
        </a>
        <a href="https://linkedin.com/in/umairxdev" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
        }}>
          <span style={{ color: 'var(--accent)' }}>→</span> LinkedIn
        </a>
        <a href="mailto:umair08403@gmail.com" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
        }}>
          <span style={{ color: 'var(--accent)' }}>→</span> Email
        </a>
      </div>
    </section>
  )
}

export default Hero