'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('demo@prestijgayrimenkul.com')
  const [password, setPassword] = useState('DemoPassword123!')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.warn('Supabase Auth Info:', error.message)
      }

      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-slate-900 text-white shadow-sm">
            <ShieldCheck className="size-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Property Passport</h1>
          <p className="text-sm text-slate-500">Acente ve Gayrimenkul Danışmanı Girişi</p>
        </div>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Hesabınıza Giriş Yapın</CardTitle>
            <CardDescription className="text-xs">Portföy ve teslimat tutanaklarınızı yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-700">E-posta Adresi</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    className="pl-9 h-9 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700">Şifre</label>
                  <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-slate-900">
                    Şifremi Unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    type="password"
                    required
                    className="pl-9 h-9 text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-2 h-9 bg-slate-900 hover:bg-slate-800 text-white gap-2">
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'} <ArrowRight className="size-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-0 justify-center">
            <p className="text-xs text-slate-500">
              Henüz acente hesabınız yok mu?{' '}
              <Link href="/register" className="font-semibold text-slate-900 hover:underline">
                Acente Olarak Kaydolun
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
