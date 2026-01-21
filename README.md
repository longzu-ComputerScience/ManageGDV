# GDV Manager - Hệ thống Quản lý Giao dịch viên

Website quản lý thông tin Giao dịch viên (GDV) được xây dựng với Next.js 14, TailwindCSS và Supabase.

## 🎯 Tính năng

### Dành cho người dùng (không cần đăng nhập):
- ✅ Xem danh sách tất cả Giao dịch viên
- ✅ Tìm kiếm GDV theo tên, chi nhánh, số điện thoại
- ✅ Click vào từng GDV để xem thông tin chi tiết:
  - Họ tên
  - Số điện thoại (SĐT)
  - Email
  - Tài khoản mạng xã hội (Facebook, Zalo)
  - Địa chỉ/Chi nhánh làm việc
  - Ảnh đại diện
  - Mô tả/Ghi chú

### Dành cho Admin (cần đăng nhập):
- ✅ Đăng nhập với tài khoản admin
- ✅ Thêm mới Giao dịch viên
- ✅ Sửa thông tin Giao dịch viên
- ✅ Xóa Giao dịch viên
- ✅ Quản lý danh sách GDV

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Language**: TypeScript
- **Hosting**: Vercel (ready to deploy)

## 📋 Yêu cầu hệ thống

- Node.js 18.x hoặc cao hơn
- npm hoặc yarn
- Tài khoản Supabase (miễn phí)

## 🚀 Hướng dẫn Setup

### 1. Setup Supabase

