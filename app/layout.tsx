import './globals.css'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import ToastContainer from '@/components/Toast'
import TopProgress from '@/components/TopProgress'

export const metadata: Metadata = {
  title: 'GDV Manager - Quản lý Giao dịch viên',
  description: 'Hệ thống quản lý thông tin giao dịch viên chuyên nghiệp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="font-sans min-h-screen text-slate-800">
        {/* Background decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Top right bubble */}
          <div className="absolute top-[5%] right-[10%] w-72 h-72 bg-gradient-to-br from-sky-200/40 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          
          {/* Bottom left bubble */}
          <div className="absolute bottom-[15%] left-[5%] w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-sky-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          
          {/* Center accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-100/20 via-sky-100/30 to-blue-100/20 rounded-full blur-3xl"></div>
          
          {/* Small floating dots */}
          <div className="absolute top-[20%] left-[20%] w-4 h-4 bg-sky-300/50 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-[60%] right-[25%] w-3 h-3 bg-cyan-300/50 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-[30%] left-[40%] w-5 h-5 bg-blue-300/40 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        </div>

        <div className="min-h-screen flex flex-col relative">
          <Navbar />
          <Suspense fallback={null}>
            <TopProgress />
          </Suspense>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <FloatingButtons />
        <ToastContainer />
      </body>
    </html>
  )
}
