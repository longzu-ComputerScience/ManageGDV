'use client'

import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { GDV } from '@/lib/types'
import GDVAvatar from '@/components/GDVAvatar'
import GDVModal from '@/components/GDVModal'

export default function HomePage() {
  const [gdvList, setGdvList] = useState<GDV[]>([])
  const [filteredGdvList, setFilteredGdvList] = useState<GDV[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedGDV, setSelectedGDV] = useState<GDV | null>(null)

  useEffect(() => {
    fetchGDVs()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = gdvList.filter(gdv =>
        gdv.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gdv.dich_vu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gdv.sdt?.includes(searchTerm)
      )
      setFilteredGdvList(filtered)
    } else {
      setFilteredGdvList(gdvList)
    }
  }, [searchTerm, gdvList])

  const fetchGDVs = async () => {
    try {
      if (!isSupabaseConfigured()) {
        setError('Supabase chưa được cấu hình. Vui lòng kiểm tra file .env.local')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('gdv')
        .select('*')
        .order('thu_tu', { ascending: true })

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-500">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-red-800 font-semibold mb-1">Có lỗi xảy ra</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-500/30 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent mb-3">
          Danh sách Giao dịch viên
        </h1>
        <p className="text-slate-500 text-lg">
          Tìm và kết nối với <span className="font-semibold text-violet-600">{gdvList.length}</span> giao dịch viên của chúng tôi
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="max-w-xl mx-auto relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-500/30">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, dịch vụ, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-12 py-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent shadow-lg shadow-slate-200/50 transition-all duration-300"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* GDV Grid */}
      {filteredGdvList.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-slate-500 text-lg">
            {searchTerm ? 'Không tìm thấy GDV nào phù hợp' : 'Chưa có GDV nào được thêm'}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-5 md:gap-7">
            {filteredGdvList.map((gdv, index) => (
              <GDVAvatar 
                key={gdv.id} 
                gdv={gdv} 
                index={index + 1}
                onClick={() => setSelectedGDV(gdv)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <GDVModal 
        gdv={selectedGDV} 
        onClose={() => setSelectedGDV(null)} 
      />
    </div>
  )
}
