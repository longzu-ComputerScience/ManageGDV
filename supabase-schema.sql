-- Tạo bảng gdv (Giao dịch viên)
CREATE TABLE IF NOT EXISTS gdv (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ho_ten VARCHAR(255) NOT NULL,
  sdt VARCHAR(20),
  email VARCHAR(255),
  facebook VARCHAR(255),
  zalo VARCHAR(20),
  dia_chi TEXT,
  dich_vu VARCHAR(255),
  so_tien_coc NUMERIC,
  avatar_url TEXT,
  mo_ta TEXT,
  so_tai_khoan VARCHAR(50),
  ngan_hang VARCHAR(255),
  thu_tu INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tìm kiếm nhanh hơn
CREATE INDEX IF NOT EXISTS idx_gdv_ho_ten ON gdv(ho_ten);
CREATE INDEX IF NOT EXISTS idx_gdv_dich_vu ON gdv(dich_vu);
CREATE INDEX IF NOT EXISTS idx_gdv_created_at ON gdv(created_at DESC);

-- Bật Row Level Security
ALTER TABLE gdv ENABLE ROW LEVEL SECURITY;

-- Xóa policies cũ nếu có
DROP POLICY IF EXISTS "Allow public read access" ON gdv;
DROP POLICY IF EXISTS "Allow authenticated insert" ON gdv;
DROP POLICY IF EXISTS "Allow authenticated update" ON gdv;
DROP POLICY IF EXISTS "Allow authenticated delete" ON gdv;

-- Policy cho SELECT: Cho phép tất cả (public read)
CREATE POLICY "Allow public read access" ON gdv
  FOR SELECT
  USING (true);

-- Policy cho INSERT: Chỉ authenticated users
CREATE POLICY "Allow authenticated insert" ON gdv
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy cho UPDATE: Chỉ authenticated users
CREATE POLICY "Allow authenticated update" ON gdv
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy cho DELETE: Chỉ authenticated users
CREATE POLICY "Allow authenticated delete" ON gdv
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Thêm dữ liệu mẫu (tùy chọn - comment lại nếu không muốn)
INSERT INTO gdv (ho_ten, sdt, email, dich_vu, so_tien_coc, mo_ta, avatar_url, is_admin) VALUES
  ('Admin', '0900000000', 'admin@example.com', 'admin', 0, 'Admin chính thức', 'https://ui-avatars.com/api/?name=Admin&background=f59e0b&color=fff&size=200', true),
  ('Nguyễn Văn A', '0901234567', 'nguyenvana@example.com', 'mxh', 1000000, 'Giao dịch viên chuyên nghiệp với 5 năm kinh nghiệm trong lĩnh vực tư vấn tài chính', 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0ea5e9&color=fff&size=200', false),
  ('Trần Thị B', '0912345678', 'tranthib@example.com', 'game', 500000, 'Tư vấn nhiệt tình, hỗ trợ khách hàng 24/7. Chuyên môn cao về bất động sản', 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=0ea5e9&color=fff&size=200', false),
  ('Lê Minh C', '0923456789', 'leminhc@example.com', 'mxh', 0, 'Có kinh nghiệm hơn 10 năm trong ngành. Luôn đặt lợi ích khách hàng lên hàng đầu', 'https://ui-avatars.com/api/?name=Le+Minh+C&background=0ea5e9&color=fff&size=200', false)
ON CONFLICT DO NOTHING;

-- Tạo function để tự động update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tạo trigger để tự động update updated_at khi có thay đổi
DROP TRIGGER IF EXISTS update_gdv_updated_at ON gdv;
CREATE TRIGGER update_gdv_updated_at
    BEFORE UPDATE ON gdv
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket + policies cho upload avatar
INSERT INTO storage.buckets (id, name, public)
VALUES ('gdv-avatars', 'gdv-avatars', true)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read gdv avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload gdv avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update gdv avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete gdv avatars" ON storage.objects;

CREATE POLICY "Allow public read gdv avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gdv-avatars');

CREATE POLICY "Allow authenticated upload gdv avatars"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'gdv-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update gdv avatars"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'gdv-avatars' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'gdv-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete gdv avatars"
ON storage.objects
FOR DELETE
USING (bucket_id = 'gdv-avatars' AND auth.role() = 'authenticated');
