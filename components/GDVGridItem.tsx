import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVGridItemProps {
  gdv: GDV
  index: number
  onClick: () => void
}

export default function GDVGridItem({ gdv, index, onClick }: GDVGridItemProps) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-3 cursor-pointer group transition-transform hover:scale-105"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Xem chi tiết ${gdv.ho_ten}`}
    >
      {/* Circular Avatar */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-shadow border-4 border-white">
        {gdv.avatar_url ? (
          <Image
            src={gdv.avatar_url}
            alt={gdv.ho_ten}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
              {gdv.ho_ten.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      {/* Label: Index + Name */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          #{index + 1} - {gdv.ho_ten}
        </p>
      </div>
    </div>
  )
}
