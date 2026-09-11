import Link from 'next/link'
import { ShieldCheck, CheckCircle2, QrCode, FileText, Calendar, Building2, Lock, ArrowLeft } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface VerifyPageProps {
  params: Promise<{
    token: string
  }>
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const resolvedParams = await params
  const { token } = resolvedParams

  // Güvenlik & Gizlilik İlkesi (Privacy-by-Design):
  // Bu sayfada KESİNLİKLE kiracı, ev sahibi adı, kimlik no, telefon veya özel fotoğraflar gösterilmez!
  const record = {
    documentId: 'DOC-TR-2026-98124',
    token: token,
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyReference: 'İstanbul / Maltepe / Küçükyalı - Ref: PP-34-M14',
    handoverDate: '11 Eylül 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '11 Eylül 2026 14:30',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '2+1 (4 Oda Denetlendi)',
    evidenceCount: '18 Adet Dijital Kanıt',
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      <div className="max-w-xl mx-auto w-full space-y-6">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-base">
              Property Passport
            </span>
          </div>
          <Badge variant="outline" className="gap-1 text-[11px] font-mono">
            <Lock className="w-3 h-3 text-emerald-600" /> Korumalı Doğrulama
          </Badge>
        </div>

        {/* Verification Status Card */}
        <Card className="border-emerald-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-600 text-white p-5 text-center space-y-1">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold">Doğrulanmış Dijital Tutanak</h1>
            <p className="text-xs text-emerald-100">
              Bu kayıt Property Passport platformunda değiştirilemez şekilde arşivlenmiştir.
            </p>
          </div>

          <CardContent className="p-6 space-y-5 text-xs">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Belge No / ID:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{record.documentId}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Teslimat Türü:</span>
                <span className="font-medium text-slate-800">{record.handoverType}</span>
              </div>
            </div>

            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Taşınmaz Referansı:</span>
                <span className="font-semibold text-slate-900 text-sm">{record.propertyReference}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block mb-0.5">Teslim Tarihi:</span>
                  <span className="font-medium text-slate-800">{record.handoverDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Düzenleyen Ofis:</span>
                  <span className="font-medium text-slate-800">{record.issuingAgency}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Denetim Kapsamı:</span>
                <span className="font-medium text-slate-800">{record.roomCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Kayıtlı Kanıt Sayısı:</span>
                <span className="font-medium text-slate-800">{record.evidenceCount}</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
              <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Kişisel Verilerin Korunması (KVKK / Privacy by Design)
              </p>
              Mülk sahibi ve kiracı kişisel verileri (Ad, Soyad, TC No, Telefon) ve özel yaşam alanına ait fotoğraflar kamuya açık doğrulama sayfasında paylaşılmaz. Yalnızca yetkili taraflar sisteme giriş yaparak tam rapora erişebilir.
            </div>
          </CardContent>
        </Card>

        {/* Action Link */}
        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500">
              <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-4">
        Property Passport Dijital Kanıt Doğrulama Servisi &copy; 2026
      </footer>
    </div>
  )
}
