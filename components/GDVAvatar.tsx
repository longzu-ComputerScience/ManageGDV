'use client'

import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVAvatarProps {
  gdv: GDV
  index: number
  onClick: () => void
}

// Gradient colors cho default avatar - tone tím hồng
const gradients = [
  'from-violet-500 to-fuchsia-500',
  'from-purple-500 to-pink-500',
  'from-fuchsia-500 to-rose-500',
  'from-indigo-500 to-violet-500',
  'from-pink-500 to-fuchsia-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
  'from-purple-400 to-fuchsia-500',
]

export default function GDVAvatar({ gdv, index, onClick }: GDVAvatarProps) {
  const gradient = gradients[index % gradients.length]

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
          {gdv.avatar_url ? (
            <Image
              src={gdv.avatar_url}
              alt={gdv.ho_ten}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold`}>
              {gdv.ho_ten.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Số thứ tự - badge đẹp hơn */}
        <div className="absolute -top-1 -left-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
          {index}
        </div>
      </div>
      
      {/* Tên với hiệu ứng gradient khi hover */}
      <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-medium line-clamp-2 max-w-[80px] sm:max-w-[100px] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:bg-clip-text transition-all duration-300">
        {gdv.ho_ten}
      </p>
    </div>
  )
}
