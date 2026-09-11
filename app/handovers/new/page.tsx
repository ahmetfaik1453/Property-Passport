'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, Users, FileCheck, Camera, Layers, Gauge, KeyRound, 
  CheckCircle2, ArrowRight, ArrowLeft, Upload, Check, AlertCircle, QrCode, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export default function HandoverWizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

  // Handover state
  const [handoverType, setHandoverType] = useState<'MOVE_IN' | 'MOVE_OUT'>('MOVE_IN')
  const [selectedProperty, setSelectedProperty] = useState('Nidapark Küçükyalı A Blok D:14')
  const [landlordName, setLandlordName] = useState('Ali Kaya')
  const [tenantName, setTenantName] = useState('Ahmet Yılmaz')

  // Odalar
  const [rooms, setRooms] = useState([
    {
      id: 'r1',
      name: 'Salon',
      condition: 'GOOD',
      notes: 'Zemin ve duvarlar temiz, batı cephesi boyası yeni.',
      photos: 4,
    },
    {
      id: 'r2',
      name: 'Mutfak',
      condition: 'GOOD',
      notes: 'Tezgah ve dolap kapakları sağlam, evye çalışır durumda.',
      photos: 3,
    },
    {
      id: 'r3',
      name: 'Yatak Odası',
      condition: 'SCRATCHED',
      notes: 'Giriş kapısı arkasında süpürgelikte küçük çizik mevcut.',
      photos: 2,
    },
    {
      id: 'r4',
      name: 'Banyo / WC',
      condition: 'GOOD',
      notes: 'Duşakabin ve armatürler kusursuz, sızıntı yok.',
      photos: 2,
    }
  ])

  // Demirbaşlar
  const [inventories, setInventories] = useState([
    { name: 'Kombi', brand: 'Vaillant', model: 'EcoTEC 24kW', condition: 'GOOD' },
    { name: 'Buzdolabı', brand: 'Siemens', model: 'NoFrost XXL', condition: 'GOOD' },
    { name: 'Klima', brand: 'Daikin', model: '12.000 BTU Inverter', condition: 'GOOD' },
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
    { type: 'Bina Dış Giriş Anahtarı / Çip', count: 2 },
    { type: 'Posta Kutusu Anahtarı', count: 1 },
  ])

  // Onaylar
  const [agentApproved, setAgentApproved] = useState(true)
  const [tenantApproved, setTenantApproved] = useState(false)
  const [landlordApproved, setLandlordApproved] = useState(false)

  const stepsList = [
    { num: 1, label: 'Mülk & Taraflar' },
    { num: 2, label: 'Oda Denetimi' },
    { num: 3, label: 'Görsel Kanıtlar' },
    { num: 4, label: 'Demirbaşlar' },
    { num: 5, label: 'Sayaçlar & Anahtarlar' },
    { num: 6, label: 'İnceleme & Özet' },
    { num: 7, label: 'Dijital Onay' },
    { num: 8, label: 'Rapor & QR' },
  ]

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {/* Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Saha Teslimat Sihirbazı (V1 MVP)
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Taşınmaz Teslim Tutanak Kaydı
          </h1>
        </div>

        {/* Step Counter */}
        <div className="text-xs font-medium text-slate-500">
          Adım <span className="text-slate-900 font-bold text-sm">{currentStep}</span> / {totalSteps}
        </div>
      </div>

      {/* Steps Navigation Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 p-1 bg-slate-200/60 rounded-xl">
        {stepsList.map((step) => (
          <button
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all ${
              currentStep === step.num
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : currentStep > step.num
                ? 'text-slate-700 bg-slate-100/80 hover:bg-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="block text-[10px] opacity-60">0{step.num}</span>
            <span className="truncate block">{step.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: Mülk ve Taraflar */}
      {currentStep === 1 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="size-4 text-blue-600" />
              1. Teslim Türü, Mülk ve Taraf Seçimi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-700">Teslim Türü</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setHandoverType('MOVE_IN')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    handoverType === 'MOVE_IN'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-semibold text-slate-900 text-sm">Giriş Teslimatı (Move-In)</p>
                  <p className="text-xs text-slate-500 mt-1">Kiracının mülke taşınma anındaki durumu</p>
                </button>

                <button
                  type="button"
                  onClick={() => setHandoverType('MOVE_OUT')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    handoverType === 'MOVE_OUT'
                      ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-semibold text-slate-900 text-sm">Çıkış Teslimatı (Move-Out)</p>
                  <p className="text-xs text-slate-500 mt-1">Kira bitiminde mülkün iade teslim durumu</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Taşınmaz (Mülk)</label>
              <Input value={selectedProperty} readOnly className="bg-slate-50 text-xs h-9" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Mülk Sahibi (Landlord)</label>
                <Input value={landlordName} onChange={(e) => setLandlordName(e.target.value)} className="text-xs h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Kiracı (Tenant)</label>
                <Input value={tenantName} onChange={(e) => setTenantName(e.target.value)} className="text-xs h-9" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Oda Denetimi */}
      {currentStep === 2 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileCheck className="size-4 text-blue-600" />
              2. Oda Bazlı Fiziksel Durum Kontrolleri
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {rooms.map((room) => (
              <div key={room.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-900">{room.name}</h4>
                  <select
                    value={room.condition}
                    onChange={(e) => {
                      const updated = rooms.map((r) => r.id === room.id ? { ...r, condition: e.target.value } : r)
                      setRooms(updated)
                    }}
                    className="text-xs font-semibold rounded-lg border border-slate-200 px-2 py-1 bg-slate-50 text-slate-800"
                  >
                    <option value="GOOD">Kusursuz / İyi</option>
                    <option value="USED">Kullanılmış / Normal</option>
                    <option value="SCRATCHED">Çizik / Yıpranmış</option>
                    <option value="DAMAGED">Hasarlı</option>
                    <option value="REQUIRES_ATTENTION">Onarım Gerektirir</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-slate-500 font-medium">Oda İnceleme Notu</label>
                  <Input
                    value={room.notes}
                    onChange={(e) => {
                      const updated = rooms.map((r) => r.id === room.id ? { ...r, notes: e.target.value } : r)
                      setRooms(updated)
                    }}
                    className="text-xs h-8"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* STEP 3: Kanıt Yükleme */}
      {currentStep === 3 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Camera className="size-4 text-blue-600" />
              3. Odaya Bağlı Fotoğraf & Video Kanıtları
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-xs text-slate-500">
              Her fotoğraf ilgili odayla ilişkilendirilerek Supabase Private Evidence Bucket&apos;ına güvenle kaydedilir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-slate-900">{room.name}</span>
                      <Badge variant="outline">{room.photos} Fotoğraf</Badge>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{room.notes}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700">
                      <Upload className="size-3.5" /> Fotoğraf Yükle (Kamera)
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={() => {
                          alert(`${room.name} için fotoğraf eklendi!`)
                          setRooms(rooms.map(r => r.id === room.id ? { ...r, photos: r.photos + 1 } : r))
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: Demirbaşlar */}
      {currentStep === 4 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="size-4 text-blue-600" />
              4. Taşınmaz Demirbaş Envanteri
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {inventories.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.brand} - {item.model}</p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Çalışır / Sağlam</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* STEP 5: Sayaçlar ve Anahtarlar */}
      {currentStep === 5 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gauge className="size-4 text-blue-600" />
              5. Sayaç Değerleri & Teslim Edilen Anahtarlar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Sayaç Okumaları</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {meters.map((meter, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <p className="text-xs text-slate-500">{meter.type} ({meter.number})</p>
                    <p className="text-base font-bold text-slate-900 mt-1">
                      {meter.value} <span className="text-xs font-normal text-slate-600">{meter.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Anahtar Teslimatı</h4>
              <div className="flex flex-col gap-2">
                {keys.map((k, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">{k.type}</span>
                    <Badge variant="secondary">{k.count} Adet</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 6: İnceleme ve Özet */}
      {currentStep === 6 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="size-4 text-emerald-600" />
              6. Teslimat Öncesi Özet ve Kontrol Listesi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div>
                <p className="text-xs text-slate-500">Denetlenen Oda</p>
                <p className="text-xl font-bold text-slate-900">{rooms.length}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Toplam Kanıt</p>
                <p className="text-xl font-bold text-slate-900">
                  {rooms.reduce((acc, r) => acc + r.photos, 0)} Foto
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Kayıtlı Demirbaş</p>
                <p className="text-xl font-bold text-slate-900">{inventories.length}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Sayaç / Anahtar</p>
                <p className="text-xl font-bold text-slate-900">3 / 6 Adet</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs text-emerald-900 flex items-center gap-2">
              <Check className="size-4 text-emerald-600 shrink-0" />
              <span>Tüm kritik odalar ve sayaçlar kontrol edildi. Tutanak tarafların onayına hazır.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 7: Dijital Onay Akışı */}
      {currentStep === 7 && (
        <Card className="shadow-none border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-blue-600" />
              7. Tarafların Dijital Onay Akışı
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-xs text-slate-500">
              Bu onaylar sistem içi beyan ve mutabakat amaçlıdır (Resmi nitelikli e-imza değildir).
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Emlak Danışmanı (Yetkili)</p>
                <p className="text-xs text-slate-500">Prestij Gayrimenkul</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Onaylandı (11 Eylül 2026)</Badge>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Kiracı: {tenantName}</p>
                <p className="text-xs text-slate-500">Teslim durumunu kabul eder</p>
              </div>
              {tenantApproved ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Onaylandı</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setTenantApproved(true)} className="h-8 text-xs">
                  Kiracı Adına Onayla (Demo)
                </Button>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Mülk Sahibi: {landlordName}</p>
                <p className="text-xs text-slate-500">Teslim durumunu kabul eder</p>
              </div>
              {landlordApproved ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Onaylandı</Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setLandlordApproved(true)} className="h-8 text-xs">
                  Mülk Sahibi Adına Onayla (Demo)
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 8: Tamamlama, PDF & QR Doğrulama */}
      {currentStep === 8 && (
        <Card className="border-emerald-200 bg-emerald-50/20 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-emerald-950">
              <CheckCircle2 className="size-5 text-emerald-600" />
              8. Teslimat Başarıyla Tamamlandı ve Kilitlendi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-xs text-slate-600">
              Tutanak değiştirilemez biçimde arşivlendi. Değişiklikler yalnızca audit log üzerinde izlenebilir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Download className="size-4 text-blue-600" />
                  Dijital Teslim Raporu (PDF)
                </div>
                <p className="text-xs text-slate-500">
                  Tüm oda fotoğraflarını, sayaç değerlerini ve onay dökümünü içeren resmi B2B teslim belgesi.
                </p>
                <Link href="/api/handovers/ho-101/pdf" target="_blank">
                  <Button size="sm" className="w-full bg-slate-900 text-white gap-2 h-8 text-xs">
                    <Download className="size-3.5" /> PDF Tutanağını İndir
                  </Button>
                </Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <QrCode className="size-4 text-purple-600" />
                  Kamuya Açık QR Doğrulama
                </div>
                <p className="text-xs text-slate-500">
                  PII (kişisel veri) içermeyen güvenli doğrulama linki ve QR kodu.
                </p>
                <Link href="/verify/demo-token-1">
                  <Button size="sm" variant="outline" className="w-full gap-2 h-8 text-xs">
                    <QrCode className="size-3.5" /> Doğrulama Sayfasını Aç
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          size="sm"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          className="gap-1.5 h-9 text-xs"
        >
          <ArrowLeft className="size-3.5" /> Önceki Adım
        </Button>

        {currentStep < totalSteps ? (
          <Button
            size="sm"
            onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
            className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 h-9 text-xs"
          >
            Sonraki Adım <ArrowRight className="size-3.5" />
          </Button>
        ) : (
          <Link href="/dashboard">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-xs">
              Teslimatı Bitir ve Paneline Dön
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
