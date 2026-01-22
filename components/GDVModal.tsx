'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVModalProps {
  gdv: GDV | null
  onClose: () => void
}

export default function GDVModal({ gdv, onClose }: GDVModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (gdv) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [gdv, onClose])

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!gdv) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modal-enter border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 p-8 rounded-t-3xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all hover:rotate-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl shadow-violet-500/50 ring-4 ring-white/20">
              {gdv.avatar_url && !avatarError ? (
                <Image
                  src={gdv.avatar_url}
                  alt={gdv.ho_ten}
                  width={112}
                  height={112}
                  onError={() => setAvatarError(true)}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur flex items-center justify-center text-white text-4xl font-bold">
                  {gdv.ho_ten.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-white text-center drop-shadow-lg">{gdv.ho_ten}</h2>
            {(gdv.dich_vu || typeof gdv.so_tien_coc === 'number') && (
              <div className="mt-3 flex flex-wrap items-center gap-3 justify-center">
                {gdv.dich_vu && (
                  <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {gdv.dich_vu}
                  </span>
                )}

                {typeof gdv.so_tien_coc === 'number' && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-base font-extrabold shadow-2xl animate-pulse">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C7.03 1 3 5.03 3 10C3 14.97 7.03 19 12 19C16.97 19 21 14.97 21 10C21 5.03 16.97 1 12 1ZM12 17C8.13 17 5 13.87 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10C19 13.87 15.87 17 12 17Z" fill="white"/><path d="M11 7H13V11H15V13H13V15H11V13H9V11H11V7Z" fill="white"/></svg>
                    {new Intl.NumberFormat('vi-VN').format(gdv.so_tien_coc)} ₫
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-3">
          {gdv.sdt && (
            <InfoRowWithCopy 
              icon={<PhoneIcon />}
              label="Điện thoại" 
              value={gdv.sdt}
              onCopy={() => copyToClipboard(gdv.sdt!, 'sdt')}
              copied={copiedField === 'sdt'}
            />
          )}
          
          {gdv.email && (
            <InfoRowWithCopy 
              icon={<EmailIcon />}
              label="Email" 
              value={gdv.email}
              onCopy={() => copyToClipboard(gdv.email!, 'email')}
              copied={copiedField === 'email'}
            />
          )}

          {gdv.so_tai_khoan && (
            <InfoRowWithCopy 
              icon={<BankIcon />}
              label={gdv.ngan_hang || 'Số tài khoản'} 
              value={gdv.so_tai_khoan}
              onCopy={() => copyToClipboard(gdv.so_tai_khoan!, 'stk')}
              copied={copiedField === 'stk'}
            />
          )}
          
          {gdv.dia_chi && (
            <InfoRow 
              icon={<LocationIcon />}
              label="Địa chỉ" 
              value={gdv.dia_chi}
            />
          )}
          
          {gdv.mo_ta && (
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Ghi chú</p>
              <p className="text-slate-700 text-sm leading-relaxed">{gdv.mo_ta}</p>
            </div>
          )}
        </div>
        
        {/* Social Links */}
        {(gdv.facebook || gdv.zalo) && (
          <div className="px-6 pb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3 font-semibold">Liên hệ qua MXH</p>
            <div className="flex gap-3">
              {gdv.facebook && (
                <a 
                  href={gdv.facebook.startsWith('http') ? gdv.facebook : `https://facebook.com/${gdv.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-2xl font-semibold text-center transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <FacebookIcon />
                  Facebook
                </a>
              )}
              {gdv.zalo && (
                <a 
                  href={`https://zalo.me/${gdv.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-2xl font-semibold text-center transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <ChatIcon />
                  Zalo
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { 
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-100">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-violet-500 shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-slate-800 text-sm font-semibold truncate">{value}</p>
      </div>
    </div>
  )
}

function InfoRowWithCopy({ icon, label, value, onCopy, copied }: { 
  icon: React.ReactNode
  label: string
  value: string
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-100">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-violet-500 shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-slate-800 text-sm font-semibold truncate">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          copied 
            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30' 
            : 'bg-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 text-slate-500 hover:text-white shadow-sm hover:shadow-md hover:shadow-violet-500/30'
        }`}
        title={copied ? 'Đã sao chép!' : 'Sao chép'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

// Icons
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ChatIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const BankIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9-4 9 4v2H3V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 18H3v-2h18v2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8v8M9 8v8M15 8v8M19 8v8" />
  </svg>
)

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)
