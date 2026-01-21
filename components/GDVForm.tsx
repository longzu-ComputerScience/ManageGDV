'use client'

import { useState } from 'react'
import { GDVFormData } from '@/lib/types'

interface GDVFormProps {
  initialData?: GDVFormData
  onSubmit: (data: GDVFormData) => Promise<void>
  submitLabel?: string
}

export default function GDVForm({ initialData, onSubmit, submitLabel = 'Lưu' }: GDVFormProps) {
  const [formData, setFormData] = useState<GDVFormData>(
    initialData || {
      ho_ten: '',
      sdt: '',
      email: '',
      facebook: '',
      zalo: '',
      dia_chi: '',
      chi_nhanh: '',
      avatar_url: '',
      mo_ta: '',
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ho_ten.trim()) {
      setError('Họ tên là bắt buộc')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="ho_ten" className="block text-sm font-medium text-gray-700 mb-2">
          Họ tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ho_ten"
          name="ho_ten"
          value={formData.ho_ten || ''}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập họ tên"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sdt" className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            id="sdt"
            name="sdt"
            value={formData.sdt || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="0123456789"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="facebook.com/username hoặc username"
          />
        </div>

        <div>
          <label htmlFor="zalo" className="block text-sm font-medium text-gray-700 mb-2">
            Zalo
          </label>
          <input
            type="text"
            id="zalo"
            name="zalo"
            value={formData.zalo || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Số Zalo"
          />
        </div>
      </div>

      <div>
        <label htmlFor="chi_nhanh" className="block text-sm font-medium text-gray-700 mb-2">
          Chi nhánh
        </label>
        <input
          type="text"
          id="chi_nhanh"
          name="chi_nhanh"
          value={formData.chi_nhanh || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập chi nhánh làm việc"
        />
      </div>

      <div>
        <label htmlFor="dia_chi" className="block text-sm font-medium text-gray-700 mb-2">
          Địa chỉ
        </label>
        <input
          type="text"
          id="dia_chi"
          name="dia_chi"
          value={formData.dia_chi || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div>
        <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 mb-2">
          URL Ảnh đại diện
        </label>
        <input
          type="url"
          id="avatar_url"
          name="avatar_url"
          value={formData.avatar_url || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      <div>
        <label htmlFor="mo_ta" className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả/Ghi chú
        </label>
        <textarea
          id="mo_ta"
          name="mo_ta"
          value={formData.mo_ta || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập mô tả hoặc ghi chú về GDV"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang xử lý...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
