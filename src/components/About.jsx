import React, { useEffect, useRef, useState } from 'react'

const About = () => {
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
    <section id="about" style={{
      padding: '150px 0',
    }}>
      <div className="container" ref={ref}>
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          <div className="section-label">About</div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}>
            <div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}>
                Results-driven AI & Automation Engineer with hands-on experience building intelligent systems across machine learning, LLMs, computer vision, and NLP.
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}>
                Strong foundation in Python, with proven expertise in LLM fine-tuning, agentic workflow design, and end-to-end AI pipeline development.
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Passionate about creating AI-powered products that solve real-world problems and drive measurable business impact.
              </p>
            </div>
            
            <div style={{
              borderLeft: '1px solid var(--text-dim)',
              paddingLeft: '2rem',
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                }}>
                  EDUCATION
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  BS in Artificial Intelligence
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-dim)',
                }}>
                  National University of Technology (NUTECH), Islamabad
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  marginTop: '0.25rem',
                }}>
                  Oct 2023 — Present
                </div>
              </div>
              
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.1em',
                }}>
                  PREVIOUS
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  HSSC Computer Science
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-dim)',
                }}>
                  Punjab Group of Colleges, Gujar Khan
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  marginTop: '0.25rem',
                }}>
                  Jun 2020 — May 2022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About