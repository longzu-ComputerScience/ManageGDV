import Link from 'next/link'
import Image from 'next/image'
import { GDV } from '@/lib/types'

interface GDVCardProps {
  gdv: GDV
}

export default function GDVCard({ gdv }: GDVCardProps) {
  return (
    <Link href={`/gdv/${gdv.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-primary-300">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {gdv.avatar_url ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-100">
                  <Image
                    src={gdv.avatar_url}
                    alt={gdv.ho_ten}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold ring-2 ring-primary-100">
                  {gdv.ho_ten.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{gdv.ho_ten}</h3>
              {gdv.chi_nhanh && (
                <p className="text-sm text-gray-600 mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="truncate">{gdv.chi_nhanh}</span>
                </p>
              )}
              {gdv.sdt && (
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="truncate">{gdv.sdt}</span>
                </p>
              )}
            </div>
          </div>
          {gdv.mo_ta && (
            <p className="text-sm text-gray-500 mt-4 line-clamp-2">
              {gdv.mo_ta}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
