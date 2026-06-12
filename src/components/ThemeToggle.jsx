import React, { useEffect, useRef, useState, useCallback } from 'react'
import { playDrag } from '../utils/audio'

const ThemeToggle = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isDark, setIsDark] = useState(true)
  
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
    const container = containerRef.current
    
    const resize = () => {
      const isMobile = window.innerWidth < 768
      const w = isMobile ? 60 : 300
      const h = isMobile ? 180 : 600
      canvas.width = w
      canvas.height = h
      if (container) {
        container.style.width = w + 'px'
        container.style.height = h + 'px'
      }
    }
    resize()
    window.addEventListener('resize', resize)
    
    const physics = physicsRef.current
    const pointCount = 25
    const spacing = 5
    const pivotX = canvas.width / 2
    const pivotY = 0
    
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
      
      const gravity = 0.8
      const friction = 0.92
      const stiffness = 0.6
      
      if (physics.isDragging) {
        const lastPoint = points[points.length - 1]
        const dx = mouseRef.current.x - lastPoint.x
        const dy = mouseRef.current.y - lastPoint.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist > 1) {
          lastPoint.x += dx * 0.2
          lastPoint.y += dy * 0.2
        }
        
        if (lastPoint.y > 200) {
          if (!physics.toggled) {
            physics.toggled = true
            toggleTheme()
          }
        }
      } else {
        physics.toggled = false
        
        const lastPoint = points[points.length - 1]
        const targetX = pivotX + Math.sin(physics.time * 0.2) * 5
        const targetY = 130 + Math.cos(physics.time * 0.3) * 3
        
        lastPoint.x += (targetX - lastPoint.x) * 0.015
        lastPoint.y += (targetY - lastPoint.y) * 0.015
      }
      
      for (let i = 0; i < points.length; i++) {
        if (i === 0) continue
        if (physics.isDragging && i === points.length - 1) continue
        
        const point = points[i]
        const tempX = point.x
        const tempY = point.y
        
        point.x += (point.x - point.oldX) * friction
        point.y += (point.y - point.oldY) * friction + gravity
        
        point.oldX = tempX
        point.oldY = tempY
      }
      
      points[0].x = pivotX
      points[0].y = pivotY
      points[0].oldX = pivotX
      points[0].oldY = pivotY
      
      for (let iter = 0; iter < 10; iter++) {
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
      
      points[0].x = pivotX
      points[0].y = pivotY
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw top bar
      ctx.fillStyle = isDark ? '#ED8B2F' : '#1a1a1a'
      ctx.fillRect(pivotX - 15, 0, 30, 6)
      
      // Draw rope
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      
      const lastPoint = points[points.length - 1]
      ctx.lineTo(lastPoint.x, lastPoint.y)
      
      ctx.strokeStyle = isDark ? '#ED8B2F' : '#1a1a1a'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      
      // Draw circle
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, 20, 0, Math.PI * 2)
      ctx.fillStyle = isDark ? '#ED8B2F' : '#1a1a1a'
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3
      ctx.stroke()
      
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
      
      if (dist < 50) {
        physics.isDragging = true
        physics.toggled = false
        mouseRef.current.isDown = true
        playDrag()
      }
    }
    
    const handleMouseUp = () => {
      physics.isDragging = false
      mouseRef.current.isDown = false
    }
    
    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      
      const lastPoint = points[points.length - 1]
      const dist = Math.sqrt((x - lastPoint.x) ** 2 + (y - lastPoint.y) ** 2)
      
      if (dist < 50) {
        physics.isDragging = true
        physics.toggled = false
        mouseRef.current.x = x
        mouseRef.current.y = y
        playDrag()
        e.preventDefault()
      }
    }
    
    const handleTouchMove = (e) => {
      if (physics.isDragging) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = touch.clientX - rect.left
        mouseRef.current.y = touch.clientY - rect.top
        e.preventDefault()
      }
    }
    
    const handleTouchEnd = () => {
      physics.isDragging = false
      mouseRef.current.isDown = false
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isDark, toggleTheme])

  return (
    <div
      ref={containerRef}
      className="theme-toggle-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          cursor: 'grab',
        }}
      />
    </div>
  )
}

export default ThemeToggle