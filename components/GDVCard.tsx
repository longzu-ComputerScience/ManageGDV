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
          <div className="flex items-center gap-3 mb-2">
            {gdv.dich_vu && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold shadow-sm">
                {gdv.dich_vu}
              </span>
            )}

            {typeof gdv.so_tien_coc === 'number' && (
              <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shadow-sm">
                {new Intl.NumberFormat('vi-VN').format(gdv.so_tien_coc)} ₫
              </span>
            )}
          </div>
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
