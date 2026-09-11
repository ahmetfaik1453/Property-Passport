import Link from 'next/link'
import { ShieldCheck, Building2, Home, FileText, Settings, LogOut, CheckCircle2, UserCheck, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 text-white font-bold tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-md text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span>Property Passport</span>
        </div>

        {/* Agency Switcher / Info */}
        <div className="p-4 border-b border-slate-800">
          <div className="bg-slate-800/60 rounded-lg p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              PP
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Prestij Gayrimenkul</p>
              <p className="text-[11px] text-slate-400 truncate">Acente Yöneticisi</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-1 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white bg-slate-800 transition-colors"
          >
            <Home className="w-4 h-4 text-blue-400" />
            <span>Kontrol Paneli</span>
          </Link>
          <Link
            href="/properties"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Mülk Portföyü</span>
          </Link>
          <Link
            href="/handovers"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Teslim Tutanakları</span>
          </Link>
          <Link
            href="/contacts"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Ev Sahibi & Kiracılar</span>
          </Link>
        </nav>

        {/* User / Settings / Logout */}
        <div className="p-4 border-t border-slate-800 text-xs">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800 transition-colors mb-1"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Ayarlar</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Property Passport</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/properties/new">
              <Button size="sm" className="bg-blue-600 text-xs h-8 px-2.5">
                <Plus className="w-3.5 h-3.5 mr-1" /> Yeni Mülk
              </Button>
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
