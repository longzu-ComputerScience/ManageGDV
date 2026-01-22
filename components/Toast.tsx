'use client'

import { useEffect, useState } from 'react'

type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' }

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    let idCounter = 1
    const handler = (e: Event) => {
      // @ts-ignore
      const detail = e?.detail
      if (!detail) return
      const toast: Toast = { id: idCounter++, message: detail.message, type: detail.type || 'info' }
      setToasts((t) => [toast, ...t])
      // auto remove
      setTimeout(() => {
        setToasts((t) => t.filter(x => x.id !== toast.id))
      }, 3500)
    }

    window.addEventListener('gdv-toast', handler as EventListener)
    return () => window.removeEventListener('gdv-toast', handler as EventListener)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            `transform transition-all duration-300 px-4 py-3 rounded-lg shadow-lg max-w-sm w-full flex items-start gap-3 ` +
            (t.type === 'success'
              ? 'bg-emerald-500 text-white'
              : t.type === 'error'
              ? 'bg-rose-500 text-white'
              : 'bg-slate-800 text-white')
          }
        >
          <div className="mt-0.5">
            {t.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : t.type === 'error' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
            )}
          </div>
          <div className="text-sm font-medium">
            {t.message}
          </div>
        </div>
      ))}
    </div>
  )
}
