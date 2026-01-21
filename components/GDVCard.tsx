import Link from 'next/link'
import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVCardProps {
  gdv: GDV
}

export default function GDVCard({ gdv }: GDVCardProps) {
  return (
    <Link href={`/gdv/${gdv.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
          {gdv.avatar_url ? (
            <Image
              src={gdv.avatar_url}
              alt={gdv.ho_ten}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {gdv.ho_ten.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{gdv.ho_ten}</h3>
          {gdv.chi_nhanh && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Chi nhánh:</span> {gdv.chi_nhanh}
            </p>
          )}
          {gdv.sdt && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">SĐT:</span> {gdv.sdt}
            </p>
          )}
          {gdv.mo_ta && (
            <p className="text-sm text-gray-500 mt-3 overflow-hidden" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {gdv.mo_ta}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
