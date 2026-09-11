'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { createClient } from '@/utils/supabase/client'
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
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function checkUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error(e)
    }
    setUser(null)
    router.push('/login')
    router.refresh()
  }

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

        {/* User / Agency Switcher / Info */}
        <div className="p-4 border-b border-[#ebebeb]">
          {user ? (() => {
            const meta = user.user_metadata || {}
            const displayName = meta.full_name || user.email?.split('@')[0] || 'Kullanıcı'
            const role = meta.role === 'LANDLORD' ? 'Mülk Sahibi' : meta.role === 'TENANT' ? 'Kiracı' : 'Acente Yöneticisi'
            const subTitle = meta.role === 'AGENT' && meta.agency_name ? meta.agency_name : user.email
            const initials = displayName
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2) || 'PP'

            return (
              <div className="bg-[#f7f7f7] rounded-xl p-3 flex items-center gap-3 border border-[#ebebeb]">
                <div className="size-9 rounded-lg bg-[#ff385c]/10 text-[#ff385c] flex items-center justify-center font-bold text-xs shrink-0">
                  {initials}
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-xs font-semibold text-[#222222] truncate" title={displayName}>
                    {displayName}
                  </p>
                  <p className="text-[10px] text-[#ff385c] font-medium truncate">
                    {role}
                  </p>
                  <p className="text-[10px] text-[#6a6a6a] truncate" title={subTitle}>
                    {subTitle}
                  </p>
                </div>
              </div>
            )
          })() : (
            <div className="bg-[#fff8f6] rounded-xl p-3 border border-[#ffd1da]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="size-2 rounded-full bg-[#ff385c] animate-pulse" />
                <span className="text-[11px] font-bold text-[#c13515] uppercase tracking-wider">Örnek Demo Modu</span>
              </div>
              <p className="text-[11px] text-[#717171] leading-tight">
                Sistem özelliklerini keşfediyorsunuz. Kendi portföyünüz için giriş yapın.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <Link href="/login" className="flex-1">
                  <button className="w-full h-7 text-[11px] font-semibold bg-[#222222] hover:bg-black text-white rounded-md transition-colors">
                    Giriş Yap
                  </button>
                </Link>
                <Link href="/register" className="flex-1">
                  <button className="w-full h-7 text-[11px] font-semibold border border-[#dddddd] hover:bg-white text-[#222222] rounded-md transition-colors">
                    Kayıt Ol
                  </button>
                </Link>
              </div>
            </div>
          )}
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
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-[#6a6a6a] hover:text-[#c13515] hover:bg-[#ffd1da]/30 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-[#c13515]" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-[#ebebeb] px-4 flex items-center justify-between sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center">
            <Logo className="h-9 w-auto" height={36} width={160} />
          </Link>
          <div className="flex items-center gap-1.5">
            <Link href="/settings">
              <button 
                title="Ayarlar"
                className={`p-1.5 rounded-lg border border-[#ebebeb] text-[#717171] hover:text-[#222222] hover:bg-[#f7f7f7] ${pathname === '/settings' ? 'bg-[#f7f7f7] text-[#222222]' : ''}`}
              >
                <Settings className="size-4" />
              </button>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              title="Çıkış Yap"
              className="p-1.5 rounded-lg border border-[#ebebeb] text-[#717171] hover:text-[#c13515] hover:bg-[#ffd1da]/30"
            >
              <LogOut className="size-4" />
            </button>
            <Link href="/properties/new">
              <button className="bg-[#ff385c] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 ml-1">
                <Plus className="w-3.5 h-3.5" /> Mülk
              </button>
            </Link>
          </div>
        </header>

        {/* Content View: max-w-7xl centered with balanced Airbnb padding */}
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-10 pb-20 md:pb-10">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (App Experience) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#ebebeb] flex items-center justify-around z-50 px-2 shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-[#ff385c] font-bold' : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                <Icon className={`size-5 mb-0.5 ${isActive ? 'text-[#ff385c]' : 'text-[#717171]'}`} />
                <span className="truncate max-w-[72px] text-center">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
