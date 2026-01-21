'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVModalProps {
  gdv: GDV | null
  isOpen: boolean
  onClose: () => void
}

export default function GDVModal({ gdv, isOpen, onClose }: GDVModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !gdv) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-white bg-opacity-90">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Đóng"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="md:flex">
          {/* Avatar Section */}
          <div className="md:w-2/5 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center p-8">
            {gdv.avatar_url ? (
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={gdv.avatar_url}
                  alt={gdv.ho_ten}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-64 h-64 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-white text-8xl font-bold">
                  {gdv.ho_ten.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-3/5 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{gdv.ho_ten}</h2>
            
            <div className="space-y-4">
              {gdv.chi_nhanh && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Chi nhánh:</span>
                  </div>
                  <div className="flex-1 text-gray-900">{gdv.chi_nhanh}</div>
                </div>
              )}
              
              {gdv.sdt && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Điện thoại:</span>
                  </div>
                  <div className="flex-1">
                    <a href={`tel:${gdv.sdt}`} className="text-primary-600 hover:underline">
                      {gdv.sdt}
                    </a>
                  </div>
                </div>
              )}
              
              {gdv.email && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Email:</span>
                  </div>
                  <div className="flex-1">
                    <a href={`mailto:${gdv.email}`} className="text-primary-600 hover:underline break-all">
                      {gdv.email}
                    </a>
                  </div>
                </div>
              )}
              
              {gdv.dia_chi && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Địa chỉ:</span>
                  </div>
                  <div className="flex-1 text-gray-900">{gdv.dia_chi}</div>
                </div>
              )}
              
              {gdv.facebook && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Facebook:</span>
                  </div>
                  <div className="flex-1">
                    <a 
                      href={gdv.facebook.startsWith('http') ? gdv.facebook : `https://facebook.com/${gdv.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline break-all"
                    >
                      {gdv.facebook}
                    </a>
                  </div>
                </div>
              )}
              
              {gdv.zalo && (
                <div className="flex items-start">
                  <div className="w-32 flex-shrink-0">
                    <span className="font-semibold text-gray-700">Zalo:</span>
                  </div>
                  <div className="flex-1 text-gray-900">{gdv.zalo}</div>
                </div>
              )}
              
              {gdv.mo_ta && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-2">Mô tả:</h3>
                  <p className="text-gray-900 whitespace-pre-line">{gdv.mo_ta}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
