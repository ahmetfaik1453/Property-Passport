'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
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
    <div className="min-h-screen flex flex-col md:flex-row bg-white selection:bg-[#ff385c] selection:text-white font-sans text-[#222222]">
      {/* Sidebar (Desktop) — Airbnb clean white & hairline style */}
      <aside className="hidden md:flex flex-col w-64 bg-white text-[#222222] border-r border-[#ebebeb] shrink-0 select-none">
        <Link href="/" className="h-20 flex items-center px-6 border-b border-[#ebebeb]">
          <Logo className="h-11 w-auto" height={44} width={200} priority />
        </Link>

        {/* Agency Switcher / Info */}
        <div className="p-4 border-b border-[#ebebeb]">
          <div className="bg-[#f7f7f7] rounded-xl p-3 flex items-center gap-3 border border-[#ebebeb]">
            <div className="size-8 rounded-lg bg-[#ff385c]/10 text-[#ff385c] flex items-center justify-center font-bold text-xs">
              PG
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-[#222222] truncate">Prestij Gayrimenkul</p>
              <p className="text-[10px] text-[#6a6a6a] truncate">Acente Yöneticisi</p>
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#f7f7f7] text-[#222222] font-bold border-l-2 border-[#ff385c]'
                    : 'text-[#6a6a6a] hover:text-[#222222] hover:bg-[#f7f7f7]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff385c]' : 'text-[#6a6a6a]'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User / Settings / Logout */}
        <div className="p-3 border-t border-[#ebebeb] text-xs space-y-1">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3.5 py-2 rounded-lg transition-colors ${
              pathname === '/settings' ? 'bg-[#f7f7f7] text-[#222222] font-semibold' : 'text-[#6a6a6a] hover:text-[#222222] hover:bg-[#f7f7f7]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#6a6a6a]" />
            <span>Ayarlar</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-[#6a6a6a] hover:text-[#c13515] hover:bg-[#ffd1da]/30 transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#c13515]" />
            <span>Çıkış Yap</span>
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-[#ebebeb] px-4 flex items-center justify-between sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center">
            <Logo className="h-9 w-auto" height={36} width={160} />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/properties/new">
              <button className="bg-[#ff385c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Mülk
              </button>
            </Link>
          </div>
        </header>

        {/* Content View: max-w-7xl centered with balanced Airbnb padding */}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
