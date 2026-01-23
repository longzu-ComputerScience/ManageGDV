'use client'

import { useMemo, useState } from 'react'

type PriceItem = {
  package: string
  price: string
}

type GamePrice = {
  id: 'liem-quan' | 'free-fire'
  name: string
  description: string
  image: string
  prices: PriceItem[]
}

export default function NapGamePage() {
  const games = useMemo<GamePrice[]>(() => [
    {
      id: 'liem-quan',
      name: 'Liên Quân',
      description: 'Chọn gói nạp Liên Quân phù hợp với nhu cầu của bạn.',
      image: '/Liên%20Quân.png',
      prices: [
        { package: 'Gói 100', price: '20.000đ' },
        { package: 'Gói 310', price: '59.000đ' },
        { package: 'Gói 520', price: '99.000đ' },
        { package: 'Gói 1.060', price: '199.000đ' },
        { package: 'Gói 2.180', price: '399.000đ' },
      ],
    },
    {
      id: 'free-fire',
      name: 'Free Fire',
      description: 'Chọn gói nạp Free Fire phù hợp với nhu cầu của bạn.',
      image: '/Free%20Fire.jpg',
      prices: [
        { package: 'Gói 100', price: '20.000đ' },
        { package: 'Gói 310', price: '59.000đ' },
        { package: 'Gói 520', price: '99.000đ' },
        { package: 'Gói 1.060', price: '199.000đ' },
        { package: 'Gói 2.180', price: '399.000đ' },
      ],
    },
  ], [])

  const [selectedGameId, setSelectedGameId] = useState<GamePrice['id'] | null>(null)
  const selectedGame = games.find(game => game.id === selectedGameId) || null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/30 mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3-1.343-3-3S10.343 2 12 2s3 1.343 3 3-1.343 3-3 3zm0 3c-2.761 0-5 2.239-5 5v3h10v-3c0-2.761-2.239-5-5-5zm8 0c-.668 0-1.306.119-1.896.336A6.968 6.968 0 0120 16v3h2v-3c0-2.761-2.239-5-5-5zm-16 0c-2.761 0-5 2.239-5 5v3h2v-3c0-2.761 2.239-5 5-5.668 0-1.306.119-1.896.336A6.968 6.968 0 004 16v3H2v-3c0-2.761 2.239-5 5-5z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Nạp Game</h1>
        <p className="text-slate-600 mt-2">Chọn game để xem bảng giá chi tiết.</p>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {games.map((game) => {
            const isActive = selectedGameId === game.id

            return (
              <button
                key={game.id}
                type="button"
                onClick={() => setSelectedGameId(game.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'border-emerald-300 bg-gradient-to-r from-emerald-100 to-teal-100 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-200 bg-white/70 hover:border-emerald-200 hover:bg-emerald-50/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden border ${isActive ? 'border-emerald-300 ring-2 ring-emerald-200' : 'border-slate-200'}`}>
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{game.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{game.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        {selectedGame ? (
          <div className="glass-card rounded-3xl p-6 sm:p-8 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Bảng giá {selectedGame.name}</h2>
                <p className="text-sm text-slate-600 mt-1">Bảng giá có thể thay đổi theo thời điểm.</p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                Đang chọn: {selectedGame.name}
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Gói nạp</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white/80">
                  {selectedGame.prices.map((item) => (
                    <tr key={`${selectedGame.id}-${item.package}`}>
                      <td className="px-4 py-3 text-sm text-slate-700">{item.package}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-sm">
            Vui lòng chọn game để xem bảng giá.
          </div>
        )}
      </div>
    </div>
  )
}
