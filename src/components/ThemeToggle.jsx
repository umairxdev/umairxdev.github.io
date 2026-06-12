import React, { useEffect, useRef, useState, useCallback } from 'react'

const ThemeToggle = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isDark, setIsDark] = useState(true)
  const [isOn, setIsOn] = useState(true)
  const [showHint, setShowHint] = useState(true)
  
  const physicsRef = useRef({
    angle: 0,
    angularVelocity: 0,
    length: 120,
    targetLength: 120,
    isDragging: false,
    dragX: 0,
    dragY: 0,
    lightOn: true,
    toggleThreshold: 180,
    released: false,
    time: 0,
  })
  
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)
  const hintTimeoutRef = useRef(null)

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
      return newTheme
    })
    setIsOn(prev => !prev)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const physics = physicsRef.current
    const gravity = 0.5
    const damping = 0.985
    const restLength = 120
    
    const animate = () => {
      physics.time += 0.016
      const width = canvas.width
      const pivotX = width / 2
      const pivotY = 0
      
      if (!physics.isDragging) {
        const force = -gravity * Math.sin(physics.angle)
        physics.angularVelocity += force
        physics.angularVelocity *= damping
        physics.angle += physics.angularVelocity
        
        const lengthDiff = physics.targetLength - physics.length
        physics.length += lengthDiff * 0.08
        
        physics.angularVelocity += Math.sin(physics.time * 0.5) * 0.0002
      } else {
        const dx = physics.dragX - pivotX
        const dy = physics.dragY - pivotY
        const targetAngle = Math.atan2(dx, dy)
        const targetLength = Math.sqrt(dx * dx + dy * dy)
        
        physics.angle += (targetAngle - physics.angle) * 0.3
        physics.length += (Math.max(60, Math.min(targetLength, 250)) - physics.length) * 0.3
        physics.angularVelocity = 0
        
        if (targetLength > physics.toggleThreshold && !physics.released) {
          physics.released = true
          toggleTheme()
        }
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const bulbX = pivotX + Math.sin(physics.angle) * physics.length
      const bulbY = pivotY + Math.cos(physics.angle) * physics.length
      
      const segments = 10
      ctx.beginPath()
      ctx.moveTo(pivotX, pivotY)
      
      for (let i = 1; i <= segments; i++) {
        const t = i / segments
        const segX = pivotX + Math.sin(physics.angle + Math.sin(physics.time * 2 + t * 3) * 0.02 * (1 - t)) * physics.length * t
        const segY = pivotY + Math.cos(physics.angle + Math.sin(physics.time * 2 + t * 3) * 0.02 * (1 - t)) * physics.length * t
        
        if (i === 1) {
          ctx.lineTo(segX, segY)
        } else {
          const prevT = (i - 1) / segments
          const prevX = pivotX + Math.sin(physics.angle) * physics.length * prevT
          const prevY = pivotY + Math.cos(physics.angle) * physics.length * prevT
          const cpX = (prevX + segX) / 2 + Math.sin(physics.time * 3 + t) * 2
          const cpY = (prevY + segY) / 2
          ctx.quadraticCurveTo(cpX, cpY, segX, segY)
        }
      }
      
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.stroke()
      
      const glowRadius = physics.isDragging ? 50 : 40
      const glow = ctx.createRadialGradient(bulbX, bulbY, 0, bulbX, bulbY, glowRadius)
      
      if (isOn) {
        glow.addColorStop(0, isDark ? 'rgba(201, 169, 110, 0.8)' : 'rgba(255, 200, 80, 0.9)')
        glow.addColorStop(0.4, isDark ? 'rgba(201, 169, 110, 0.3)' : 'rgba(255, 200, 80, 0.4)')
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      } else {
        glow.addColorStop(0, 'rgba(200, 200, 200, 0.4)')
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      }
      
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(bulbX, bulbY, glowRadius, 0, Math.PI * 2)
      ctx.fill()
      
      if (isOn) {
        const rayCount = 8
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i / rayCount) * Math.PI * 2 + physics.time * 0.5
          const rayLength = 30 + Math.sin(physics.time * 2 + i) * 10
          const rayX = bulbX + Math.cos(rayAngle) * rayLength
          const rayY = bulbY + Math.sin(rayAngle) * rayLength
          
          ctx.beginPath()
          ctx.moveTo(bulbX, bulbY)
          ctx.lineTo(rayX, rayY)
          ctx.strokeStyle = isDark ? 'rgba(201, 169, 110, 0.3)' : 'rgba(255, 200, 80, 0.4)'
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
      
      ctx.beginPath()
      ctx.arc(bulbX, bulbY - 8, 8, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? '#666' : '#888'
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(bulbX, bulbY, 14, 0, Math.PI * 2)
      const bulbGradient = ctx.createRadialGradient(bulbX - 4, bulbY - 4, 0, bulbX, bulbY, 14)
      if (isOn) {
        bulbGradient.addColorStop(0, isDark ? '#fff5e0' : '#fffacd')
        bulbGradient.addColorStop(0.5, isDark ? '#c9a96e' : '#ffdd44')
        bulbGradient.addColorStop(1, isDark ? '#8b7355' : '#cc9900')
      } else {
        bulbGradient.addColorStop(0, '#ddd')
        bulbGradient.addColorStop(1, '#999')
      }
      ctx.fillStyle = bulbGradient
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(bulbX - 4, bulbY - 4, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fill()
      
      if (physics.isDragging) {
        const pullProgress = Math.min(physics.length / physics.toggleThreshold, 1)
        
        ctx.beginPath()
        ctx.arc(pivotX, pivotY + physics.toggleThreshold, 30, 0, Math.PI * 2)
        ctx.strokeStyle = pullProgress >= 1 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(201, 169, 110, 0.3)'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.stroke()
        ctx.setLineDash([])
        
        ctx.beginPath()
        ctx.moveTo(bulbX, bulbY)
        ctx.lineTo(bulbX, pivotY + physics.toggleThreshold)
        ctx.strokeStyle = 'rgba(201, 169, 110, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (physics.isDragging) {
        physics.dragX = e.clientX
        physics.dragY = e.clientY
      }
    }
    
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const pivotX = canvas.width / 2
      const pivotY = 0
      const bulbX = pivotX + Math.sin(physics.angle) * physics.length
      const bulbY = pivotY + Math.cos(physics.angle) * physics.length
      
      const dist = Math.sqrt((x - bulbX) ** 2 + (y - bulbY) ** 2)
      
      if (dist < 60) {
        physics.isDragging = true
        physics.released = false
        physics.dragX = e.clientX
        physics.dragY = e.clientY
        setShowHint(false)
        if (hintTimeoutRef.current) {
          clearTimeout(hintTimeoutRef.current)
        }
      }
    }
    
    const handleMouseUp = () => {
      if (physics.isDragging) {
        physics.isDragging = false
        physics.targetLength = restLength
        physics.angularVelocity = physics.angle * 0.05
        setTimeout(() => {
          physics.released = false
        }, 500)
      }
    }
    
    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      
      const pivotX = canvas.width / 2
      const pivotY = 0
      const bulbX = pivotX + Math.sin(physics.angle) * physics.length
      const bulbY = pivotY + Math.cos(physics.angle) * physics.length
      
      const dist = Math.sqrt((x - bulbX) ** 2 + (y - bulbY) ** 2)
      
      if (dist < 60) {
        physics.isDragging = true
        physics.released = false
        physics.dragX = touch.clientX
        physics.dragY = touch.clientY
        setShowHint(false)
      }
    }
    
    const handleTouchMove = (e) => {
      if (physics.isDragging) {
        const touch = e.touches[0]
        physics.dragX = touch.clientX
        physics.dragY = touch.clientY
      }
    }
    
    const handleTouchEnd = () => {
      if (physics.isDragging) {
        physics.isDragging = false
        physics.targetLength = restLength
        physics.angularVelocity = physics.angle * 0.05
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchend', handleTouchEnd)
    
    hintTimeoutRef.current = setTimeout(() => {
      setShowHint(false)
    }, 5000)
    
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationRef.current)
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current)
      }
    }
  }, [isDark, isOn, toggleTheme])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          cursor: 'grab',
        }}
      />
      {showHint && (
        <div style={{
          position: 'absolute',
          top: '160px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-elevated)',
          padding: '0.5rem 1rem',
          border: '1px solid var(--text-dim)',
          pointerEvents: 'none',
          animation: 'fadeInUp 0.5s ease',
          zIndex: 9999,
        }}>
          Pull the light to toggle theme
        </div>
      )}
    </div>
  )
}

export default ThemeToggle