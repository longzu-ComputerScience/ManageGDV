"use client";

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { GDV } from '@/lib/types'

interface GDVDetailProps {
  gdv: GDV
}

export default function GDVDetail({ gdv }: GDVDetailProps) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gradient-to-br from-primary-100 to-primary-200">
          {gdv.avatar_url && !imgError ? (
            <div className="relative h-96">
              <Image
                src={gdv.avatar_url}
                alt={gdv.ho_ten}
                fill
                onError={() => setImgError(true)}
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
            {(gdv.dich_vu || typeof gdv.so_tien_coc === 'number') && (
              <div className="flex flex-wrap items-center gap-3">
                {gdv.dich_vu && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow-md">
                    <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white"/></svg>
                    {gdv.dich_vu}
                  </span>
                )}

                {typeof gdv.so_tien_coc === 'number' && (
                  <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-lg font-bold shadow-lg animate-pulse">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C7.03 1 3 5.03 3 10C3 14.97 7.03 19 12 19C16.97 19 21 14.97 21 10C21 5.03 16.97 1 12 1ZM12 17C8.13 17 5 13.87 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10C19 13.87 15.87 17 12 17Z" fill="white"/><path d="M11 7H13V11H15V13H13V15H11V13H9V11H11V7Z" fill="white"/></svg>
                    {new Intl.NumberFormat('vi-VN').format(gdv.so_tien_coc)} ₫
                  </span>
                )}
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
