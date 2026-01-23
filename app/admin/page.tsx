'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import Link from 'next/link'
import { GDV } from '@/lib/types'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [gdvList, setGdvList] = useState<GDV[]>([])
  const [navigatingId, setNavigatingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchGDVs()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
    }
    setLoading(false)
  }

  const fetchGDVs = async () => {
    const { data } = await supabase
      .from('gdv')
      .select('*')
      .order('is_admin', { ascending: false })
      .order('thu_tu', { ascending: true })
    
    if (data) setGdvList(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa GDV này?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('gdv')
        .delete()
        .eq('id', id)

      if (error) throw error

      showToast('Xóa thành công!', 'success')
      fetchGDVs()
    } catch (err: any) {
      showToast('Lỗi: ' + err.message, 'error')
    }
  }

  const navigateTo = async (path: string, id: string) => {
    try {
      setNavigatingId(id)
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-start'))
      await router.push(path)
    } catch (err) {
      // ignore
    } finally {
      setNavigatingId(null)
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-end'))
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AdminSidebar />
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý GDV
              </h1>
              <Link
                href="/admin/add"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium"
              >
                ➕ Thêm mới
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Họ tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dịch vụ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SĐT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gdvList.map((gdv) => (
                    <tr key={gdv.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {gdv.is_admin ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold shadow-md shadow-amber-500/30">
                            <svg className="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                            {gdv.thu_tu || 0}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {gdv.ho_ten}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {gdv.dich_vu || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {gdv.sdt || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => navigateTo(`/gdv/${gdv.id}`, gdv.id)}
                          disabled={!!navigatingId}
                          className="text-primary-600 hover:text-primary-900 disabled:opacity-50"
                          title="Xem"
                        >
                          {navigatingId === gdv.id ? (
                            <span className="inline-flex items-center gap-2">
                              <svg className="w-4 h-4 animate-spin text-primary-600" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.415,31.415"/></svg>
                              <span>Đang chuyển...</span>
                            </span>
                          ) : (
                            'Xem'
                          )}
                        </button>
                        <button
                          onClick={() => navigateTo(`/admin/edit/${gdv.id}`, gdv.id)}
                          disabled={!!navigatingId}
                          className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                          title="Sửa"
                        >
                          {navigatingId === gdv.id ? (
                            <span className="inline-flex items-center gap-2">
                              <svg className="w-4 h-4 animate-spin text-yellow-600" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.415,31.415"/></svg>
                              <span>Đang chuyển...</span>
                            </span>
                          ) : (
                            'Sửa'
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(gdv.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {gdvList.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Chưa có GDV nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
