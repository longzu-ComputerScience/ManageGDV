'use client'

import { useState } from 'react'

export default function FloatingButtons() {
  const [showNoiQuy, setShowNoiQuy] = useState(false)
  const [showLienHe, setShowLienHe] = useState(false)

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Nội quy giao dịch */}
        <button
          onClick={() => setShowNoiQuy(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-3 rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-semibold whitespace-nowrap">Nội quy giao dịch</span>
        </button>

        {/* Liên hệ Admin */}
        <button
          onClick={() => setShowLienHe(true)}
          className="group flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold whitespace-nowrap">Liên hệ Admin</span>
        </button>
      </div>

      {/* Modal Nội quy giao dịch */}
      {showNoiQuy && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowNoiQuy(false)}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-modal-enter border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Nội quy giao dịch
              </h2>
              <button 
                onClick={() => setShowNoiQuy(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 text-slate-700">
              <div className="flex gap-4 items-start p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">1</span>
                <p className="pt-1">Kiểm tra kỹ thông tin GDV trước khi giao dịch.</p>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">2</span>
                <p className="pt-1">Chỉ giao dịch với các GDV có trong danh sách này.</p>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">3</span>
                <p className="pt-1">Không chia sẻ thông tin cá nhân, mật khẩu cho bất kỳ ai.</p>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">4</span>
                <p className="pt-1">Lưu giữ biên lai, hóa đơn giao dịch để đối chiếu khi cần.</p>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">5</span>
                <p className="pt-1">Liên hệ Admin ngay nếu phát hiện bất thường.</p>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 font-medium text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Cảnh báo: Chúng tôi không chịu trách nhiệm với các giao dịch ngoài danh sách GDV chính thức.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Liên hệ Admin */}
      {showLienHe && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowLienHe(false)}
        >
          <div 
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full animate-modal-enter border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Liên hệ Admin
              </h2>
              <button 
                onClick={() => setShowLienHe(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600 text-center text-sm">
                Nếu bạn có thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ Admin qua các kênh sau:
              </p>
              
              <div className="space-y-3">
                <a 
                  href="https://zalo.me/0123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 border border-blue-100 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Zalo</p>
                    <p className="text-sm text-slate-500">0123 456 789</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a 
                  href="https://facebook.com/admin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 border border-blue-100 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Facebook</p>
                    <p className="text-sm text-slate-500">facebook.com/admin</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a 
                  href="tel:0123456789"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-2xl transition-all duration-300 border border-emerald-100 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Hotline</p>
                    <p className="text-sm text-slate-500">0123 456 789</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
