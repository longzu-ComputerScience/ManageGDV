export interface GDV {
  id: string
  ho_ten: string
  sdt?: string | null
  email?: string | null
  facebook?: string | null
  zalo?: string | null
  dia_chi?: string | null
  chi_nhanh?: string | null
  avatar_url?: string | null
  mo_ta?: string | null
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
  chi_nhanh?: string | null
  avatar_url?: string | null
  mo_ta?: string | null
}
