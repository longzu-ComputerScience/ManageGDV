'use client'

import GDVCard from '@/components/GDVCard'
import { GDV } from '@/lib/types'

export default function DemoPage() {
  const mockGDVs: GDV[] = [
    {
      id: '1',
      ho_ten: 'Nguyễn Văn A',
      sdt: '0901234567',
      email: 'nguyenvana@example.com',
      chi_nhanh: 'Chi nhánh Hà Nội',
      mo_ta: 'Giao dịch viên chuyên nghiệp với 5 năm kinh nghiệm trong lĩnh vực bất động sản. Tư vấn nhiệt tình, tận tâm với khách hàng.',
    },
    {
      id: '2',
      ho_ten: 'Trần Thị B',
      sdt: '0912345678',
      email: 'tranthib@example.com',
      chi_nhanh: 'Chi nhánh TP.HCM',
      mo_ta: 'Tư vấn nhiệt tình, hỗ trợ khách hàng 24/7. Chuyên về các dự án bất động sản cao cấp.',
    },
    {
      id: '3',
      ho_ten: 'Lê Văn C',
      sdt: '0923456789',
      email: 'levanc@example.com',
      chi_nhanh: 'Chi nhánh Đà Nẵng',
      mo_ta: 'Chuyên viên tư vấn giàu kinh nghiệm, am hiểu thị trường miền Trung.',
    },
    {
      id: '4',
      ho_ten: 'Phạm Thị D',
      sdt: '0934567890',
      email: 'phamthid@example.com',
      chi_nhanh: 'Chi nhánh Cần Thơ',
      mo_ta: 'Chuyên gia tư vấn bất động sản với hơn 10 năm kinh nghiệm. Đã hỗ trợ hàng trăm khách hàng tìm được nhà mơ ước. Luôn đặt lợi ích khách hàng lên hàng đầu.',
    },
    {
      id: '5',
      ho_ten: 'Hoàng Văn E',
      sdt: '0945678901',
      email: 'hoangvane@example.com',
      mo_ta: 'Giao dịch viên mới, nhiệt huyết và năng động.',
    },
    {
      id: '6',
      ho_ten: 'Vũ Thị F',
      sdt: '0956789012',
      email: 'vuthif@example.com',
      chi_nhanh: 'Chi nhánh Hải Phòng',
      mo_ta: 'Chuyên về tư vấn căn hộ cao cấp và biệt thự.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GDV Card - New Design Demo
          </h1>
          <p className="text-lg text-gray-600">
            Updated UI with horizontal layout, icons, and improved spacing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGDVs.map((gdv) => (
            <GDVCard key={gdv.id} gdv={gdv} />
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Improvements</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Layout Changes:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Horizontal layout (avatar + info side-by-side)</li>
                <li>More compact and information-dense</li>
                <li>Better use of space</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Visual Improvements:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Circular 64px avatar with gradient</li>
                <li>SVG icons for branch and phone</li>
                <li>Subtle borders with hover effects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Typography:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Proper text truncation</li>
                <li>2-line description limit</li>
                <li>Better visual hierarchy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactions:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Smooth hover transitions</li>
                <li>Shadow elevation on hover</li>
                <li>Border color change on hover</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