#### 1.1. Tạo project Supabase
1. Truy cập [supabase.com](https://supabase.com)
2. Đăng ký/Đăng nhập tài khoản
3. Click "New Project"
4. Điền thông tin:
   - Project Name: `gdv-manager`
   - Database Password: Tạo mật khẩu mạnh (lưu lại để sau này dùng)
   - Region: Chọn gần nhất (ví dụ: Singapore)
5. Click "Create new project" và đợi vài phút

#### 1.2. Tạo Database Schema
1. Vào project vừa tạo
2. Click vào tab "SQL Editor" ở sidebar bên trái
3. Click "New query"
4. Copy và paste đoạn SQL sau:

```sql
-- Tạo bảng gdv
CREATE TABLE gdv (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ho_ten VARCHAR(255) NOT NULL,
  sdt VARCHAR(20),
  email VARCHAR(255),
  facebook VARCHAR(255),
  zalo VARCHAR(20),
  dia_chi TEXT,
  chi_nhanh VARCHAR(255),
  avatar_url TEXT,
  mo_ta TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo index để tìm kiếm nhanh hơn
CREATE INDEX idx_gdv_ho_ten ON gdv(ho_ten);
CREATE INDEX idx_gdv_chi_nhanh ON gdv(chi_nhanh);

-- Bật Row Level Security
ALTER TABLE gdv ENABLE ROW LEVEL SECURITY;

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

-- Thêm dữ liệu mẫu (tùy chọn)
INSERT INTO gdv (ho_ten, sdt, email, chi_nhanh, mo_ta) VALUES
  ('Nguyễn Văn A', '0901234567', 'nguyenvana@example.com', 'Chi nhánh Hà Nội', 'Giao dịch viên chuyên nghiệp với 5 năm kinh nghiệm'),
  ('Trần Thị B', '0912345678', 'tranthib@example.com', 'Chi nhánh TP.HCM', 'Tư vấn nhiệt tình, hỗ trợ khách hàng 24/7');
```

5. Click "Run" để thực thi SQL
6. Kiểm tra bảng đã được tạo bằng cách vào tab "Table Editor"

#### 1.3. Setup Authentication
1. Vào tab "Authentication" ở sidebar
2. Click "Policies" để kiểm tra RLS đã được bật
3. Về tab "Users" để tạo admin user

#### 1.4. Lấy API Keys
1. Vào tab "Project Settings" (icon bánh răng ở sidebar)
2. Click "API" trong menu bên trái
3. Tìm và copy 2 giá trị:
   - `Project URL` (dạng: `https://xxxxx.supabase.co`)
   - `anon/public key` (key dài)
4. Lưu lại để dùng ở bước tiếp theo

### 2. Setup Local Development

#### 2.1. Clone repository
```bash
git clone <repository-url>
cd ManageGDV
```

#### 2.2. Install dependencies
```bash
npm install
```

#### 2.3. Cấu hình Environment Variables
1. Copy file `.env.example` thành `.env.local`:
```bash
cp .env.example .env.local
```

2. Mở file `.env.local` và điền thông tin từ Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 2.4. Chạy development server
```bash
npm run dev
```

Website sẽ chạy tại: `http://localhost:3000`

### 3. Tạo tài khoản Admin đầu tiên

Có 2 cách để tạo admin user:

#### Cách 1: Qua Supabase Dashboard (Khuyến nghị)
1. Vào Supabase Dashboard > Authentication > Users
2. Click "Add user" > "Create new user"
3. Điền email và password
4. Click "Create user"
5. Dùng email/password này để đăng nhập vào `/admin/login`

#### Cách 2: Qua code (nếu cho phép public signup)
Bạn có thể tạm thời cho phép signup public và tạo user qua API, sau đó tắt lại.

### 4. Test Website

1. **Trang chủ** (`/`): Xem danh sách GDV
2. **Chi tiết GDV** (`/gdv/[id]`): Click vào 1 GDV để xem chi tiết
3. **Admin Login** (`/admin/login`): Đăng nhập với tài khoản admin
4. **Admin Dashboard** (`/admin`): Quản lý danh sách GDV
5. **Thêm GDV** (`/admin/add`): Thêm GDV mới
6. **Sửa GDV** (`/admin/edit/[id]`): Sửa thông tin GDV

## 🚢 Deploy lên Vercel

### 1. Push code lên GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy với Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập với GitHub
3. Click "New Project"
4. Import repository `ManageGDV`
5. Configure Project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

### 3. Custom Domain (tùy chọn)
1. Vào project settings trong Vercel
2. Tab "Domains"
3. Add domain của bạn và follow hướng dẫn

## 🔧 Cấu hình Cloudflare (Optional)

Nếu bạn muốn dùng Cloudflare CDN:

1. Add domain vào Cloudflare
2. Update DNS records theo hướng dẫn của Cloudflare
3. Bật Cloudflare Proxy (orange cloud icon)
4. Recommended settings:
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - Auto Minify: Enable CSS, JS, HTML
   - Brotli: On

## 📁 Cấu trúc Project

```
ManageGDV/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage - danh sách GDV
│   ├── globals.css          # Global styles
│   ├── gdv/
│   │   └── [id]/
│   │       └── page.tsx     # Chi tiết GDV
│   └── admin/
│       ├── page.tsx         # Admin dashboard
│       ├── login/
│       │   └── page.tsx     # Admin login
│       ├── add/
│       │   └── page.tsx     # Thêm GDV
│       └── edit/
│           └── [id]/
│               └── page.tsx # Sửa GDV
├── components/              # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── GDVCard.tsx
│   ├── GDVDetail.tsx
│   ├── GDVForm.tsx
│   └── AdminSidebar.tsx
├── lib/                     # Utilities
│   ├── supabase.ts         # Supabase client
│   └── types.ts            # TypeScript types
├── public/                  # Static files
├── .env.example            # Environment template
├── .env.local              # Local environment (not committed)
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🔐 Bảo mật

- ✅ Row Level Security (RLS) được bật trên Supabase
- ✅ Public read, authenticated write
- ✅ Admin routes được protect với auth check
- ✅ Input validation trên form
- ✅ Environment variables cho sensitive data
- ✅ HTTPS required khi deploy

## 🎨 Customization

### Đổi màu sắc
Edit file `tailwind.config.js`:
```js
colors: {
  primary: {
    // Thay đổi các giá trị này
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
}
```

### Thêm field mới cho GDV
1. Update SQL schema trong Supabase
2. Update type trong `lib/types.ts`
3. Update form trong `components/GDVForm.tsx`
4. Update display trong `components/GDVDetail.tsx`

## 🐛 Troubleshooting

### Lỗi: "Supabase client not initialized"
- Kiểm tra file `.env.local` có đúng format
- Restart dev server sau khi thay đổi env

### Lỗi: "Failed to fetch"
- Kiểm tra Supabase URL có đúng
- Kiểm tra RLS policies đã được tạo

### Không đăng nhập được
- Kiểm tra email/password đúng
- Kiểm tra user đã được tạo trong Supabase
- Kiểm tra Supabase Auth settings

### Image không hiển thị
- Kiểm tra URL ảnh có hợp lệ
- Update `next.config.js` nếu dùng domain khác

## 📞 Hỗ trợ

Nếu gặp vấn đề, có thể:
- Check Supabase logs: Dashboard > Logs
- Check browser console cho client errors
- Check Vercel logs cho server errors

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 🎉 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
