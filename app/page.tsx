import Link from 'next/link'
import { 
  ShieldCheck, 
  FileCheck, 
  QrCode, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  Camera, 
  Layers, 
  Gauge, 
  KeyRound, 
  Lock,
  Search,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Property Passport',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'B2B Dijital Gayrimenkul Teslim & Kanıt Yönetim Platformu. Taşınmaz teslimatlarını ihtilafsız ve doğrulanabilir hale getirin.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
    featureList: [
      'Oda bazlı fotoğraf ve hasar kanıtı kaydı',
      'Sayaç ve anahtar teslim tutanağı',
      'Çift taraflı dijital onay mekanizması',
      'Korumalı QR kod doğrulama servisi',
      'B2B Resmi PDF tutanak çıktısı'
    ]
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 selection:bg-slate-900 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-slate-900 text-white p-2 rounded-lg shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Property Passport</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#ozellikler" className="hover:text-slate-900 transition-colors">Özellikler</a>
            <a href="#isleyis" className="hover:text-slate-900 transition-colors">Nasıl Çalışır?</a>
            <a href="#guvenlik" className="hover:text-slate-900 transition-colors">Gizlilik & KVKK</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-9 text-xs font-medium text-slate-700">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4">
                Acente Olarak Başla
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>B2B Profesyonel Gayrimenkul Teslim & Kanıt Altyapısı</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Taşınmaz Teslimatlarını <span className="underline decoration-slate-300 underline-offset-8">İhtilafsız ve Doğrulanabilir</span> Hale Getirin
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ev sahibi, kiracı ve emlak ofisi arasında teslim anındaki oda durumlarını, demirbaşları, sayaçları ve fotoğrafları yapılandırılmış dijital kanıt olarak arşivleyin.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="default" className="w-full sm:w-auto h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-2 shadow-sm">
                Acente Hesabını Başlat <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="default" variant="outline" className="w-full sm:w-auto h-11 px-6 text-xs font-semibold border-slate-300 hover:bg-slate-100 text-slate-800">
                Canlı Demo Yönetim Paneli
              </Button>
            </Link>
          </div>

          {/* Quick Metrics & Badges */}
          <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Standart</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">8 Aşamalı Denetim</span>
              <p className="text-xs text-slate-500 mt-0.5">Oda, demirbaş, sayaç, anahtar</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Güvenlik</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">SHA-256 İmzalı</span>
              <p className="text-xs text-slate-500 mt-0.5">Değiştirilemez dijital kayıt</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Gizlilik</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">Privacy-by-Design</span>
              <p className="text-xs text-slate-500 mt-0.5">Kamuya açık PII sızdırmaz</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Doğrulama</span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">Tek Tıkla QR Kod</span>
              <p className="text-xs text-slate-500 mt-0.5">Hızlı online geçerlilik testi</p>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="ozellikler" className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Emlak Ofisleri İçin Hukuki ve Operasyonel Güvence
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Klasik matbu tutanakların yarattığı belirsizlik, kayıp fotoğraflar ve depozito anlaşmazlıklarını ortadan kaldırın.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 shadow-xs bg-slate-50/50">
                <CardContent className="p-6">
                  <div className="size-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Oda Bazlı Fotoğraf & Hasar Kaydı</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Salon, mutfak, banyo ve yatak odalarında mevcut boya, zemin, armatür ve çizik durumlarını fotoğraflı olarak tutanağa bağlayın.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-xs bg-slate-50/50">
                <CardContent className="p-6">
                  <div className="size-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Sayaç & Anahtar Teslimi</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Elektrik, su, doğalgaz sayaç endekslerini ve teslim edilen çelik kapı, bina giriş anahtarlarını adetleriyle güvenceye alın.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-xs bg-slate-50/50">
                <CardContent className="p-6">
                  <div className="size-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Doğrulanabilir QR & PDF</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Her teslimat için üretilen PDF tutanak ve üzerindeki dinamik QR kod sayesinde belgenin özgünlüğü anında doğrulanabilir.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Property Passport &copy; 2026</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xl text-center sm:text-right">
            Hukuki Uyarı: Property Passport yapılandırılmış bir dijital durum tespit platformudur. Resmi nitelikli elektronik imza veya mahkeme bilirkişi raporu hükmünde olmayıp, taraflar arası ihtilafları önleyici güçlü yazılı kanıt niteliğindedir.
          </p>
        </div>
      </footer>
    </div>
  )
}
