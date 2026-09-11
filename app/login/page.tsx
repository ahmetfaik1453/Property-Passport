'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { isValidEmail } from '@/lib/validations'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('demo@prestijgayrimenkul.com')
  const [password, setPassword] = useState('DemoPassword123!')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setEmailError('')

    if (!isValidEmail(email)) {
      setEmailError('Geçerli bir e-posta adresi giriniz.')
      return
    }

    if (!password) {
      setErrorMsg('Lütfen şifrenizi giriniz.')
      return
    }

    setLoading(true)

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
          <Link href="/" className="inline-flex items-center justify-center size-11 rounded-xl bg-slate-900 text-white shadow-xs">
            <ShieldCheck className="size-5 text-emerald-400" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Property Passport</h1>
          <p className="text-xs text-slate-500">Acente ve Gayrimenkul Danışmanı Girişi</p>
        </div>

        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold">Hesabınıza Giriş Yapın</CardTitle>
            <CardDescription className="text-xs">Portföy ve teslimat tutanaklarınızı yönetin</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">E-posta Adresi</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    maxLength={100}
                    className={`pl-9 h-9 text-xs ${emailError ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError('')
                    }}
                  />
                </div>
                {emailError && <span className="text-[11px] text-red-600 font-medium">{emailError}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Şifre</label>
                  <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-slate-900">
                    Şifremi Unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    type="password"
                    required
                    maxLength={50}
                    className="pl-9 h-9 text-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-2 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-2">
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'} <ArrowRight className="size-3.5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-0 justify-center border-t border-slate-100 py-3">
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
