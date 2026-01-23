'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState, useEffect, useRef } from 'react'
import { showToast } from '@/lib/toast'
import { navigateWithProgress } from '@/lib/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    // Check saved theme
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.body.classList.add('dark')
    }

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setIsAdmin(!!user)
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      await navigateWithProgress(router, '/')
      showToast('Đăng xuất thành công', 'success')
    } catch (err: any) {
      showToast(err?.message || 'Lỗi khi đăng xuất', 'error')
    }
  }

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  // Secret login: Click logo 5 times within 3 seconds
  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount >= 5) {
      setLogoClickCount(0)
      await navigateWithProgress(router, '/admin/login')
      return
    }

    clickTimeoutRef.current = setTimeout(() => {
      setLogoClickCount(0)
    }, 3000)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center group cursor-pointer" onClick={handleLogoClick}>
              <div className="w-12 h-12 rounded-xl overflow-hidden mr-3 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="CI24 Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                CI24
              </span>
            </div>
            <div className="hidden md:flex ml-10 space-x-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
              >
                Danh sách GDV
              </Link>
              <Link
                href="/nap-game"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/nap-game'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
              >
                Nạp Game
              </Link>
              <Link
                href="/noi-quy-giao-dich"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/noi-quy-giao-dich'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
              >
                Nội quy giao dịch
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname?.startsWith('/admin') && pathname !== '/admin/login'
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                >
                  Quản lý Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 hover:shadow-md"
              title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              {isDark ? (
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {isAdmin && (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md shadow-red-500/30 hover:shadow-red-500/40"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
