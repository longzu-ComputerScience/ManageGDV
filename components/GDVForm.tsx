'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { GDVFormData } from '@/lib/types'

interface GDVFormProps {
  initialData?: GDVFormData
  onSubmit: (data: GDVFormData) => Promise<void>
  submitLabel?: string
  showAdminToggle?: boolean
}

export default function GDVForm({ initialData, onSubmit, submitLabel = 'Lưu', showAdminToggle = false }: GDVFormProps) {
  const initialAvatarUrlRef = useRef(initialData?.avatar_url || '')
  const [formData, setFormData] = useState<GDVFormData>(
    initialData || {
      ho_ten: '',
      sdt: '',
      email: '',
      facebook: '',
      zalo: '',
      dia_chi: '',
      dich_vu: '',
      so_tien_coc: null,
      avatar_url: '',
      mo_ta: '',
      so_tai_khoan: '',
      ngan_hang: '',
      thu_tu: 0,
      is_admin: false,
    }
  )
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialAvatarUrlRef.current || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const storageBucket = 'gdv-avatars'

  const getStoragePath = (url: string) => {
    const marker = `/storage/v1/object/public/${storageBucket}/`
    const index = url.indexOf(marker)
    if (index === -1) return null
    return url.slice(index + marker.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.ho_ten.trim()) {
      setError('Họ tên là bắt buộc')
      return
    }
    setLoading(true)
    setError('')

    try {
      let nextAvatarUrl = (formData.avatar_url || '').trim()
      const currentAvatarUrl = initialAvatarUrlRef.current || ''

      if (avatarFile) {
        const safeName = avatarFile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '')
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${safeName}`
        const filePath = `avatars/${fileName}`

        const { error: uploadError } = await supabase
          .storage
          .from(storageBucket)
          .upload(filePath, avatarFile, {
            upsert: true,
            contentType: avatarFile.type || undefined,
          })

        if (uploadError) {
          const detail = uploadError.message ? ` (${uploadError.message})` : ''
          throw new Error(`Tải ảnh thất bại. Vui lòng kiểm tra bucket "gdv-avatars" trên Supabase.${detail}`)
        }

        const { data: publicData } = supabase
          .storage
          .from(storageBucket)
          .getPublicUrl(filePath)

        nextAvatarUrl = publicData?.publicUrl || ''

        if (currentAvatarUrl && currentAvatarUrl !== nextAvatarUrl) {
          const oldPath = getStoragePath(currentAvatarUrl)
          if (oldPath) {
            await supabase.storage.from(storageBucket).remove([oldPath])
          }
        }
      } else if (nextAvatarUrl && currentAvatarUrl && currentAvatarUrl !== nextAvatarUrl) {
        const oldPath = getStoragePath(currentAvatarUrl)
        if (oldPath) {
          await supabase.storage.from(storageBucket).remove([oldPath])
        }
      }

      await onSubmit({
        ...formData,
        avatar_url: nextAvatarUrl || null,
      })
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'so_tien_coc' ? (value === '' ? null : parseFloat(value)) : (value || null),
    })
  }

  const handleAdminToggle = (checked: boolean) => {
    setFormData({
      ...formData,
      is_admin: checked,
    })
  }

  const handleAvatarUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setAvatarFile(null)
    setFormData({ ...formData, avatar_url: value || null })
  }

  const handleAvatarFileChange = (file: File | null) => {
    setAvatarFile(file)
    if (file) {
      setFormData({ ...formData, avatar_url: null })
    }
  }

  const handleRemoveAvatar = async () => {
    if (loading) return
    const currentAvatarUrl = initialAvatarUrlRef.current || formData.avatar_url || ''
    const oldPath = currentAvatarUrl ? getStoragePath(currentAvatarUrl) : null

    try {
      setLoading(true)
      if (oldPath) {
        await supabase.storage.from(storageBucket).remove([oldPath])
      }
      setAvatarFile(null)
      setAvatarPreview(null)
      setFormData({ ...formData, avatar_url: null })
      initialAvatarUrlRef.current = ''
    } catch (err: any) {
      setError(err.message || 'Không thể xóa ảnh hiện tại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(formData.avatar_url || initialAvatarUrlRef.current || null)
      return
    }
    const objectUrl = URL.createObjectURL(avatarFile)
    setAvatarPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [avatarFile, formData.avatar_url])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vị trí hiển thị
          </label>
          <div className="space-y-2">
            {showAdminToggle && (
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={!!formData.is_admin}
                  onChange={(e) => handleAdminToggle(e.target.checked)}
                  className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-400"
                />
                <span>Đánh dấu là Admin</span>
              </label>
            )}
            <input
              type="number"
              id="thu_tu"
              name="thu_tu"
              value={formData.thu_tu || 0}
              onChange={(e) => setFormData({ ...formData, thu_tu: parseInt(e.target.value) || 0 })}
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500">
              {formData.is_admin ? 'Số nhỏ hiển thị trước trong nhóm Admin' : 'Số nhỏ hiển thị trước'}
            </p>
          </div>
        </div>
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
        <label htmlFor="dich_vu" className="block text-sm font-medium text-gray-700 mb-2">
          Dịch vụ
        </label>
        <input
          type="text"
          id="dich_vu"
          name="dich_vu"
          value={formData.dich_vu || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập dịch vụ (ví dụ: mxh, game, ...)"
        />
      </div>

      <div>
        <label htmlFor="so_tien_coc" className="block text-sm font-medium text-gray-700 mb-2">
          Số tiền cọc (VND)
        </label>
        <input
          type="number"
          id="so_tien_coc"
          name="so_tien_coc"
          value={formData.so_tien_coc ?? ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Nhập số tiền cọc"
          min={0}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="so_tai_khoan" className="block text-sm font-medium text-gray-700 mb-2">
            Số tài khoản ngân hàng
          </label>
          <input
            type="text"
            id="so_tai_khoan"
            name="so_tai_khoan"
            value={formData.so_tai_khoan || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Nhập số tài khoản"
          />
        </div>

        <div>
          <label htmlFor="ngan_hang" className="block text-sm font-medium text-gray-700 mb-2">
            Tên ngân hàng
          </label>
          <input
            type="text"
            id="ngan_hang"
            name="ngan_hang"
            value={formData.ngan_hang || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="VD: Vietcombank, BIDV, MB Bank..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh đại diện
        </label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400">Chưa có ảnh</span>
              )}
            </div>
            <div className="flex-1 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <input
                  type="url"
                  id="avatar_url"
                  name="avatar_url"
                  value={formData.avatar_url || ''}
                  onChange={handleAvatarUrlChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  id="avatar_file"
                  accept="image/*"
                  onChange={(e) => handleAvatarFileChange(e.target.files?.[0] || null)}
                  disabled={loading}
                  className="block text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-600 file:text-white file:cursor-pointer hover:file:bg-primary-700"
                />
                {avatarFile && (
                  <button
                    type="button"
                    onClick={() => handleAvatarFileChange(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 text-left"
                  >
                    Bỏ chọn ảnh
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Nếu có tải ảnh lên sẽ ưu tiên dùng ảnh; nếu không thì dùng link.
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Ảnh upload sẽ được lưu ở bucket <span className="font-semibold">gdv-avatars</span> trên Supabase.
          </p>
          {(avatarPreview || formData.avatar_url || avatarFile) && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              disabled={loading}
              className="text-xs text-red-500 hover:text-red-600 text-left"
            >
              Xóa avatar hiện tại
            </button>
          )}
        </div>
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
