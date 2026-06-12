import React, { useEffect, useRef, useState, useCallback } from 'react'

const ThemeToggle = () => {
  const canvasRef = useRef(null)
  const [isDark, setIsDark] = useState(true)
  
  // Rope physics: each point has position and velocity
  const pointsRef = useRef([])
  const physicsRef = useRef({
    isDragging: false,
    time: 0,
  })
  
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
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
      canvas.width = 100
      canvas.height = 200
    }
    resize()
    
    const physics = physicsRef.current
    const pointCount = 15
    const spacing = 8
    const pivotX = 50
    const pivotY = 0
    
    // Initialize rope points
    if (pointsRef.current.length === 0) {
      for (let i = 0; i < pointCount; i++) {
        pointsRef.current.push({
          x: pivotX,
          y: pivotY + i * spacing,
          vx: 0,
          vy: 0,
          oldX: pivotX,
          oldY: pivotY + i * spacing,
        })
      }
    }
    
    const points = pointsRef.current
    
    const animate = () => {
      physics.time += 0.016
      
      // Verlet integration for physics
      const gravity = 0.4
      const friction = 0.95
      const stiffness = 0.3
      
      if (physics.isDragging) {
        // Pull the last point (circle) to mouse position
        const lastPoint = points[points.length - 1]
        const dx = mouseRef.current.x - lastPoint.x
        const dy = mouseRef.current.y - lastPoint.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 1) {
          lastPoint.x += dx * 0.3
          lastPoint.y += dy * 0.3
        }
        
        // Check toggle threshold
        if (lastPoint.y > 150) {
          if (!physics.toggled) {
            physics.toggled = true
            toggleTheme()
          }
        }
      } else {
        physics.toggled = false
        
        // Add gentle swing to the last point (pendulum-like)
        const lastPoint = points[points.length - 1]
        const targetX = pivotX + Math.sin(physics.time * 0.5) * 10
        const targetY = 120 + Math.cos(physics.time * 0.7) * 5
        
        lastPoint.x += (targetX - lastPoint.x) * 0.02
        lastPoint.y += (targetY - lastPoint.y) * 0.02
      }
      
      // Verlet integration for all points
      for (let i = 0; i < points.length; i++) {
        if (i === 0) continue // First point is fixed at pivot
        if (physics.isDragging && i === points.length - 1) continue // Last point controlled by mouse
        
        const point = points[i]
        const tempX = point.x
        const tempY = point.y
        
        point.x += (point.x - point.oldX) * friction + 0
        point.y += (point.y - point.oldY) * friction + gravity
        
        point.oldX = tempX
        point.oldY = tempY
      }
      
      // First point always fixed at pivot
      points[0].x = pivotX
      points[0].y = pivotY
      points[0].oldX = pivotX
      points[0].oldY = pivotY
      
      // Spring constraints between points (multiple iterations for stiffness)
      for (let iter = 0; iter < 5; iter++) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const diff = spacing - dist
          
          if (dist === 0) continue
          
          const offsetX = (dx / dist) * diff * stiffness
          const offsetY = (dy / dist) * diff * stiffness
          
          if (i > 0) {
            p1.x -= offsetX * 0.5
            p1.y -= offsetY * 0.5
          }
          
          if (i < points.length - 2 || !physics.isDragging) {
            p2.x += offsetX * 0.5
            p2.y += offsetY * 0.5
          }
        }
      }
      
      // Keep first point fixed
      points[0].x = pivotX
      points[0].y = pivotY
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw rope with smooth curve
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      
      const lastPoint = points[points.length - 1]
      ctx.lineTo(lastPoint.x, lastPoint.y)
      
      ctx.strokeStyle = isDark ? '#c9a96e' : '#1a1a1a'
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      
      // Draw circle at the end
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? '#c9a96e' : '#1a1a1a'
      ctx.fill()
      
      // Small highlight
      ctx.beginPath()
      ctx.arc(lastPoint.x - 2, lastPoint.y - 2, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const lastPoint = points[points.length - 1]
      const dist = Math.sqrt((x - lastPoint.x) ** 2 + (y - lastPoint.y) ** 2)
      
      if (dist < 30) {
        physics.isDragging = true
        physics.toggled = false
        mouseRef.current.isDown = true
      }
    }
    
    const handleMouseUp = () => {
      physics.isDragging = false
      mouseRef.current.isDown = false
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
        width: '100px',
        height: '200px',
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