import Link from 'next/link'

const rules = [
  'Kiểm tra kỹ thông tin GDV trước khi giao dịch.',
  'Chỉ giao dịch với các GDV có trong danh sách này.',
  'Không chia sẻ thông tin cá nhân, mật khẩu cho bất kỳ ai.',
  'Lưu giữ biên lai, hóa đơn giao dịch để đối chiếu khi cần.',
  'Liên hệ Admin ngay nếu phát hiện bất thường.',
]

export default function NoiQuyGiaoDichPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/30 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Nội quy giao dịch</h1>
        <p className="text-slate-600 mt-2">Vui lòng đọc kỹ để đảm bảo giao dịch an toàn và minh bạch.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="space-y-4 text-slate-700">
          {rules.map((rule, index) => (
            <div
              key={rule}
              className="flex gap-4 items-start p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
            >
              <span className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                {index + 1}
              </span>
              <p className="pt-0.5">{rule}</p>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 font-medium text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Cảnh báo: Chúng tôi không chịu trách nhiệm với các giao dịch ngoài danh sách GDV chính thức.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 transition-all duration-300"
        >
          Xem danh sách GDV
        </Link>
        <Link
          href="/nap-game"
          className="px-6 py-3 rounded-2xl bg-white/80 border border-slate-200 text-slate-700 font-semibold shadow-md hover:bg-white transition-all duration-300"
        >
          Nạp Game
        </Link>
      </div>
    </div>
  )
}
