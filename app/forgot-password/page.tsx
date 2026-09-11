'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { ShieldCheck, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { isValidEmail } from '@/lib/validations'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setErrorMsg('')

    if (!isValidEmail(email)) {
      setEmailError('Lütfen geçerli bir e-posta adresi giriniz.')
      return
    }

    setLoading(true)

    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=/settings` : undefined
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) {
        if (error.code === 'over_email_send_rate_limit' || error.message.includes('rate limit')) {
          setErrorMsg('E-posta güvenlik sınırı: Çok sık sıfırlama bağlantısı talep edildi. Lütfen birkaç dakika bekleyiniz.')
        } else {
          setErrorMsg(error.message || 'Sıfırlama bağlantısı gönderilemedi.')
        }
        return
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMsg('Bir hata oluştu: ' + (err?.message || 'Lütfen tekrar deneyiniz.'))
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900 pt-1">Şifre Sıfırlama</h1>
          <p className="text-xs text-slate-500">Kayıtlı e-posta adresinize sıfırlama bağlantısı gönderilecektir</p>
        </div>

        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-sm font-semibold">Şifrenizi mi Unuttunuz?</CardTitle>
            <CardDescription className="text-xs">Hesabınıza ait e-posta adresini girin</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {submitted ? (
              <div className="flex flex-col items-center text-center p-4 gap-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="size-8 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-950">Bağlantı Gönderildi</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <span className="font-semibold">{email}</span> adresine şifre yenileme bağlantısı gönderildi. Lütfen gelen kutunuzu kontrol edin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
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
                      placeholder="ofis@ornek.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError('')
                      }}
                    />
                  </div>
                  {emailError && <span className="text-[11px] text-red-600 font-medium">{emailError}</span>}
                </div>

                <Button type="submit" disabled={loading} className="w-full mt-2 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-2">
                  {loading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'} <ArrowRight className="size-3.5" />
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="pt-0 justify-center border-t border-slate-100 py-3">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium">
              <ArrowLeft className="size-3" /> Giriş Sayfasına Dön
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
