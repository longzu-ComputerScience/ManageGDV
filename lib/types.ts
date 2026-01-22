export interface GDV {
  id: string
  ho_ten: string
  sdt?: string | null
  email?: string | null
  facebook?: string | null
  zalo?: string | null
  dia_chi?: string | null
  dich_vu?: string | null
  so_tien_coc?: number | null   // ✅ thêm dòng này
  avatar_url?: string | null
  mo_ta?: string | null
  so_tai_khoan?: string | null
  ngan_hang?: string | null
  thu_tu?: number | null
  created_at?: string
  updated_at?: string
}


export interface GDVFormData {
  ho_ten: string
  sdt?: string | null
  email?: string | null
  facebook?: string | null
  zalo?: string | null
  dia_chi?: string | null
  dich_vu?: string | null
  so_tien_coc?: number | null
  avatar_url?: string | null
  mo_ta?: string | null
  so_tai_khoan?: string | null
  ngan_hang?: string | null
  thu_tu?: number | null
}
