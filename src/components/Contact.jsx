import React, { useEffect, useRef, useState } from 'react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" style={{
      padding: '150px 0 100px',
    }}>
      <div className="container" ref={ref}>
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          <div className="section-label">Contact</div>
          
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}>
            Let's build something.
          </h2>
          
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            maxWidth: '500px',
            lineHeight: 1.6,
          }}>
            Open for opportunities in AI, automation, and full-stack development.
            Based in Islamabad, Pakistan. Available worldwide.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
          }}>
            <a href="mailto:umair08403@gmail.com" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: 'var(--text)',
              fontSize: '1.2rem',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '0.8rem',
              }}>
                @
              </span>
              umair08403@gmail.com
            </a>
            
            <a href="tel:+923025421236" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: 'var(--text)',
              fontSize: '1.2rem',
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '0.8rem',
              }}>
              #
              </span>
              +92-302-542-1236
            </a>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1rem',
            }}>
              <a href="https://linkedin.com/in/umairxdev" target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--text-dim)',
                paddingBottom: '0.2rem',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--text-dim)'
                e.target.style.color = 'var(--text-muted)'
              }}
              >
                LinkedIn
              </a>
              <a href="https://github.com/umairxdev" target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--text-dim)',
                paddingBottom: '0.2rem',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--text-dim)'
                e.target.style.color = 'var(--text-muted)'
              }}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div style={{
          marginTop: '150px',
          paddingTop: '2rem',
          borderTop: '1px solid var(--text-dim)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span>© 2026 Umair Ahmed</span>
          <span>Built with React + Vite</span>
        </div>
      </div>
    </section>
  )
}

export default Contact