import React, { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      dotX += (mouseX - dotX) * 0.5
      dotY += (mouseY - dotY) * 0.5

      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
      dot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Add hover effect for interactive elements
    const handleMouseEnter = () => {
      cursor.style.width = '40px'
      cursor.style.height = '40px'
      cursor.style.borderColor = 'var(--accent)'
      cursor.style.backgroundColor = 'var(--accent-soft)'
    }

    const handleMouseLeave = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      cursor.style.borderColor = 'var(--accent)'
      cursor.style.backgroundColor = 'transparent'
    }

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          border: '1px solid var(--accent)',
          borderRadius: '2px',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: 'var(--accent)',
          borderRadius: '0px',
          pointerEvents: 'none',
          zIndex: 10001,
        }}
      />
    </>
  )
}

export default CustomCursor