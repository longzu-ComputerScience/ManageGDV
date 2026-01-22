'use client'

import { useEffect, useState } from 'react'

export default function TopProgress() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onStart = () => setActive(true)
    const onEnd = () => setActive(false)

    window.addEventListener('gdv-navigation-start', onStart)
    window.addEventListener('gdv-navigation-end', onEnd)

    return () => {
      window.removeEventListener('gdv-navigation-start', onStart)
      window.removeEventListener('gdv-navigation-end', onEnd)
    }
  }, [])

  return (
    <div aria-hidden>
      <div className={`fixed top-0 left-0 right-0 h-1 z-50 transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-1 w-2/3 mx-auto rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-cyan-400 to-indigo-600 animate-progress`}></div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress { animation: progress 1.2s linear infinite; }
      `}</style>
    </div>
  )
}
