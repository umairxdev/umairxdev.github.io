let audioCtx = null

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

export const playClick = () => {
  try {
    const ctx = getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'square'
    osc.frequency.setValueAtTime(1000, ctx.currentTime)
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.02)
  } catch (e) {}
}

export const playDrag = () => {
  try {
    const ctx = getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.type = 'square'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.03)
  } catch (e) {}
}
