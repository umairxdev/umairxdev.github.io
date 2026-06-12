import React, { useEffect, useRef, useState } from 'react'

const ProjectCard = ({ title, tech, description, links, delay }) => {
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
        border: '1px solid',
        borderColor: isHovered ? 'var(--accent)' : 'var(--text-dim)',
        backgroundColor: isHovered ? 'var(--bg-elevated)' : 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2px',
          height: '100%',
          backgroundColor: 'var(--accent)',
        }}></div>
      )}
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>
        <div style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: isHovered ? 'var(--accent)' : 'var(--text-dim)',
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
        letterSpacing: '0.05em',
      }}>
        {tech}
      </div>
      
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  )
}

const Projects = () => {
  const projects = [
    {
      title: 'DeepVoice Shield',
      tech: 'React, FastAPI, ONNX, Wav2Vec2',
      description: 'AI-powered audio deepfake detection system; fine-tuned a Wav2Vec2 model for detecting synthetic vs real voice recordings. Built React frontend integrated with a FastAPI + ONNX inference backend.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/DeepVoice-Shield.git' },
        { label: 'Live', url: 'https://deepvoice-shield-frontend.vercel.app/' },
      ],
    },
    {
      title: 'AsphaltAI',
      tech: 'YOLOv8, ONNX, Gradio, Python',
      description: 'Road defect detection system trained on the Velotech Road Damage Detection dataset (~11k images); achieved 0.581 mAP@50 (0.744 on potholes) using YOLOv8l. Exported model to ONNX for framework-agnostic inference; saved on Hugging Face.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/AsphaltAI.git' },
        { label: 'HF', url: 'https://huggingface.co/umairahmed911/AsphaltAI-v1' },
      ],
    },
    {
      title: 'Email Triage Classifier',
      tech: 'React, Flask, scikit-learn, Docker',
      description: 'ML-powered email classification system categorising messages into spam, promotions, social, updates, and personal using a soft-voting ensemble (Logistic Regression + LinearSVC + Naive Bayes) with TF-IDF, trained on the Enron-Spam dataset. Containerised full-stack app with React frontend, Flask REST API, and Nginx reverse proxy via Docker Compose.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/Email-Triage.git' },
      ],
    },
    {
      title: 'NeoZ',
      tech: 'Next.js 16, React 19, Tailwind CSS 4, RSS',
      description: 'Personalized news aggregation platform pulling from 40+ trusted RSS sources across 11 categories (Technology, AI, Science, Business, Sports, World, Pakistan, and more). Features full-text search, live local weather via Open-Meteo API, dark/light mode with system preference detection, and mobile-first responsive design.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/NeoZ.git' },
        { label: 'Live', url: 'https://neoz.vercel.app' },
      ],
    },
    {
      title: 'Pockit',
      tech: 'Kotlin, Jetpack Compose',
      description: 'Offline expense tracker app with a clean modern UI, local data storage, income & expense management, and recurring payment support. Built financial analytics dashboard providing spending insights and summaries using Kotlin and Jetpack Compose.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/Expense_Tracker.git' },
      ],
    },
    {
      title: 'Go Web Crawler',
      tech: 'Go (Golang)',
      description: "Concurrent web crawler built in Go that traverses web pages up to a specified depth with rate limiting and duplicate avoidance. Demonstrates Go's concurrency model using goroutines, channels, sync.Map, and sync.WaitGroup.",
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/Go_Web-Crawler.git' },
      ],
    },
    {
      title: 'Go ChatApp',
      tech: 'Go, WebSockets',
      description: "Lightweight real-time web chat application built using Go, Gorilla WebSocket, and standard HTML/CSS/JavaScript. Efficiently handles concurrent WebSocket connections using Go's native concurrency support.",
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/go-chat-app.git' },
      ],
    },
    {
      title: 'N8N Crypto Analysis',
      tech: 'n8n, Binance API, Google Gemini',
      description: 'Automated cryptocurrency analysis workflow using n8n for data collection, processing, and generating trading insights with real-time market monitoring.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/Crypto-Analysis-n8n.git' },
      ],
    },
    {
      title: 'Hotel Management System',
      tech: 'Java, SQL, JDBC',
      description: 'Comprehensive hotel management solution including booking system, room management, and customer database.',
      links: [
        { label: 'GitHub', url: 'https://github.com/umairxdev/Hotel-Management-System.git' },
      ],
    },
  ]

  return (
    <section id="projects" style={{
      padding: '150px 0',
    }}>
      <div className="container">
        <div className="section-label">Projects</div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              tech={project.tech}
              description={project.description}
              links={project.links}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects