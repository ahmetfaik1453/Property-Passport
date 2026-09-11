import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { 
  ShieldCheck, 
  Search, 
  Building2, 
  CheckCircle2, 
  Camera, 
  Gauge, 
  KeyRound, 
  QrCode, 
  ArrowRight,
  ChevronRight,
  Star,
  MapPin,
  FileCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Property Passport',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Gayrimenkul Teslim & Kanıt Yönetim Platformu. Taşınmaz devir teslim süreçlerini fotoğraflar, sayaç kayıtları ve doğrulanabilir QR kod ile güvenceye alın.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
    },
  }

  const featuredProperties = [
    {
      id: 'prop-1',
      title: 'Nidapark Küçükyalı A Blok',
      type: '2+1 Daire &bull; 95 m²',
      district: 'Maltepe, İstanbul',
      status: 'Teslime Hazır',
      rating: '4.95',
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prop-2',
      title: 'Vadi İstanbul Park 2. Kısım',
      type: '3+1 Rezidans &bull; 145 m²',
      district: 'Sarıyer, İstanbul',
      status: 'Tahliye Tesliminde',
      rating: '4.88',
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prop-3',
      title: 'Batışehir Premium Rezidans',
      type: '1+1 Daire &bull; 68 m²',
      district: 'Bağcılar, İstanbul',
      status: 'Aktif Kirada',
      rating: '4.92',
      reviews: 14,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#222222] font-sans selection:bg-[#ff385c] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navbar — Airbnb 80px style with clean 1px hairline */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 py-2">
            <Logo className="h-12 sm:h-14 w-auto" height={52} width={240} priority />
          </Link>

          {/* Navigation Tabs (Airbnb style) */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#222222]">
            <Link href="/properties" className="pb-1 border-b-2 border-[#222222] text-[#222222] font-semibold">
              Taşınmazlar
            </Link>
            <Link href="/handovers" className="text-[#6a6a6a] hover:text-[#222222] transition-colors">
              Teslim Tutanakları
            </Link>
            <Link href="/contacts" className="text-[#6a6a6a] hover:text-[#222222] transition-colors">
              Kiracı & Malik
            </Link>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:inline-block text-xs font-semibold text-[#222222] hover:bg-[#f7f7f7] px-3.5 py-2.5 rounded-full transition-colors">
              Yönetim Paneli
            </Link>
            <Link href="/login">
              <button className="text-xs font-medium text-[#222222] px-3 py-2 rounded-lg hover:bg-[#f7f7f7] transition-colors">
                Giriş Yap
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-[#ff385c] hover:bg-[#e00b41] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs">
                Acente Olun
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* Signature Pill Search Bar (Airbnb search-bar-pill) */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-full border border-[#dddddd] shadow-[0_2px_6px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] p-2 pl-6 sm:pl-8 flex items-center justify-between hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all">
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 divide-x divide-[#ebebeb] text-left">
              <div className="pr-4">
                <span className="block text-[11px] font-bold text-[#222222] tracking-wider uppercase">Konum / Mülk</span>
                <input 
                  type="text" 
                  placeholder="İstanbul, proje veya ilçe..." 
                  className="w-full text-xs text-[#6a6a6a] placeholder-[#929292] focus:outline-none bg-transparent mt-0.5 truncate" 
                />
              </div>
              <div className="px-4 hidden sm:block">
                <span className="block text-[11px] font-bold text-[#222222] tracking-wider uppercase">Teslimat Türü</span>
                <span className="block text-xs text-[#6a6a6a] mt-0.5">Giriş / Çıkış Tutanağı</span>
              </div>
              <div className="pl-4">
                <span className="block text-[11px] font-bold text-[#222222] tracking-wider uppercase">Durum</span>
                <span className="block text-xs text-[#6a6a6a] mt-0.5">Dijital Mühürlü</span>
              </div>
            </div>

            {/* Rausch Search Orb */}
            <Link href="/properties">
              <div className="size-11 sm:size-12 rounded-full bg-[#ff385c] hover:bg-[#e00b41] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-95">
                <Search className="size-4 sm:size-5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Hero Headline — Airbnb display-xl modest 28px font */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <h1 className="text-[26px] sm:text-[28px] font-bold text-[#222222] leading-snug tracking-tight">
            Taşınmaz Teslimatlarını İhtilafsız ve Doğrulanabilir Hale Getirin
          </h1>
          <p className="text-sm text-[#6a6a6a] leading-relaxed">
            Oda denetimleri, demirbaşlar, sayaç okumaları ve fotoğraflı kanıtları çift taraflı dijital onay ve QR kod ile güvenceye alın.
          </p>
        </div>

        {/* Featured Properties — Airbnb Property Card Style (Photo-first, 14px radius) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[21px] font-bold text-[#222222]">Örnek Teslim Portföyü</h2>
              <p className="text-xs text-[#6a6a6a] mt-0.5">Kayıtlı dijital kanıtları ve doğrulanmış tutanakları inceleyin</p>
            </div>
            <Link href="/properties" className="text-xs font-semibold text-[#222222] underline underline-offset-4 hover:text-[#6a6a6a]">
              Tümünü Gör
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((p) => (
              <Link key={p.id} href={`/properties/${p.id}`} className="group flex flex-col space-y-3">
                {/* Photo container with 14px radius and floating guest favorite badge */}
                <div className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#f2f2f2]">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Floating Airbnb "Guest favorite" style badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#222222] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                    Doğrulanmış Mülk
                  </div>
                </div>

                {/* Card Meta lines */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-sm text-[#222222]">
                    <span className="truncate">{p.title}</span>
                    <span className="flex items-center gap-1 font-semibold text-xs shrink-0">
                      <Star className="size-3.5 fill-[#222222] text-[#222222]" /> {p.rating}
                    </span>
                  </div>
                  <p className="text-[#6a6a6a] flex items-center gap-1">
                    <MapPin className="size-3 text-[#929292]" /> {p.district}
                  </p>
                  <p className="text-[#6a6a6a]" dangerouslySetInnerHTML={{ __html: p.type }} />
                  <div className="pt-1 flex items-center justify-between">
                    <span className="font-semibold text-[#ff385c]">{p.status}</span>
                    <span className="text-[#929292] text-[11px]">{p.reviews} Kanıt Kayıtlı</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3 Value Pillars (Airbnb clean style) */}
        <section className="pt-8 border-t border-[#ebebeb] grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <div className="size-10 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#222222]">
              <Camera className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-[#222222]">Oda Bazlı Fotoğraf & Hasar Kaydı</h3>
            <p className="text-xs text-[#6a6a6a] leading-relaxed">
              Zemin, tavan, boya ve armatür durumlarını odayla eşleşen fotoğraf kanıtlarıyla mühürleyin.
            </p>
          </div>

          <div className="space-y-2">
            <div className="size-10 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#222222]">
              <Gauge className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-[#222222]">Sayaç & Anahtar Mutabakatı</h3>
            <p className="text-xs text-[#6a6a6a] leading-relaxed">
              Elektrik, su, doğalgaz endekslerini ve teslim edilen anahtar adetlerini şeffaf biçimde tutanağa bağlayın.
            </p>
          </div>

          <div className="space-y-2">
            <div className="size-10 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#222222]">
              <QrCode className="size-5" />
            </div>
            <h3 className="font-bold text-sm text-[#222222]">Doğrulanabilir QR & PDF</h3>
            <p className="text-xs text-[#6a6a6a] leading-relaxed">
              Her teslimat için üretilen PDF rapor üzerindeki güvenli QR kod ile belgenin orijinalliği anında doğrulanır.
            </p>
          </div>
        </section>
      </main>

      {/* Footer — Airbnb 3-column clean light footer */}
      <footer className="bg-[#f7f7f7] border-t border-[#dddddd] text-xs text-[#222222] py-10 mt-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-[#222222]">Platform</h4>
              <ul className="space-y-1.5 text-[#6a6a6a]">
                <li><Link href="/properties" className="hover:underline">Mülk Portföyü</Link></li>
                <li><Link href="/handovers" className="hover:underline">Teslim Tutanakları</Link></li>
                <li><Link href="/dashboard" className="hover:underline">Yönetim Paneli</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#222222]">Acente & Kurumsal</h4>
              <ul className="space-y-1.5 text-[#6a6a6a]">
                <li><Link href="/register" className="hover:underline">Acente Kaydı</Link></li>
                <li><Link href="/settings" className="hover:underline">Acente Ayarları</Link></li>
                <li><Link href="/contacts" className="hover:underline">Kiracı & Malik Rehberi</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#222222]">Güvenlik & Gizlilik</h4>
              <p className="text-[#6a6a6a] leading-relaxed">
                Platformumuz Privacy-by-Design ve KVKK ilkeleriyle çalışır. Kamuya açık doğrulama sayfalarında kişisel veriler gizlenir.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#dddddd] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6a6a6a] text-[11px]">
            <div>&copy; 2026 Property Passport, Inc. Tüm hakları saklıdır.</div>
            <div className="flex items-center gap-4">
              <span>Gizlilik</span>
              <span>&bull;</span>
              <span>Kullanım Koşulları</span>
              <span>&bull;</span>
              <span>KVKK Aydınlatma</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
