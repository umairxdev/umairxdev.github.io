import React, { useEffect, useRef, useState } from 'react'

const ExperienceItem = ({ role, company, location, date, points, delay }) => {
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
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
      marginBottom: '4rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        marginBottom: '0.5rem',
        gap: '0.5rem',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        }}>
          {role}
        </h3>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.05em',
        }}>
          {date}
        </span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
      }}>
        {company} — {location}
      </div>
      <ul style={{
        listStyle: 'none',
        padding: 0,
      }}>
        {points.map((point, i) => (
          <li key={i} style={{
            position: 'relative',
            paddingLeft: '1.5rem',
            marginBottom: '0.75rem',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              top: '0.5rem',
              width: '4px',
              height: '4px',
              backgroundColor: 'var(--accent)',
              borderRadius: '0px',
            }}></span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

const Experience = () => {
  return (
    <section id="experience" style={{
      padding: '150px 0',
    }}>
      <div className="container">
        <div className="section-label">Experience</div>
        
        <ExperienceItem
          role="AI & Automation Engineer"
          company="DTS Solution"
          location="Dubai"
          date="Jul 2025 — Feb 2026"
          delay={0}
          points={[
            'Developed AI-driven automation systems and agentic workflows for business process optimization',
            'Built AI pipelines using Python-based frameworks and automation platforms such as n8n',
            'Designed intelligent workflows integrating APIs, data processing, and AI models for enterprise automation',
            'Worked on AI-powered solutions involving LLM integrations and automated decision-making systems',
          ]}
        />
      </div>
    </section>
  )
}

export default Experience