'use client'

import React, { useState, useEffect } from 'react'
import { 
  Building2, 
  Save, 
  CheckCircle2,
  Lock,
  User,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { isValidEmail } from '@/lib/validations'
import { createClient } from '@/utils/supabase/client'

export default function SettingsPageClient() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [role, setRole] = useState<'AGENT' | 'LANDLORD' | 'TENANT'>('AGENT')
  const [fullName, setFullName] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [taxNo, setTaxNo] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          const meta = user.user_metadata || {}
          setEmail(user.email || '')
          setFullName(meta.full_name || '')
          setPhone(meta.phone || '')
          setRole(meta.role || 'AGENT')
          setAgencyName(meta.agency_name || (meta.role === 'LANDLORD' ? 'Bireysel Mülk Sahibi' : meta.role === 'TENANT' ? 'Bireysel Kiracı' : ''))
          setTaxNo(meta.tax_no || '')
          setAddress(meta.address || '')
        }
      } catch (e) {
        console.error('Failed to load user in settings:', e)
      } finally {
        setLoading(false)
      }
    }
    loadUserProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { [key: string]: string } = {}

    if (!fullName.trim()) errs.fullName = 'Ad Soyad zorunludur.'
    if (role === 'AGENT' && !agencyName.trim()) errs.agencyName = 'Acente adı zorunludur.'
    if (!isValidEmail(email)) errs.email = 'Geçerli bir e-posta adresi yazınız.'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    try {
      if (user) {
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            agency_name: agencyName,
            phone: phone,
            role: role,
            tax_no: taxNo,
            address: address,
          }
        })
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error('Update user metadata error:', e)
    }
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#dddddd]">
        <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">
          {role === 'AGENT' ? 'Acente ve Profil Ayarları' : 'Kullanıcı Profil Ayarları'}
        </h1>
        <p className="text-[14px] text-[#717171] mt-1">
          {role === 'AGENT' 
            ? 'Teslim tutanaklarında basılacak şirket unvanı, iletişim bilgileri ve yetkili ayarları'
            : 'Sistemde kayıtlı profiliniz, iletişim bilgileriniz ve bildirim tercihleriniz'}
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-[13px] text-emerald-800 font-medium">
          <CheckCircle2 className="size-4 text-emerald-600" />
          <span>Profil bilgileriniz başarıyla güncellendi.</span>
        </div>
      )}

      {/* Profile & Agency Information */}
      <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
        <CardHeader className="p-5 border-b border-[#dddddd]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <User className="size-4 text-[#ff385c]" />
              Hesap ve Kimlik Bilgileri
            </CardTitle>
            <Badge variant="outline" className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 border-[#ff385c]/30 text-[#ff385c] bg-[#fff8f6]">
              {role === 'LANDLORD' ? 'Mülk Sahibi' : role === 'TENANT' ? 'Kiracı' : 'Acente Yöneticisi'}
            </Badge>
          </div>
          <p className="text-[13px] text-[#717171]">
            Teslim tutanaklarında taraf ve onay yetkilisi olarak yer alacak güncel bilgileriniz.
          </p>
        </CardHeader>
        <CardContent className="p-5">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">Adınız Soyadınız *</label>
                <Input
                  required
                  maxLength={60}
                  className={`text-[13px] h-9 bg-white border-[#dddddd] rounded-lg ${errors.fullName ? 'border-[#c13515]' : ''}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <span className="text-[11px] text-[#c13515] mt-0.5 block">{errors.fullName}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">E-posta Adresi *</label>
                <Input
                  type="email"
                  disabled
                  className="text-[13px] h-9 bg-[#f7f7f7] text-[#717171] border-[#dddddd] rounded-lg cursor-not-allowed"
                  value={email}
                />
                <span className="text-[10px] text-[#999999] block">Giriş e-posta adresi güvenli şekilde kilitlidir.</span>
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#222222]">İletişim Telefonu</label>
                <Input
                  className="text-[13px] h-9 font-mono bg-white border-[#dddddd] rounded-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0532 123 45 67"
                />
              </div>

              {role === 'AGENT' ? (
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
              ) : (
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#222222]">Hesap Statüsü</label>
                  <Input
                    disabled
                    className="text-[13px] h-9 bg-[#f7f7f7] text-[#555555] border-[#dddddd] rounded-lg"
                    value={role === 'LANDLORD' ? 'Bireysel Ev Sahibi' : 'Bireysel Kiracı'}
                  />
                </div>
              )}

              {role === 'AGENT' && (
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#222222]">Vergi No / Yetki Belge No</label>
                  <Input
                    maxLength={20}
                    className="text-[13px] h-9 font-mono bg-white border-[#dddddd] rounded-lg"
                    value={taxNo}
                    onChange={(e) => setTaxNo(e.target.value)}
                  />
                </div>
              )}

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
