import Link from 'next/link'
import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVCardProps {
  gdv: GDV
  index: number
}

export default function GDVCard({ gdv, index }: GDVCardProps) {
  return (
    <Link href={`/gdv/${gdv.id}`}>
      <div className="group flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer relative">
        {/* Sequential number badge */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">
          {index}
        </div>
        
        {/* Circular Avatar */}
        <div className="relative w-28 h-28 mb-3">
          {gdv.avatar_url ? (
            <Image
              src={gdv.avatar_url}
              alt={gdv.ho_ten}
              fill
              className="object-cover rounded-full border-4 border-primary-200 group-hover:border-primary-400 transition-colors"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-primary-200 group-hover:border-primary-400 transition-colors">
              {gdv.ho_ten.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {gdv.ho_ten}
        </h3>
      </div>
    </Link>
  )
}
