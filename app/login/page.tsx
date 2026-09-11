'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('demo@prestijgayrimenkul.com')
  const [password, setPassword] = useState('********')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo giriş simülasyonu
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Property Passport</h1>
          <p className="text-xs text-slate-500">Acente ve Danışman Giriş Portalı</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Hesabınıza Giriş Yapın</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">E-posta Adresi</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Şifre</label>
                  <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                    Şifremi Unuttum
                  </Link>
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                Giriş Yap <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-slate-500">
          Henüz acente hesabınız yok mu?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Kayıt Olun
          </Link>
        </div>
      </div>
    </div>
  )
}
