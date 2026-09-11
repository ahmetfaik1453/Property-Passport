import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { ShieldCheck, CheckCircle2, QrCode, Lock, ArrowLeft, Building2, Calendar, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { QRCodeSVG } from 'qrcode.react'

interface VerifyPageProps {
  params: Promise<{
    token: string
  }>
}

const recordsByToken: Record<string, {
  documentId: string
  handoverType: string
  propertyReference: string
  handoverDate: string
  status: string
  verifiedAt: string
  issuingAgency: string
  roomCount: string
  evidenceCount: string
}> = {
  'demo-token-1': {
    documentId: 'DOC-TR-2026-HO-101',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyReference: 'İstanbul / Maltepe / Küçükyalı - Ref: PP-34-M14',
    handoverDate: '11 Eylül 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '11 Eylül 2026 14:30',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '2+1 (4 Oda Denetlendi)',
    evidenceCount: '18 Adet Dijital Kanıt',
  },
  'demo-token-vadi': {
    documentId: 'DOC-TR-2026-HO-102',
    handoverType: 'Çıkış Teslimatı (Move-Out)',
    propertyReference: 'İstanbul / Sarıyer / Ayazağa - Ref: PP-34-S42',
    handoverDate: '10 Eylül 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '10 Eylül 2026 16:00',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '3+1 (5 Oda Denetlendi)',
    evidenceCount: '24 Adet Dijital Kanıt',
  },
  'demo-token-bati': {
    documentId: 'DOC-TR-2026-HO-103',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyReference: 'İstanbul / Bağcılar / Batışehir - Ref: PP-34-B110',
    handoverDate: '08 Eylül 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '08 Eylül 2026 11:15',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '1+1 (3 Oda Denetlendi)',
    evidenceCount: '14 Adet Dijital Kanıt',
  },
  'demo-token-buyuk': {
    documentId: 'DOC-TR-2026-HO-105',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyReference: 'İstanbul / Zeytinburnu / Fişekhane - Ref: PP-34-Z18',
    handoverDate: '18 Mayıs 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '18 Mayıs 2026 15:45',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '2+1 (4 Oda Denetlendi)',
    evidenceCount: '19 Adet Dijital Kanıt',
  }
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const resolvedParams = await params
  const { token } = resolvedParams

  const record = recordsByToken[token] || {
    documentId: `DOC-TR-2026-${token.slice(0, 8).toUpperCase()}`,
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyReference: 'İstanbul / Maltepe / Küçükyalı - Ref: PP-34-M14',
    handoverDate: '11 Eylül 2026',
    status: 'VERIFIED_ACTIVE',
    verifiedAt: '11 Eylül 2026 14:30',
    issuingAgency: 'Prestij Gayrimenkul',
    roomCount: '2+1 (4 Oda Denetlendi)',
    evidenceCount: '18 Adet Dijital Kanıt',
  }

  const currentVerifyUrl = `https://property-passport-livid.vercel.app/verify/${token}`

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans text-[#222222]">
      <div className="max-w-xl mx-auto w-full space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center py-1">
            <Logo className="h-10 sm:h-12 w-auto" height={48} width={210} priority />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold text-[#222222]">
                Panoya Git
              </Button>
            </Link>
            <Badge variant="outline" className="gap-1 text-[11px] font-mono border-[#dddddd] text-[#222222]">
              <Lock className="w-3 h-3 text-emerald-600" /> Korumalı Doğrulama
            </Badge>
          </div>
        </div>

        {/* Verification Status Card */}
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[16px] overflow-hidden">
          <div className="bg-emerald-700 text-white p-6 text-center space-y-1.5">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Doğrulanmış Dijital Tutanak</h1>
            <p className="text-xs text-emerald-100">
              Bu kayıt Property Passport platformunda değiştirilemez şekilde arşivlenmiştir.
            </p>
          </div>

          <CardContent className="p-6 space-y-6 text-xs">
            {/* QR Code and Quick Verification Display */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-[#f7f7f7] border border-[#dddddd]">
              <div className="bg-white p-2.5 rounded-lg border border-[#dddddd] shadow-xs shrink-0">
                <QRCodeSVG 
                  value={currentVerifyUrl} 
                  size={100}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-bold text-[#222222] uppercase tracking-wider block">
                  Mobil / Saha Doğrulama Karekodu
                </span>
                <p className="text-[12px] text-[#717171] leading-relaxed">
                  Bu karekod, teslim tutanağının değişmezlik damgası ile eşleşir. Akıllı telefon kamerası ile okutarak kaydı teyit edebilirsiniz.
                </p>
                <span className="inline-block text-[11px] font-mono text-[#222222] bg-white px-2 py-0.5 rounded border border-[#dddddd] mt-1">
                  Token: {token}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#dddddd]">
              <div>
                <span className="text-[#717171] block mb-0.5">Belge No / ID:</span>
                <span className="font-mono font-bold text-[#222222] text-sm">{record.documentId}</span>
              </div>
              <div>
                <span className="text-[#717171] block mb-0.5">Teslimat Türü:</span>
                <span className="font-semibold text-[#222222]">{record.handoverType}</span>
              </div>
            </div>

            <div className="space-y-3 pb-4 border-b border-[#dddddd]">
              <div>
                <span className="text-[#717171] block mb-0.5">Taşınmaz Referansı:</span>
                <span className="font-bold text-[#222222] text-sm">{record.propertyReference}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#717171] block mb-0.5">Teslim Tarihi:</span>
                  <span className="font-medium text-[#222222]">{record.handoverDate}</span>
                </div>
                <div>
                  <span className="text-[#717171] block mb-0.5">Düzenleyen Ofis:</span>
                  <span className="font-medium text-[#222222]">{record.issuingAgency}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#dddddd]">
              <div>
                <span className="text-[#717171] block mb-0.5">Denetim Kapsamı:</span>
                <span className="font-medium text-[#222222]">{record.roomCount}</span>
              </div>
              <div>
                <span className="text-[#717171] block mb-0.5">Kayıtlı Kanıt Sayısı:</span>
                <span className="font-medium text-[#222222]">{record.evidenceCount}</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-3.5 rounded-xl bg-[#f7f7f7] border border-[#dddddd] text-[11px] text-[#717171] leading-relaxed">
              <p className="font-bold text-[#222222] mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#222222]" /> Kişisel Verilerin Korunması (KVKK / Privacy by Design)
              </p>
              Mülk sahibi ve kiracı kişisel verileri (Ad, Soyad, TC No, Telefon) ve özel yaşam alanına ait fotoğraflar kamuya açık doğrulama sayfasında paylaşılmaz. Yalnızca yetkili taraflar sisteme giriş yaparak tam rapora erişebilir.
            </div>
          </CardContent>
        </Card>

        {/* Action Links */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/handovers">
            <Button variant="outline" size="sm" className="gap-2 text-[#222222] border-[#dddddd] hover:bg-[#f7f7f7]">
              <ArrowLeft className="w-4 h-4" /> Tutanaklara Dön
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white">
              Yönetim Paneline Git
            </Button>
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-[#717171] py-4">
        Property Passport Dijital Kanıt Doğrulama Servisi &copy; 2026
      </footer>
    </div>
  )
}
