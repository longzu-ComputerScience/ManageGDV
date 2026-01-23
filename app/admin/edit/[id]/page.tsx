'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import GDVForm from '@/components/GDVForm'
import { GDV, GDVFormData } from '@/lib/types'

export default function EditGDVPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [gdv, setGdv] = useState<GDV | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchGDV()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
      return
    }
  }

  const fetchGDV = async () => {
    const { data, error } = await supabase
      .from('gdv')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      showToast('Lỗi: ' + error.message, 'error')
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-start'))
        await router.push('/admin')
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-end'))
      return
    }

    setGdv(data)
    setLoading(false)
  }

  const handleSubmit = async (formData: GDVFormData) => {
    const { error } = await supabase
      .from('gdv')
      .update({
        ...formData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)

    if (error) {
      throw new Error(error.message)
    }

    showToast('Cập nhật thành công!', 'success')
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-start'))
    await router.push('/admin')
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('gdv-navigation-end'))
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

  if (!gdv) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-red-600">Không tìm thấy GDV</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Chỉnh sửa GDV
            </h1>
            <GDVForm 
              initialData={gdv} 
              onSubmit={handleSubmit} 
              submitLabel="Cập nhật"
              showAdminToggle
            />
          </div>
        </div>
      </div>
    </div>
  )
}
