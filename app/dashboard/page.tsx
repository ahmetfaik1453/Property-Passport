import Link from 'next/link'
import { Building2, FileText, CheckCircle2, Clock, Plus, ArrowUpRight, ShieldCheck, MapPin, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Prestij Gayrimenkul Portföyü</h1>
          <p className="text-sm text-slate-500 mt-1">
            Güncel teslimat kayıtları, aktif kiralamalar ve doğrulanabilir dijital kanıtlar
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/properties/new">
            <Button variant="outline" className="gap-2">
              <Building2 className="w-4 h-4" /> Mülk Ekle
            </Button>
          </Link>
          <Link href="/handovers/new">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" /> Yeni Teslim Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Toplam Mülk</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">18</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Aktif Kiralamalar</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">14</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Bekleyen Teslimatlar</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Kanıtlanmış Teslimat</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">29</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Handovers / Recent Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Handovers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Devam Eden & Son Teslimatlar</h2>
            <Link href="/handovers" className="text-xs font-medium text-blue-600 hover:underline">
              Tümünü Gör
            </Link>
          </div>

          <div className="space-y-3">
            {/* Handover Item 1 */}
            <Card className="hover:border-slate-300 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">Onay Bekliyor</Badge>
                    <span className="text-xs text-slate-400 font-mono">Giriş Teslimatı (Move-in)</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    Nidapark Küçükyalı A Blok D:14
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Maltepe, İstanbul
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> 18 Fotoğraf
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/handovers/demo-handover-1">
                    <Button size="sm" variant="outline">
                      İncele & Onayla
                    </Button>
                  </Link>
                  <Link href="/verify/demo-token-1">
                    <Button size="sm" className="bg-slate-900">
                      QR Doğrulama
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Handover Item 2 */}
            <Card className="hover:border-slate-300 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Tamamlandı & Doğrulandı</Badge>
                    <span className="text-xs text-slate-400 font-mono">Çıkış Teslimatı (Move-out)</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">
                    Vadi İstanbul Park 2. Kısım D:42
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Sarıyer, İstanbul
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Rapor İmzalandı
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/verify/demo-token-vadi">
                    <Button size="sm" variant="outline" className="gap-1.5">
                      Kamuya Açık Doğrulama <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right: Quick Checklist / Guidance */}
        <div>
          <Card className="border-blue-100 bg-blue-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Saha Teslimat Kontrol Listesi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-600 space-y-2.5">
              <p>
                Mobil cihazınızla teslim yaparken şu adımları izleyin:
              </p>
              <ul className="space-y-2 list-disc pl-4 text-slate-700">
                <li>Giriş ve çıkış sayaçlarının (Elektrik, Su, Doğalgaz) değerlerini girip fotoğraflayın.</li>
                <li>Tüm odaların (Salon, Mutfak vb.) duvar ve zemin durumlarını işaretleyin.</li>
                <li>Mevcut çizik veya hasarları doğrudan o odaya ait fotoğraf olarak ekleyin.</li>
                <li>Teslim edilen anahtar adedini eksiksiz belirtin.</li>
                <li>Kiracı ve ev sahibi onayının ardından tek tıkla dijital PDF oluşturun.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
