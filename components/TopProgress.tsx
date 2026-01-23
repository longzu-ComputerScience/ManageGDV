'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function TopProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastKeyRef = useRef<string>('')

  const start = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    if (!active) {
      startTimeRef.current = Date.now()
      setActive(true)
    }
  }, [active])

  const stop = useCallback(() => {
    if (!active) return

    const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 0
    const minVisibleMs = 250
    const remaining = Math.max(0, minVisibleMs - elapsed)

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    hideTimeoutRef.current = setTimeout(() => {
      setActive(false)
      startTimeRef.current = null
      hideTimeoutRef.current = null
    }, remaining)
  }, [active])

  useEffect(() => {
    const onStart = () => start()
    const onEnd = () => stop()

    window.addEventListener('gdv-navigation-start', onStart)
    window.addEventListener('gdv-navigation-end', onEnd)

    return () => {
      window.removeEventListener('gdv-navigation-start', onStart)
      window.removeEventListener('gdv-navigation-end', onEnd)
    }
  }, [start, stop])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#')) return
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      const currentUrl = new URL(window.location.href)
      if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) return

      start()
    }

    const handlePopState = () => {
      start()
    }

    document.addEventListener('click', handleClick, true)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [start])

  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ''}`
    if (lastKeyRef.current && lastKeyRef.current !== key) {
      stop()
    }
    lastKeyRef.current = key
  }, [pathname, searchParams, stop])

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
