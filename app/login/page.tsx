'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { isValidEmail } from '@/lib/validations'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const registeredNotice = searchParams.get('registered') === 'check-email'
  const isAuthFailed = searchParams.get('error') === 'auth-verification-failed'
  const isVerified = searchParams.get('verified') === 'true'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isNotConfirmed, setIsNotConfirmed] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleResendConfirmation = async () => {
    if (!email || !isValidEmail(email)) {
      setEmailError('Onay linki göndermek için lütfen geçerli e-posta adresinizi giriniz.')
      return
    }

    setResending(true)
    setErrorMsg('')
    setResendSuccess(false)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=/dashboard` : undefined,
        },
      })

      if (error) {
        if (error.code === 'over_email_send_rate_limit' || error.message.includes('rate limit')) {
          setErrorMsg('E-posta güvenlik sınırı: Çok sık onay e-postası talep edildi. Lütfen birkaç dakika bekledikten sonra tekrar deneyiniz veya gelen kutunuzun Spam / İstenmeyen klasörünü kontrol ediniz.')
        } else {
          setErrorMsg(error.message || 'Onay e-postası gönderilemedi.')
        }
      } else {
        setResendSuccess(true)
      }
    } catch (err: any) {
      setErrorMsg('E-posta gönderilirken bir hata oluştu: ' + (err?.message || 'Lütfen tekrar deneyiniz.'))
    } finally {
      setResending(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setEmailError('')
    setIsNotConfirmed(false)
    setResendSuccess(false)

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
        if (error.code === 'email_not_confirmed') {
          setIsNotConfirmed(true)
          setErrorMsg('E-posta adresiniz henüz onaylanmamış. Hesabınızı kullanabilmek için gelen kutunuza gönderilen aktivasyon bağlantısını tıklamalısınız.')
        } else if (error.message.toLowerCase().includes('invalid login credentials') || error.code === 'invalid_credentials') {
          setErrorMsg('E-posta adresi veya şifre hatalı. Lütfen bilgilerinizi kontrol ediniz.')
        } else if (error.code === 'over_email_send_rate_limit' || error.message.includes('rate limit')) {
          setErrorMsg('Güvenlik nedeniyle çok fazla deneme yapıldı. Lütfen birkaç dakika bekleyip tekrar deneyiniz.')
        } else {
          setErrorMsg(error.message || 'Giriş yapılamadı. Lütfen tekrar deneyiniz.')
        }
        return
      }

      if (data?.session) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setErrorMsg('Oturum açılamadı. Lütfen bilgilerinizi kontrol ediniz.')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setErrorMsg('Giriş yapılırken bir hata oluştu: ' + (err?.message || 'Lütfen tekrar deneyiniz.'))
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
          <p className="text-xs text-slate-500 pt-1">Acente ve Gayrimenkul Danışmanı Girişi</p>
        </div>

        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold">Hesabınıza Giriş Yapın</CardTitle>
            <CardDescription className="text-xs">Portföy ve teslimat tutanaklarınızı yönetin</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              {isVerified && (
                <div className="p-3.5 text-xs bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-emerald-950">E-posta Adresiniz Doğrulandı!</p>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Hesabınız başarıyla aktive edildi. Şimdi şifrenizle giriş yapabilirsiniz.
                    </p>
                  </div>
                </div>
              )}

              {registeredNotice && (
                <div className="p-3.5 text-xs bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-emerald-950">Kayıt Başarılı! E-posta Doğrulaması Gerekiyor</p>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      Lütfen e-posta adresinizin gelen kutusunu (ve Spam / İstenmeyen klasörünü) kontrol ederek aktivasyon linkine tıklayınız.
                    </p>
                  </div>
                </div>
              )}

              {isAuthFailed && (
                <div className="p-3.5 text-xs bg-amber-50 text-amber-900 rounded-xl border border-amber-200 flex items-start gap-2.5">
                  <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-950">Aktivasyon Bağlantısı Geçersiz veya Süresi Dolmuş</p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Aşağıdaki alandan e-posta adresinizi girerek yeni bir onay e-postası talep edebilirsiniz.
                    </p>
                  </div>
                </div>
              )}

              {resendSuccess && (
                <div className="p-3 text-xs bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>Yeni aktivasyon bağlantısı e-posta adresinize iletildi. Lütfen gelen kutunuzu kontrol ediniz.</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 text-xs bg-red-50 text-red-800 rounded-xl border border-red-200 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
                    <span className="leading-relaxed">{errorMsg}</span>
                  </div>
                  {isNotConfirmed && (
                    <div className="pt-1.5 border-t border-red-100 flex items-center justify-between">
                      <span className="text-[11px] text-red-700">Aktivasyon e-postasını almadınız mı?</span>
                      <button
                        type="button"
                        onClick={handleResendConfirmation}
                        disabled={resending}
                        className="text-[11px] font-bold text-red-900 underline hover:text-red-700 disabled:opacity-50"
                      >
                        {resending ? 'Gönderiliyor...' : 'Tekrar Gönder'}
                      </button>
                    </div>
                  )}
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
                    placeholder="ornek@emlakofisi.com"
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
                    placeholder="••••••••"
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">Yükleniyor...</div>}>
      <LoginForm />
    </Suspense>
  )
}
