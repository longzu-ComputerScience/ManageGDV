'use client'

export default function ParticlesBackground() {
  return (
    <div className="particles">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="particle"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  )
}
