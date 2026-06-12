import React, { useEffect, useRef, useState } from 'react'

const ServiceCard = ({ icon, title, description, tools, delay }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
        padding: '2rem',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--text-dim)'}`,
        background: isHovered ? 'var(--accent-soft)' : 'transparent',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'var(--accent)',
        transform: `scaleX(${isHovered ? 1 : 0})`,
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      }} />
      
      <div style={{
        fontSize: '2rem',
        marginBottom: '1rem',
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
        color: isHovered ? 'var(--accent)' : 'var(--text)',
        transition: 'color 0.3s ease',
      }}>
        {title}
      </h3>
      
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: 'var(--text-muted)',
        marginBottom: '1.25rem',
      }}>
        {description}
      </p>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        {tools.map((tool, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            padding: '0.25rem 0.6rem',
            border: '1px solid var(--text-dim)',
            color: 'var(--text-dim)',
          }}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

const Services = () => {
  const services = [
    {
      icon: '⚡',
      title: 'AI Automation',
      description: 'I build intelligent systems that work while you sleep. From custom AI workflows to autonomous agents — I design automations that eliminate repetitive tasks, connect your tools, and scale your operations without scaling your team.',
      tools: ['LangChain', 'n8n', 'Custom Bots', 'AI Agents', 'Workflow Automation'],
    },
    {
      icon: '🧠',
      title: 'LLM Training & Fine-Tuning',
      description: 'I turn generic AI into your specialized expert. Whether you need a model trained on your domain data, fine-tuned for your use case, or optimized for production — I handle the full pipeline from data prep to deployment.',
      tools: ['LoRA', 'QLoRA', 'RLHF', 'PEFT', 'Transformers', 'OpenAI API'],
    },
    {
      icon: '🚀',
      title: 'Web Applications',
      description: 'I craft fast, modern web experiences that convert. From sleek landing pages to complex SaaS dashboards — I build performant, scalable apps using the latest frameworks with clean, maintainable code.',
      tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'FastAPI'],
    },
    {
      icon: '🔄',
      title: 'No-Code Automation',
      description: 'I connect your entire tech stack without writing a line of code. I design and build automated workflows that sync your data, trigger actions, and keep your business running smoothly across all platforms.',
      tools: ['n8n', 'Zapier', 'Make', 'Webhooks', 'API Integrations'],
    },
    {
      icon: '📱',
      title: 'Desktop & Mobile Apps',
      description: 'I build native applications that feel right at home on any device. From desktop tools to Android apps — I create performant, beautiful interfaces with smooth animations and rock-solid functionality.',
      tools: ['Kotlin', 'Jetpack Compose', 'Electron', 'React Native', 'Java'],
    },
  ]

  return (
    <section id="services" style={{
      padding: '150px 0',
    }}>
      <div className="container">
        <div className="section-label">Services</div>
        
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--text)',
        }}>
          What I Build
        </h2>
        
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          marginBottom: '4rem',
          maxWidth: '600px',
          lineHeight: 1.7,
        }}>
          I turn complex problems into elegant solutions. Here's how I can help you dominate with AI and automation.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tools={service.tools}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
