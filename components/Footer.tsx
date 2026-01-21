export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">GDV Manager</h3>
            <p className="text-gray-400 text-sm">
              Hệ thống quản lý thông tin giao dịch viên chuyên nghiệp
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <p className="text-gray-400 text-sm">Email: contact@gdvmanager.com</p>
            <p className="text-gray-400 text-sm">Hotline: 1900-xxxx</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Về chúng tôi</h3>
            <p className="text-gray-400 text-sm">
              Website được phát triển với Next.js 14 và Supabase
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GDV Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
