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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [hideTopBar, setHideTopBar] = useState(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollYRef = useRef(0)

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollYRef.current

      if (currentScrollY < 10) {
        setHideTopBar(false)
      } else if (isScrollingDown && currentScrollY > 80) {
        setHideTopBar(true)
      } else if (!isScrollingDown) {
        setHideTopBar(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  const closeMenu = () => setIsMenuOpen(false)

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
        <div
          className={`flex justify-between h-16 transition-all duration-300 overflow-hidden md:overflow-visible md:opacity-100 md:translate-y-0 md:h-16 ${hideTopBar
            ? 'max-h-0 opacity-0 -translate-y-4 pointer-events-none md:max-h-none'
            : 'max-h-20 opacity-100 translate-y-0'
            }`}
        >
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
                className="hidden md:inline-flex bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-md shadow-red-500/30 hover:shadow-red-500/40"
              >
                Đăng xuất
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 hover:shadow-md"
              aria-label="Mở menu"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden border-t border-slate-200/60 pt-2 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Link
              href="/"
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${pathname === '/'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-400/40'
                : 'bg-white/70 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-slate-800'
                }`}
            >
              Danh sách GDV
            </Link>
            <Link
              href="/nap-game"
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${pathname === '/nap-game'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-400/40'
                : 'bg-white/70 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-slate-800'
                }`}
            >
              Nạp Game
            </Link>
            <Link
              href="/noi-quy-giao-dich"
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${pathname === '/noi-quy-giao-dich'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-400/40'
                : 'bg-white/70 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-slate-800'
                }`}
            >
              Nội quy giao dịch
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${pathname?.startsWith('/admin') && pathname !== '/admin/login'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 border border-emerald-400/40'
                  : 'bg-white/70 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-slate-800'
                  }`}
              >
                Quản lý Admin
              </Link>
            )}
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-2 pb-4 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
            >
              Danh sách GDV
            </Link>
            <Link
              href="/nap-game"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/nap-game'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
            >
              Nạp Game
            </Link>
            <Link
              href="/noi-quy-giao-dich"
              onClick={closeMenu}
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname === '/noi-quy-giao-dich'
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
            >
              Nội quy giao dịch
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${pathname?.startsWith('/admin') && pathname !== '/admin/login'
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                >
                  Quản lý Admin
                </Link>
                <button
                  onClick={() => { closeMenu(); handleLogout(); }}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md shadow-red-500/30 hover:from-red-600 hover:to-rose-600 transition-all duration-300"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
