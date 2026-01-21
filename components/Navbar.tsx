'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setIsAdmin(!!user)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">GDV Manager</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === '/' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Danh sách GDV
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname?.startsWith('/admin') && pathname !== '/admin/login'
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Quản lý Admin
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Đăng nhập Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
