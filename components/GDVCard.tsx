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
      <div className="flex flex-col items-center cursor-pointer group">
        {/* Avatar with number */}
        <div className="relative">
          {/* Sequential number */}
          <div className="absolute -top-2 -left-2 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10 shadow-md">
            {index + 1}
          </div>
          
          {/* Circular avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-primary-500 transition-all duration-300 shadow-lg group-hover:shadow-xl">
            {gdv.avatar_url ? (
              <Image
                src={gdv.avatar_url}
                alt={gdv.ho_ten}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-primary-600 text-4xl font-bold">
                  {gdv.ho_ten.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Name - centered, max 2 lines */}
        <h3 className="mt-4 text-center text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 max-w-[144px] px-2">
          {gdv.ho_ten}
        </h3>
      </div>
    </Link>
  )
}
