import React, { useEffect, useRef, useState } from 'react'

const SkillCategory = ({ title, skills, delay }) => {
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
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--text)',
      }}>
        {title}
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        {skills.map((skill, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            padding: '0.4rem 0.8rem',
            border: '1px solid var(--text-dim)',
            color: 'var(--text-muted)',
            transition: 'all 0.3s ease',
            cursor: 'default',
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
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const Skills = () => {
  const skillGroups = [
    {
      title: 'AI & Data Science',
      skills: ['Computer Vision', 'NLP', 'LLM Fine-Tuning', 'Custom Chatbot Development', 'Image Processing', 'Data Analysis & Visualization', 'Generative AI', 'Agentic Workflows'],
    },
    {
      title: 'Languages',
      skills: ['Python', 'R', 'Go (Golang)', 'C/C++', 'Java', 'JavaScript'],
    },
    {
      title: 'Web & App',
      skills: ['React', 'Next.js', 'FastAPI', 'HTML5', 'CSS', 'Kotlin', 'Jetpack Compose'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['Vector Databases', 'DBMS', 'Git', 'GitHub', 'Jupyter Notebooks', 'n8n', 'VS Code', 'Claude Code'],
    },
  ]

  return (
    <section id="skills" style={{
      padding: '150px 0',
    }}>
      <div className="container">
        <div className="section-label">Technical Skills</div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '3rem',
        }}>
          {skillGroups.map((group, i) => (
            <SkillCategory
              key={i}
              title={group.title}
              skills={group.skills}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills