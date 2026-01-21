export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white mt-auto border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">GDV Manager</span>
          </div>
          
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} GDV Manager. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
