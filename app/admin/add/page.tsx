'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import GDVForm from '@/components/GDVForm'
import { GDVFormData } from '@/lib/types'

export default function AddGDVPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
    }
    setLoading(false)
  }

  const handleSubmit = async (formData: GDVFormData) => {
    const { error } = await supabase
      .from('gdv')
      .insert([formData])

    if (error) {
      throw new Error(error.message)
    }

    showToast('Thêm GDV thành công!', 'success')
    router.push('/admin')
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Thêm GDV mới
            </h1>
            <GDVForm onSubmit={handleSubmit} submitLabel="Thêm GDV" />
          </div>
        </div>
      </div>
    </div>
  )
}
