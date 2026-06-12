import React, { useEffect, useRef, useState, useCallback } from 'react'

const ThemeToggle = () => {
  const canvasRef = useRef(null)
  const [isDark, setIsDark] = useState(true)
  
  const physicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    angularVelocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    time: 0,
  })
  
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
      return newTheme
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = 150
      canvas.height = 250
    }
    resize()
    
    const physics = physicsRef.current
    const pivotX = 60
    const pivotY = 0
    const restLength = 100
    const gravity = 0.3
    const damping = 0.96
    
    const animate = () => {
      physics.time += 0.016
      
      if (!physics.isDragging) {
        // Pendulum physics
        const force = -gravity * Math.sin(physics.angle)
        physics.angularVelocity += force
        physics.angularVelocity *= damping
        physics.angle += physics.angularVelocity
        
        // Add gentle ambient sway
        physics.angularVelocity += Math.sin(physics.time * 0.8) * 0.0003
      } else {
        // While dragging - follow mouse
        const dx = mouseRef.current.x - pivotX
        const dy = mouseRef.current.y - pivotY
        const targetAngle = Math.atan2(dx, dy)
        physics.angle += (targetAngle - physics.angle) * 0.2
        physics.angularVelocity = 0
      }
      
      const circleX = pivotX + Math.sin(physics.angle) * restLength
      const circleY = pivotY + Math.cos(physics.angle) * restLength
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw elastic string with wave physics
      const segments = 20
      ctx.beginPath()
      ctx.moveTo(pivotX, pivotY)
      
      for (let i = 1; i <= segments; i++) {
        const t = i / segments
        const baseX = pivotX + (circleX - pivotX) * t
        const baseY = pivotY + (circleY - pivotY) * t
        
        // Add wave effect based on velocity and time
        const wave = Math.sin(physics.time * 3 + t * 8) * 3 * (1 - t) * Math.abs(physics.angularVelocity * 50)
        const waveX = baseX + Math.cos(physics.angle + Math.PI / 2) * wave
        const waveY = baseY - Math.sin(physics.angle + Math.PI / 2) * wave
        
        if (i === 1) {
          ctx.lineTo(waveX, waveY)
        } else {
          const prevT = (i - 1) / segments
          const prevBaseX = pivotX + (circleX - pivotX) * prevT
          const prevBaseY = pivotY + (circleY - pivotY) * prevT
          const prevWave = Math.sin(physics.time * 3 + prevT * 8) * 3 * (1 - prevT) * Math.abs(physics.angularVelocity * 50)
          const prevX = prevBaseX + Math.cos(physics.angle + Math.PI / 2) * prevWave
          const prevY = prevBaseY - Math.sin(physics.angle + Math.PI / 2) * prevWave
          
          const cpX = (prevX + waveX) / 2
          const cpY = (prevY + waveY) / 2
          ctx.quadraticCurveTo(cpX, cpY, waveX, waveY)
        }
      }
      
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.stroke()
      
      // Draw filled circle (simple, no bulb)
      ctx.beginPath()
      ctx.arc(circleX, circleY, 10, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? 'var(--accent)' : 'var(--accent)'
      ctx.fill()
      
      // Small highlight on circle
      ctx.beginPath()
      ctx.arc(circleX - 3, circleY - 3, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.fill()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const circleX = pivotX + Math.sin(physics.angle) * restLength
      const circleY = pivotY + Math.cos(physics.angle) * restLength
      
      const dist = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2)
      
      if (dist < 30) {
        physics.isDragging = true
        physics.dragStartX = e.clientX
        physics.dragStartY = e.clientY
      }
    }
    
    const handleMouseUp = (e) => {
      if (physics.isDragging) {
        const rect = canvas.getBoundingClientRect()
        const dx = e.clientX - rect.left - pivotX
        const dy = e.clientY - rect.top - pivotY
        const pullDistance = Math.sqrt(dx * dx + dy * dy)
        
        // Toggle if pulled down far enough
        if (pullDistance > 120) {
          toggleTheme()
        }
        
        physics.isDragging = false
        physics.angularVelocity = physics.angle * 0.03
      }
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isDark, toggleTheme])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '150px',
        height: '250px',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
        }}
      />
    </div>
  )
}

export default ThemeToggle