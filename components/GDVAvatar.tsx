 'use client'

import Image from 'next/image'
import { useState } from 'react'
import { GDV } from '@/lib/types'

interface GDVAvatarProps {
  gdv: GDV
  index: number
  onClick: () => void
}

// Gradient colors cho default avatar - tông mát (teal -> indigo -> cyan)
const gradients = [
  'from-teal-400 to-cyan-500',
  'from-cyan-500 to-indigo-600',
  'from-teal-500 to-indigo-500',
  'from-sky-400 to-indigo-500',
  'from-cyan-400 to-sky-500',
  'from-blue-400 to-teal-500',
  'from-emerald-400 to-teal-500',
  'from-sky-500 to-cyan-500',
]

export default function GDVAvatar({ gdv, index, onClick }: GDVAvatarProps) {
  const gradient = gradients[index % gradients.length]
  const [imageError, setImageError] = useState(false)

  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group"
    >
      {/* Avatar */}
      <div className="relative avatar-hover">
        {/* Glow effect khi hover */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 blur-xl`}></div>
        
        {/* Ring gradient khi hover */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
        
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/80 shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white">
          {gdv.avatar_url && !imageError ? (
            <Image
              src={gdv.avatar_url}
              alt={gdv.ho_ten}
              fill
              onError={() => setImageError(true)}
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold`}>
              {gdv.ho_ten.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Số thứ tự - compact professional badge */}
        <div className="absolute -top-2 -left-2 flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-md px-2 py-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-white text-xs font-semibold shadow-sm">
            {index}
          </div>
        </div>
      </div>
      
      {/* Tên với hiệu ứng gradient khi hover */}
      <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-medium line-clamp-2 max-w-[80px] sm:max-w-[100px] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:bg-clip-text transition-all duration-300">
        {gdv.ho_ten}
      </p>
    </div>
  )
}
