'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { ShieldCheck, ArrowRight, Building2, User, Mail, Phone, Lock, AlertCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail, isValidName } from '@/lib/validations'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [generalError, setGeneralError] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!isValidName(fullName)) {
      newErrors.fullName = 'Ad Soyad en az 2, en fazla 60 karakter olmalıdır.'
    }

    if (!agencyName.trim() || agencyName.trim().length < 3) {
      newErrors.agencyName = 'Acente adı en az 3 karakter olmalıdır.'
    }

    if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (Örn: 0532 123 45 67).'
    }

    if (!isValidEmail(email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi yazınız.'
    }

    if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=/dashboard` : undefined,
          data: {
            full_name: fullName,
            agency_name: agencyName,
            phone: phone,
          },
        },
      })

      if (error) {
        if (error.code === 'user_already_exists' || error.message.includes('already registered')) {
          setGeneralError('Bu e-posta adresi ile kayıtlı bir hesap zaten var. Lütfen giriş yapınız veya şifrenizi sıfırlayınız.')
        } else if (error.code === 'over_email_send_rate_limit' || error.message.includes('rate limit') || error.message.includes('security purposes')) {
          setGeneralError('E-posta güvenlik sınırı: Kısa süre içinde çok sayıda kayıt veya onay e-postası talep edildi. Hesabınız oluşturulduysa lütfen gelen kutunuzu kontrol edin veya birkaç dakika bekleyip tekrar deneyin.')
        } else if (error.message.includes('invalid')) {
          setGeneralError('Lütfen geçerli bir kurumsal e-posta adresi giriniz (Örn: Gmail, Outlook veya şirket alan adınız).')
        } else {
          setGeneralError(error.message || 'Kayıt işlemi gerçekleştirilemedi.')
        }
        return
      }

      // If user session exists (auto-confirm enabled), redirect to dashboard
      if (data?.session) {
        router.push('/dashboard')
        router.refresh()
      } else if (data?.user) {
        // Confirmation email sent
        router.push('/login?registered=check-email')
      } else {
        setGeneralError('Hesap oluşturulamadı. Lütfen tekrar deneyiniz.')
      }
    } catch (err: any) {
      console.error('Registration error:', err)
      setGeneralError('Kayıt esnasında beklenmeyen bir hata oluştu: ' + (err?.message || 'Lütfen tekrar deneyiniz.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center">
            <Logo className="h-14 sm:h-16 w-auto" height={64} width={280} priority />
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 pt-1">Acente Hesabı Oluşturun</h1>
          <p className="text-xs text-slate-500">Property Passport ile gayrimenkul teslimatlarını güvenceye alın</p>
        </div>

        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold">Ofis ve Yetkili Bilgileri</CardTitle>
            <CardDescription className="text-xs">Teslim tutanaklarında yer alacak kurumsal profilinizi tanımlayın</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
              {generalError && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">Yetkili Adı Soyadı *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    required
                    maxLength={60}
                    className={`pl-9 h-9 text-xs ${errors.fullName ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                    placeholder="Ahmet Faik Özsoy"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }))
                    }}
                  />
                </div>
                {errors.fullName && <span className="text-[11px] text-red-600 font-medium">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">Emlak Ofisi / Acente Adı *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    required
                    maxLength={80}
                    className={`pl-9 h-9 text-xs ${errors.agencyName ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                    placeholder="Prestij Gayrimenkul"
                    value={agencyName}
                    onChange={(e) => {
                      setAgencyName(e.target.value)
                      if (errors.agencyName) setErrors((prev) => ({ ...prev, agencyName: '' }))
                    }}
                  />
                </div>
                {errors.agencyName && <span className="text-[11px] text-red-600 font-medium">{errors.agencyName}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Telefon *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 size-4 text-slate-400" />
                    <Input
                      required
                      type="tel"
                      maxLength={14}
                      className={`pl-9 h-9 text-xs font-mono ${errors.phone ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                      placeholder="0532 000 00 00"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {errors.phone ? (
                    <span className="text-[11px] text-red-600 font-medium">{errors.phone}</span>
                  ) : (
                    <span className="text-[10px] text-slate-400">05XX XXX XX XX</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">E-posta Adresi *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 size-4 text-slate-400" />
                    <Input
                      required
                      type="email"
                      maxLength={100}
                      className={`pl-9 h-9 text-xs ${errors.email ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                      placeholder="ofis@prestij.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                      }}
                    />
                  </div>
                  {errors.email && <span className="text-[11px] text-red-600 font-medium">{errors.email}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">Şifre Belirleyin *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    required
                    type="password"
                    maxLength={50}
                    className={`pl-9 h-9 text-xs ${errors.password ? 'border-red-500 focus-visible:ring-red-200' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
                    }}
                  />
                </div>
                {errors.password && <span className="text-[11px] text-red-600 font-medium">{errors.password}</span>}
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-2 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-2">
                {loading ? 'Hesap Açılıyor...' : 'Acente Olarak Kaydol'} <ArrowRight className="size-3.5" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-0 justify-center border-t border-slate-100 py-3">
            <p className="text-xs text-slate-500">
              Zaten hesabınız var mı?{' '}
              <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                Giriş Yapın
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
