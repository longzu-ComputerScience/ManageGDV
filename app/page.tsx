'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { GDV } from '@/lib/types'
import GDVCard from '@/components/GDVCard'

export default function HomePage() {
  const [gdvList, setGdvList] = useState<GDV[]>([])
  const [filteredGdvList, setFilteredGdvList] = useState<GDV[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchGDVs()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = gdvList.filter(gdv =>
        gdv.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gdv.chi_nhanh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gdv.sdt?.includes(searchTerm)
      )
      setFilteredGdvList(filtered)
    } else {
      setFilteredGdvList(gdvList)
    }
  }, [searchTerm, gdvList])

  const fetchGDVs = async () => {
    try {
      const { data, error } = await supabase
        .from('gdv')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setGdvList(data || [])
      setFilteredGdvList(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <p className="font-semibold">Lỗi:</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">Vui lòng kiểm tra cấu hình Supabase trong file .env</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Danh sách Giao dịch viên
        </h1>
        <p className="text-lg text-gray-600">
          Tìm và kết nối với các giao dịch viên của chúng tôi
        </p>
      </div>

      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên, chi nhánh, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {filteredGdvList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Không tìm thấy GDV nào phù hợp' : 'Chưa có GDV nào được thêm'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGdvList.map((gdv) => (
            <GDVCard key={gdv.id} gdv={gdv} />
          ))}
        </div>
      )}
    </div>
  )
}
