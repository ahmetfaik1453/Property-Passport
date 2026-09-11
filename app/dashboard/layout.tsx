'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ShieldCheck, 
  Building2, 
  Home, 
  FileText, 
  Settings, 
  LogOut, 
  UserCheck, 
  Plus 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Kontrol Paneli', icon: Home },
    { href: '/properties', label: 'Mülk Portföyü', icon: Building2 },
    { href: '/handovers', label: 'Teslim Tutanakları', icon: FileText },
    { href: '/contacts', label: 'Ev Sahibi & Kiracılar', icon: UserCheck },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 selection:bg-slate-900 selection:text-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 select-none">
        <Link href="/" className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 text-white font-bold tracking-tight">
          <div className="bg-slate-800 p-1.5 rounded-md text-emerald-400 border border-slate-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-sm">Property Passport</span>
        </Link>

        {/* Agency Switcher / Info */}
        <div className="p-4 border-b border-slate-800">
          <div className="bg-slate-800/70 rounded-xl p-3 flex items-center gap-3 border border-slate-700/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              PG
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Prestij Gayrimenkul</p>
              <p className="text-[10px] text-slate-400 truncate">Acente Yöneticisi</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 text-xs font-medium">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User / Settings / Logout */}
        <div className="p-3 border-t border-slate-800 text-xs space-y-1">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/settings' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Ayarlar</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
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
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <ShieldCheck className="w-5 h-5 text-slate-900" />
            <span>Property Passport</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/properties/new">
              <Button size="sm" className="bg-slate-900 text-white text-xs h-8 px-2.5">
                <Plus className="w-3.5 h-3.5 mr-1" /> Mülk
              </Button>
            </Link>
          </div>
        </header>

        {/* Content View: max-w-7xl centered with balanced responsive padding */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
