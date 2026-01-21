import Image from 'next/image'
import Link from 'next/link'
import { GDV } from '@/lib/types'

interface GDVDetailProps {
  gdv: GDV
}

export default function GDVDetail({ gdv }: GDVDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gradient-to-br from-primary-100 to-primary-200">
          {gdv.avatar_url ? (
            <div className="relative h-96">
              <Image
                src={gdv.avatar_url}
                alt={gdv.ho_ten}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center">
              <div className="w-40 h-40 bg-primary-500 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                {gdv.ho_ten.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="md:w-2/3 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{gdv.ho_ten}</h1>
          
          <div className="space-y-4">
            {gdv.chi_nhanh && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Chi nhánh:</div>
                <div className="flex-1 text-gray-900">{gdv.chi_nhanh}</div>
              </div>
            )}
            
            {gdv.sdt && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Điện thoại:</div>
                <div className="flex-1">
                  <a href={`tel:${gdv.sdt}`} className="text-primary-600 hover:underline">
                    {gdv.sdt}
                  </a>
                </div>
              </div>
            )}
            
            {gdv.email && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Email:</div>
                <div className="flex-1">
                  <a href={`mailto:${gdv.email}`} className="text-primary-600 hover:underline">
                    {gdv.email}
                  </a>
                </div>
              </div>
            )}
            
            {gdv.dia_chi && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Địa chỉ:</div>
                <div className="flex-1 text-gray-900">{gdv.dia_chi}</div>
              </div>
            )}
            
            {gdv.facebook && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Facebook:</div>
                <div className="flex-1">
                  <a 
                    href={gdv.facebook.startsWith('http') ? gdv.facebook : `https://facebook.com/${gdv.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {gdv.facebook}
                  </a>
                </div>
              </div>
            )}
            
            {gdv.zalo && (
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">Zalo:</div>
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
          
          <div className="mt-8">
            <Link 
              href="/"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium"
            >
              ← Quay lại danh sách
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
