'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Building2, Users, FileCheck, Camera, Layers, Gauge, KeyRound, 
  CheckCircle2, ArrowRight, ArrowLeft, Upload, Check, QrCode, Download, Trash2, Eye, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatPhoneNumber } from '@/lib/validations'
import { QRCodeSVG } from 'qrcode.react'

interface RoomPhoto {
  id: string
  url: string
  name: string
  timestamp: string
}

interface RoomData {
  id: string
  name: string
  condition: string
  notes: string
  photos: RoomPhoto[]
}

function WizardInner() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

  // Parametreye göre mülk ve taraf eşleme (Duplication önleme)
  const propertyId = searchParams.get('property_id') || searchParams.get('id') || 'prop-1'

  const propertyProfiles: { [key: string]: { title: string; landlord: string; tenant: string; lPhone: string; tPhone: string; token: string } } = {
    'prop-1': { title: 'Nidapark Küçükyalı A Blok D:14', landlord: 'Ali Kaya', tenant: 'Ahmet Yılmaz', lPhone: '0533 992 14 50', tPhone: '0532 441 20 18', token: 'demo-token-1' },
    'ho-101': { title: 'Nidapark Küçükyalı A Blok D:14', landlord: 'Ali Kaya', tenant: 'Ahmet Yılmaz', lPhone: '0533 992 14 50', tPhone: '0532 441 20 18', token: 'demo-token-1' },
    'prop-2': { title: 'Vadi İstanbul Park 2. Kısım D:42', landlord: 'Fatma Şahin', tenant: 'Mehmet Demir', lPhone: '0544 112 33 44', tPhone: '0535 882 19 40', token: 'demo-token-vadi' },
    'ho-102': { title: 'Vadi İstanbul Park 2. Kısım D:42', landlord: 'Fatma Şahin', tenant: 'Mehmet Demir', lPhone: '0544 112 33 44', tPhone: '0535 882 19 40', token: 'demo-token-vadi' },
    'prop-3': { title: 'Batışehir Premium Rezidans D:110', landlord: 'Kemal Sunal', tenant: 'Selin Kaya', lPhone: '0532 555 44 33', tPhone: '0542 331 90 12', token: 'demo-token-bati' },
    'ho-103': { title: 'Batışehir Premium Rezidans D:110', landlord: 'Kemal Sunal', tenant: 'Selin Kaya', lPhone: '0532 555 44 33', tPhone: '0542 331 90 12', token: 'demo-token-bati' },
    'prop-4': { title: 'Zorlu Center Terrazze D:T-4', landlord: 'Hasan Yılmaz', tenant: 'Murat Arslan', lPhone: '0533 111 22 33', tPhone: '0532 999 88 77', token: 'demo-token-zorlu' },
    'ho-104': { title: 'Zorlu Center Terrazze D:T-4', landlord: 'Hasan Yılmaz', tenant: 'Murat Arslan', lPhone: '0533 111 22 33', tPhone: '0532 999 88 77', token: 'demo-token-zorlu' },
    'prop-5': { title: 'Büyükyalı Fişekhane Suites D:B-18', landlord: 'Mustafa Aydın', tenant: 'Canan Özdemir', lPhone: '0542 000 11 22', tPhone: '0535 777 66 55', token: 'demo-token-buyuk' },
    'ho-105': { title: 'Büyükyalı Fişekhane Suites D:B-18', landlord: 'Mustafa Aydın', tenant: 'Canan Özdemir', lPhone: '0542 000 11 22', tPhone: '0535 777 66 55', token: 'demo-token-buyuk' },
    'prop-6': { title: 'Sinpaş Finans Şehir Kule 2 D:88', landlord: 'Ahmet Faik Özsoy', tenant: 'Emre Çetin', lPhone: '0532 123 45 67', tPhone: '0544 333 22 11', token: 'demo-token-1' },
  }

  const currentProfile = propertyProfiles[propertyId] || propertyProfiles['prop-1']

  const [handoverType, setHandoverType] = useState<'MOVE_IN' | 'MOVE_OUT'>('MOVE_IN')
  const [selectedProperty, setSelectedProperty] = useState(currentProfile.title)
  const [landlordName, setLandlordName] = useState(currentProfile.landlord)
  const [landlordPhone, setLandlordPhone] = useState(currentProfile.lPhone)
  const [tenantName, setTenantName] = useState(currentProfile.tenant)
  const [tenantPhone, setTenantPhone] = useState(currentProfile.tPhone)

  useEffect(() => {
    if (propertyProfiles[propertyId]) {
      const p = propertyProfiles[propertyId]
      setSelectedProperty(p.title)
      setLandlordName(p.landlord)
      setLandlordPhone(p.lPhone)
      setTenantName(p.tenant)
      setTenantPhone(p.tPhone)
    }
  }, [propertyId])

  // Odalar ve Gerçekçi Görsel Kanıtlar
  const [rooms, setRooms] = useState<RoomData[]>([
    { 
      id: 'r1', 
      name: 'Salon', 
      condition: 'GOOD', 
      notes: 'Zemin lamine parke temiz, batı cephesi boyası yeni.', 
      photos: [
        { id: 'p-101', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', name: 'salon_genel_aci.jpg', timestamp: '11 Eyl 14:10' },
        { id: 'p-102', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', name: 'salon_parke_durum.jpg', timestamp: '11 Eyl 14:12' },
        { id: 'p-103', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', name: 'salon_pencere_kasa.jpg', timestamp: '11 Eyl 14:15' },
      ]
    },
    { 
      id: 'r2', 
      name: 'Mutfak', 
      condition: 'GOOD', 
      notes: 'Tezgah ve dolap kapakları sağlam, evye ve armatür faal.', 
      photos: [
        { id: 'p-201', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', name: 'mutfak_tezgah_evye.jpg', timestamp: '11 Eyl 14:18' },
        { id: 'p-202', url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', name: 'mutfak_dolaplari.jpg', timestamp: '11 Eyl 14:20' }
      ]
    },
    { 
      id: 'r3', 
      name: 'Yatak Odası', 
      condition: 'SCRATCHED', 
      notes: 'Giriş kapısı arkasında süpürgelikte küçük çizik mevcut.', 
      photos: [
        { id: 'p-301', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80', name: 'yatak_odasi_genel.jpg', timestamp: '11 Eyl 14:22' },
        { id: 'p-302', url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=600&q=80', name: 'supurgelik_cizik_tespiti.jpg', timestamp: '11 Eyl 14:24' }
      ]
    },
    { 
      id: 'r4', 
      name: 'Banyo / WC', 
      condition: 'GOOD', 
      notes: 'Duşakabin ve bataryalar kusursuz, sızıntı yok.', 
      photos: [
        { id: 'p-401', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', name: 'dusakabin_ve_lavabo.jpg', timestamp: '11 Eyl 14:26' },
        { id: 'p-402', url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80', name: 'batarya_armatur_kontrol.jpg', timestamp: '11 Eyl 14:27' }
      ]
    }
  ])

  // Fotoğraf Yükleme Fonksiyonu
  const handlePhotoUpload = (roomId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newPhotos: RoomPhoto[] = Array.from(files).map((file, idx) => ({
      id: `up-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
      timestamp: 'Az önce'
    }))

    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          photos: [...r.photos, ...newPhotos]
        }
      }
      return r
    }))
  }

  // Fotoğraf Silme Fonksiyonu
  const handlePhotoDelete = (roomId: string, photoId: string) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          photos: r.photos.filter(p => p.id !== photoId)
        }
      }
      return r
    }))
  }

  // Demirbaşlar
  const [inventories, setInventories] = useState([
    { name: 'Kombi', brand: 'Vaillant', model: 'EcoTEC 24kW', statusText: 'Faal / Bakımlı' },
    { name: 'Buzdolabı', brand: 'Siemens', model: 'NoFrost XXL', statusText: 'Faal / Temiz' },
    { name: 'Klima', brand: 'Daikin', model: '12.000 BTU Inverter', statusText: 'Faal / Kumandalı' },
  ])

  // Sayaçlar
  const [meters, setMeters] = useState([
    { type: 'Elektrik', number: 'ELK-892102', value: '1428.5', unit: 'kWh' },
    { type: 'Su', number: 'SU-441209', value: '382.1', unit: 'm³' },
    { type: 'Doğalgaz', number: 'GAZ-991283', value: '219.0', unit: 'm³' },
  ])

  // Anahtarlar
  const [keys, setKeys] = useState([
    { type: 'Daire Çelik Kapı Anahtarı', count: 3 },
    { type: 'Bina Dış Giriş Çipi / Anahtarı', count: 2 },
    { type: 'Posta Kutusu Anahtarı', count: 1 },
  ])

  const [tenantApproved, setTenantApproved] = useState(false)
  const [landlordApproved, setLandlordApproved] = useState(false)

  const stepsList = [
    { num: 1, label: 'Mülk & Taraflar' },
    { num: 2, label: 'Oda Denetimi' },
    { num: 3, label: 'Görsel Kanıt' },
    { num: 4, label: 'Demirbaşlar' },
    { num: 5, label: 'Sayaç & Anahtar' },
    { num: 6, label: 'Özet Kontrol' },
    { num: 7, label: 'Mutabakat' },
    { num: 8, label: 'Resmi Rapor' },
  ]

  const totalPhotosCount = rooms.reduce((acc, r) => acc + r.photos.length, 0)
  const activeToken = currentProfile.token || 'demo-token-1'
  const verifyLink = `https://property-passport-livid.vercel.app/verify/${activeToken}`

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-12 font-sans text-[#222222]">
      {/* Wizard Header - Temiz, profesyonel, pill etiketsiz başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dddddd]">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">
            Taşınmaz Teslim Tutanak Kaydı
          </h1>
          <p className="text-[13px] text-[#717171] mt-0.5">
            {selectedProperty} &bull; Saha Giriş/Çıkış Belgeleme
          </p>
        </div>

        <div className="text-[13px] font-medium text-[#717171]">
          Adım <span className="text-[#222222] font-bold text-[15px]">{currentStep}</span> / {totalSteps}
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-1 bg-[#f7f7f7] rounded-xl border border-[#dddddd]">
        {stepsList.map((step) => (
          <button
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            className={`py-2 px-1 text-center rounded-lg text-[12px] transition-all ${
              currentStep === step.num
                ? 'bg-white text-[#222222] shadow-sm font-bold border border-[#dddddd]'
                : currentStep > step.num
                ? 'text-[#222222] hover:bg-white/60 font-medium'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            <span className="block text-[10px] opacity-60">0{step.num}</span>
            <span className="truncate block">{step.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: Mülk ve Taraflar */}
      {currentStep === 1 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <Building2 className="size-4 text-[#ff385c]" />
              1. Teslim Türü, Taşınmaz ve Taraf Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#222222]">Teslim Türü *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHandoverType('MOVE_IN')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    handoverType === 'MOVE_IN'
                      ? 'border-[#222222] bg-[#f7f7f7] ring-1 ring-[#222222]'
                      : 'border-[#dddddd] hover:bg-[#f7f7f7]'
                  }`}
                >
                  <p className="font-bold text-[#222222] text-xs">Giriş Teslimatı (Move-In)</p>
                  <p className="text-[11px] text-[#717171] mt-1">Kiracının mülke taşınma anındaki fiziksel durum tespiti</p>
                </button>

                <button
                  type="button"
                  onClick={() => setHandoverType('MOVE_OUT')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    handoverType === 'MOVE_OUT'
                      ? 'border-[#222222] bg-[#f7f7f7] ring-1 ring-[#222222]'
                      : 'border-[#dddddd] hover:bg-[#f7f7f7]'
                  }`}
                >
                  <p className="font-bold text-[#222222] text-xs">Çıkış Teslimatı (Move-Out)</p>
                  <p className="text-[11px] text-[#717171] mt-1">Kira bitiminde tahliye ve depozito mutabakatı durumu</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#222222]">Taşınmaz (Mülk Referansı)</label>
              <Input value={selectedProperty} readOnly className="bg-[#f7f7f7] border-[#dddddd] text-xs h-9 font-medium" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 p-3.5 rounded-xl border border-[#dddddd] bg-[#f7f7f7]/60">
                <span className="text-xs font-bold text-[#222222] block">Mülk Sahibi Bilgileri</span>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#717171] font-medium">Adı Soyadı</label>
                  <Input value={landlordName} onChange={(e) => setLandlordName(e.target.value)} className="bg-white border-[#dddddd] text-xs h-8" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#717171] font-medium">Telefon</label>
                  <Input 
                    value={landlordPhone} 
                    onChange={(e) => setLandlordPhone(formatPhoneNumber(e.target.value))} 
                    className="bg-white border-[#dddddd] text-xs h-8 font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-3 p-3.5 rounded-xl border border-[#dddddd] bg-[#f7f7f7]/60">
                <span className="text-xs font-bold text-[#222222] block">Kiracı Bilgileri</span>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#717171] font-medium">Adı Soyadı</label>
                  <Input value={tenantName} onChange={(e) => setTenantName(e.target.value)} className="bg-white border-[#dddddd] text-xs h-8" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-[#717171] font-medium">Telefon</label>
                  <Input 
                    value={tenantPhone} 
                    onChange={(e) => setTenantPhone(formatPhoneNumber(e.target.value))} 
                    className="bg-white border-[#dddddd] text-xs h-8 font-mono" 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Oda Denetimi */}
      {currentStep === 2 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <FileCheck className="size-4 text-[#ff385c]" />
              2. Oda Bazlı Fiziksel Durum Kontrolleri
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-3">
            {rooms.map((room) => (
              <div key={room.id} className="p-3.5 rounded-xl border border-[#dddddd] bg-white flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#222222]">{room.name}</h4>
                  <select
                    value={room.condition}
                    onChange={(e) => {
                      const updated = rooms.map((r) => r.id === room.id ? { ...r, condition: e.target.value } : r)
                      setRooms(updated)
                    }}
                    className="text-xs font-semibold rounded-md border border-[#dddddd] px-2 py-1 bg-[#f7f7f7] text-[#222222]"
                  >
                    <option value="GOOD">Kusursuz / Temiz</option>
                    <option value="USED">Normal Kullanım</option>
                    <option value="SCRATCHED">Yüzeysel Çizik</option>
                    <option value="DAMAGED">Hasarlı</option>
                    <option value="REQUIRES_ATTENTION">Onarım Gerektirir</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#717171] font-medium">Denetim Notu</label>
                  <Input
                    value={room.notes}
                    onChange={(e) => {
                      const updated = rooms.map((r) => r.id === room.id ? { ...r, notes: e.target.value } : r)
                      setRooms(updated)
                    }}
                    className="text-xs h-8 border-[#dddddd]"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* STEP 3: Kanıt Yükleme & Fotoğraf Önizleme */}
      {currentStep === 3 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
                <Camera className="size-4 text-[#ff385c]" />
                3. Odaya Bağlı Fotoğraf & Video Kanıtları
              </CardTitle>
              <span className="text-xs font-semibold text-[#222222] bg-[#f7f7f7] px-2.5 py-1 rounded-full border border-[#dddddd]">
                Toplam {totalPhotosCount} Fotoğraf
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-6">
            <p className="text-xs text-[#717171]">
              Her odaya ait görsel kanıtları inceleyebilir, silebilir veya yeni fotoğraf yükleyebilirsiniz.
            </p>

            <div className="flex flex-col gap-5">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 rounded-xl border border-[#dddddd] bg-[#f7f7f7]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-[#222222]">{room.name}</span>
                      <span className="text-[11px] text-[#717171] block mt-0.5">{room.notes}</span>
                    </div>

                    <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#222222] hover:bg-black px-3 py-1.5 rounded-lg shadow-xs transition-colors">
                      <Plus className="size-3.5" /> Fotoğraf Ekle
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(room.id, e)}
                      />
                    </label>
                  </div>

                  {/* Fotoğraf Grid Önizleme */}
                  {room.photos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {room.photos.map((photo) => (
                        <div key={photo.id} className="group relative rounded-lg overflow-hidden border border-[#dddddd] bg-white aspect-[4/3] shadow-xs">
                          <img 
                            src={photo.url} 
                            alt={photo.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {/* Üst Karartma ve Silme Butonu */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                            <button
                              type="button"
                              onClick={() => handlePhotoDelete(room.id, photo.id)}
                              className="self-end p-1 rounded-md bg-red-600 hover:bg-red-700 text-white shadow-xs"
                              title="Fotoğrafı Kaldır"
                            >
                              <Trash2 className="size-3" />
                            </button>
                            <span className="text-[10px] text-white truncate font-mono">
                              {photo.name}
                            </span>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-xs font-mono group-hover:opacity-0">
                            {photo.timestamp}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg border border-dashed border-[#dddddd] text-center text-xs text-[#717171]">
                      Bu odaya ait henüz fotoğraf eklenmedi.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: Demirbaşlar */}
      {currentStep === 4 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <Layers className="size-4 text-[#ff385c]" />
              4. Taşınmaz Demirbaş Envanteri
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-3">
            {inventories.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-[#dddddd] bg-white flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#222222]">{item.name}</p>
                  <p className="text-[#717171] mt-0.5">{item.brand} &bull; {item.model}</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] font-semibold">
                  {item.statusText}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* STEP 5: Sayaçlar ve Anahtarlar */}
      {currentStep === 5 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <Gauge className="size-4 text-[#ff385c]" />
              5. Sayaç Değerleri & Teslim Edilen Anahtarlar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-2">Sayaç Okumaları</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {meters.map((meter, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-[#dddddd] bg-[#f7f7f7]">
                    <p className="text-xs text-[#717171]">{meter.type} ({meter.number})</p>
                    <p className="text-base font-bold text-[#222222] mt-1">
                      {meter.value} <span className="text-xs font-normal text-[#717171]">{meter.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#dddddd]">
              <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-2">Anahtar Teslimatı</h4>
              <div className="flex flex-col gap-2">
                {keys.map((k, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-[#dddddd] bg-white flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#222222]">{k.type}</span>
                    <Badge variant="secondary" className="bg-[#f7f7f7] text-[#222222] border border-[#dddddd] font-semibold">{k.count} Adet</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 6: İnceleme ve Özet */}
      {currentStep === 6 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#ff385c]" />
              6. Teslimat Öncesi Özet ve Kontrol Listesi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#f7f7f7] border border-[#dddddd] text-center">
              <div>
                <p className="text-xs text-[#717171]">Denetlenen Oda</p>
                <p className="text-xl font-bold text-[#222222]">{rooms.length}</p>
              </div>
              <div>
                <p className="text-xs text-[#717171]">Toplam Kanıt</p>
                <p className="text-xl font-bold text-[#222222]">{totalPhotosCount} Foto</p>
              </div>
              <div>
                <p className="text-xs text-[#717171]">Kayıtlı Demirbaş</p>
                <p className="text-xl font-bold text-[#222222]">{inventories.length}</p>
              </div>
              <div>
                <p className="text-xs text-[#717171]">Sayaç / Anahtar</p>
                <p className="text-xl font-bold text-[#222222]">3 / 6 Adet</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 flex items-center gap-2 font-medium">
              <Check className="size-4 text-emerald-600 shrink-0" />
              <span>Tüm odalar, demirbaşlar, görsel kanıtlar ve sayaçlar kontrol edildi. Tutanak tarafların onayına hazır.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 7: Dijital Onay Akışı */}
      {currentStep === 7 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <Users className="size-4 text-[#ff385c]" />
              7. Tarafların Dijital Onay ve Mutabakat Akışı
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 flex flex-col gap-3">
            <p className="text-xs text-[#717171]">
              Bu onaylar platform içi durum tespiti ve mutabakat amaçlıdır (Resmi nitelikli e-imza yerine geçmez).
            </p>

            <div className="p-3.5 rounded-xl border border-[#dddddd] bg-white flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#222222]">Emlak Danışmanı (Yetkili)</p>
                <p className="text-[#717171]">Prestij Gayrimenkul</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold">Onaylandı (11 Eylül 2026)</Badge>
            </div>

            <div className="p-3.5 rounded-xl border border-[#dddddd] bg-white flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#222222]">Kiracı: {tenantName}</p>
                <p className="text-[#717171]">{tenantPhone}</p>
              </div>
              {tenantApproved ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold">Onaylandı</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setTenantApproved(true)} className="h-8 text-xs font-semibold border-[#dddddd]">
                  Kiracı Adına Onayla
                </Button>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-[#dddddd] bg-white flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#222222]">Mülk Sahibi: {landlordName}</p>
                <p className="text-[#717171]">{landlordPhone}</p>
              </div>
              {landlordApproved ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold">Onaylandı</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setLandlordApproved(true)} className="h-8 text-xs font-semibold border-[#dddddd]">
                  Mülk Sahibi Adına Onayla
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 8: Tamamlama, PDF & Doğrudan Görsel QR Kod */}
      {currentStep === 8 && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
          <CardHeader className="p-5 border-b border-[#dddddd]">
            <CardTitle className="text-[16px] font-bold text-[#222222] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              8. Teslimat Tutanak Kaydı Tamamlandı
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-6">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <span className="font-bold block mb-1">Tutanak Başarıyla Arşivlendi</span>
              Bu teslimat kaydı, sisteme girilen {rooms.length} oda ve {totalPhotosCount} adet görsel kanıt ile birlikte güvenli biçimde mühürlendi.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* PDF İndirme Kartı */}
              <div className="p-5 rounded-xl border border-[#dddddd] bg-[#f7f7f7] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#222222] text-sm">
                    <Download className="size-4 text-[#ff385c]" />
                    Resmi Teslim Tutanağı (PDF)
                  </div>
                  <p className="text-xs text-[#717171] leading-relaxed">
                    Tüm oda durumlarını, sayaç okumalarını, anahtar sayılarını ve onay dökümünü içeren eksiksiz teslim belgesi.
                  </p>
                </div>
                <a href={`/api/handovers/${propertyId}/pdf`} download={`tutanak-${propertyId}.pdf`}>
                  <Button size="sm" className="w-full bg-[#222222] hover:bg-black text-white gap-2 h-9 text-xs font-semibold rounded-lg shadow-xs">
                    <Download className="size-3.5" /> PDF Tutanağını İndir
                  </Button>
                </a>
              </div>

              {/* Karekod Doğrulama Kartı */}
              <div className="p-5 rounded-xl border border-[#dddddd] bg-[#f7f7f7] flex flex-col items-center justify-between text-center space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 font-bold text-[#222222] text-sm">
                    <QrCode className="size-4 text-[#ff385c]" />
                    Dijital Doğrulama Karekodu
                  </div>
                  <p className="text-[11px] text-[#717171]">
                    Telefon kamerasıyla okutarak belgenin orijinalliğini doğrulayabilirsiniz.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#dddddd] shadow-xs">
                  <QRCodeSVG 
                    value={verifyLink} 
                    size={110}
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <Link href={`/verify/${activeToken}`} className="w-full">
                  <Button size="sm" variant="outline" className="w-full gap-1.5 h-8 text-xs font-semibold border-[#dddddd] text-[#222222] hover:bg-white">
                    <Eye className="size-3.5" /> Doğrulama Sayfasını Gör
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[#dddddd]">
        <Button
          variant="outline"
          size="sm"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="gap-1.5 h-9 text-[13px] font-medium border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7] rounded-lg px-4"
        >
          <ArrowLeft className="size-3.5" /> Önceki Adım
        </Button>

        {currentStep < totalSteps ? (
          <Button
            size="sm"
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 h-9 text-[14px] font-medium px-5 rounded-lg shadow-sm"
          >
            Sonraki Adım <ArrowRight className="size-3.5" />
          </Button>
        ) : (
          <Link href="/handovers">
            <Button size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white h-9 text-[14px] font-medium px-5 rounded-lg shadow-sm">
              Teslimatı Bitir ve Tutanaklara Dön
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function HandoverWizardPageClient() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-slate-500">Yükleniyor...</div>}>
      <WizardInner />
    </Suspense>
  )
}
