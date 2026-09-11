'use client'

import React, { useState } from 'react'
import { 
  Building2, 
  Save, 
  CheckCircle2,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { isValidEmail } from '@/lib/validations'

export default function SettingsPageClient() {
  const [agencyName, setAgencyName] = useState('Prestij Gayrimenkul Danışmanlığı A.Ş.')
  const [taxNo, setTaxNo] = useState('8910248102')
  const [phone, setPhone] = useState('0216 441 20 00')
  const [email, setEmail] = useState('info@prestijgayrimenkul.com')
  const [address, setAddress] = useState('Bağdat Caddesi No: 242/4 Kadıköy / İstanbul')
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { [key: string]: string } = {}

    if (!agencyName.trim()) errs.agencyName = 'Acente adı zorunludur.'
    if (!isValidEmail(email)) errs.email = 'Geçerli bir e-posta adresi yazınız.'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#dddddd]">
        <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">Acente ve Sistem Ayarları</h1>
        <p className="text-[14px] text-[#717171] mt-1">
          Teslim tutanaklarında basılacak şirket unvanı, iletişim bilgileri ve imza yetkilisi ayarları
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-[13px] text-emerald-800 font-medium">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <span>Acente bilgileri başarıyla güncellendi.</span>
        </div>
      )}

      {/* Agency Profile */}
      <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
        <CardHeader className="p-5 border-b border-[#dddddd]">
          <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
            <Building2 className="size-4 text-[#ff385c]" />
            Kurumsal Bilgiler (Tutanak Üstbilgisi)
          </CardTitle>
          <p className="text-[13px] text-[#717171]">
            PDF çıktılarında ve doğrulanabilir teslim tutanaklarında resmi ofis bilgisi olarak görüntülenir.
          </p>
        </CardHeader>
        <CardContent className="p-5">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">Acente / Ticari Unvan *</label>
                <Input
                  required
                  maxLength={100}
                  className={`text-[13px] h-9 bg-white border-[#dddddd] rounded-lg ${errors.agencyName ? 'border-[#c13515]' : ''}`}
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
                {errors.agencyName && <span className="text-[11px] text-[#c13515] mt-0.5 block">{errors.agencyName}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">Vergi No / Yetki Belge No</label>
                <Input
                  maxLength={20}
                  className="text-[13px] h-9 font-mono bg-white border-[#dddddd] rounded-lg"
                  value={taxNo}
                  onChange={(e) => setTaxNo(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">Ofis Telefonu</label>
                <Input
                  className="text-[13px] h-9 font-mono bg-white border-[#dddddd] rounded-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">İletişim E-posta Adresi *</label>
                <Input
                  required
                  type="email"
                  className={`text-[13px] h-9 bg-white border-[#dddddd] rounded-lg ${errors.email ? 'border-[#c13515]' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-[11px] text-[#c13515] mt-0.5 block">{errors.email}</span>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#222222]">Ofis Adresi</label>
              <Input
                maxLength={150}
                className="text-[13px] h-9 bg-white border-[#dddddd] rounded-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="pt-3 flex justify-end">
              <Button type="submit" size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-2 h-9 text-[14px] font-medium px-5 rounded-lg shadow-sm">
                <Save className="size-3.5" /> Değişiklikleri Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security & Verification Settings */}
      <Card className="border-slate-200 shadow-xs bg-white">
        <CardHeader className="p-5 border-b border-slate-100">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="size-4 text-slate-700" />
            Güvenlik & Dijital Kanıt Parametreleri
          </CardTitle>
          <p className="text-xs text-slate-500">
            Kriptografik özetleme ve gizlilik ayarları
          </p>
        </CardHeader>
        <CardContent className="p-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900 block">SHA-256 Dijital Mühürleme</span>
              <span className="text-[11px] text-slate-500">Her teslim tutanağı ve fotoğraflar yükleme anında kriptografik hash ile damgalanır.</span>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px]">
              Aktif
            </Badge>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900 block">Privacy-by-Design QR Koruması</span>
              <span className="text-[11px] text-slate-500">Kamuya açık QR kod taramalarında tarafların kişisel kimlik ve telefon bilgileri gizlenir.</span>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px]">
              Zorunlu
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
