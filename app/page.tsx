import Link from 'next/link'
import { ShieldCheck, FileCheck, QrCode, ArrowRight, Building2, CheckCircle2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Property Passport</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Acente Olarak Başla</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>B2B Dijital Gayrimenkul Teslim & Kanıt Yönetim Platformu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Taşınmaz Teslimatlarını <span className="text-blue-600">İhtilafsız ve Doğrulanabilir</span> Hale Getirin
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Ev sahibi, kiracı ve emlak ofisi arasında teslim anındaki oda durumlarını, demirbaşları, sayaçları ve fotoğrafları yapılandırılmış dijital kanıt olarak arşivleyin.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 gap-2">
                Hemen Ücretsiz Başlayın <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Canlı Demo Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-1">Oda & Demirbaş İnceleme</h3>
                <p className="text-sm text-slate-500">
                  Her odayı duvar, zemin, pencere ve mobilya bazında hasar durumlarıyla fotoğraflayarak eşleştirin.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-1">Çift Taraflı Dijital Onay</h3>
                <p className="text-sm text-slate-500">
                  Kiracı ve mülk sahibinin teslim tutanağını sistem üzerinden inceleyip onaylamasını sağlayın.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-base mb-1">Korumalı QR Doğrulama</h3>
                <p className="text-sm text-slate-500">
                  PDF tutanağı üzerindeki güvenli QR kod ile kişisel verileri sızdırmadan orijinalliği doğrulayın.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>Property Passport &copy; 2026</span>
          </div>
          <p className="text-xs text-slate-400">
            Yasal Uyarı: Bu platform bir dijital kanıt kayıt sistemidir; resmi nitelikli elektronik sertifika ve bilirkişi kararı yerine geçmez.
          </p>
        </div>
      </footer>
    </div>
  )
}
