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
INSERT INTO gdv (ho_ten, sdt, email, dich_vu, so_tien_coc, mo_ta, avatar_url) VALUES
  ('Nguyễn Văn A', '0901234567', 'nguyenvana@example.com', 'mxh', 1000000, 'Giao dịch viên chuyên nghiệp với 5 năm kinh nghiệm trong lĩnh vực tư vấn tài chính', 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=0ea5e9&color=fff&size=200'),
  ('Trần Thị B', '0912345678', 'tranthib@example.com', 'game', 500000, 'Tư vấn nhiệt tình, hỗ trợ khách hàng 24/7. Chuyên môn cao về bất động sản', 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=0ea5e9&color=fff&size=200'),
  ('Lê Minh C', '0923456789', 'leminhc@example.com', 'mxh', 0, 'Có kinh nghiệm hơn 10 năm trong ngành. Luôn đặt lợi ích khách hàng lên hàng đầu', 'https://ui-avatars.com/api/?name=Le+Minh+C&background=0ea5e9&color=fff&size=200')
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
