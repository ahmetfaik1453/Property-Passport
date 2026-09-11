'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Building2, 
  MapPin, 
  ArrowLeft, 
  Plus, 
  FileText, 
  Users, 
  Layers, 
  Gauge, 
  KeyRound, 
  Camera, 
  CheckCircle2, 
  Calendar,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const propertyDataStore: { [key: string]: any } = {
  'prop-1': {
    title: 'Nidapark Küçükyalı A Blok D:14',
    city: 'İstanbul',
    district: 'Maltepe',
    neighborhood: 'Küçükyalı',
    address: 'Çınar Mah. Kadir Has Cad. No: 18 A Blok D:14 Maltepe / İstanbul',
    unit_number: 'Daire 14',
    floor: '3. Kat',
    room_count: '2+1',
    area_m2: 95,
    status: 'ACTIVE',
    active_tenant: 'Ahmet Yılmaz',
    tenant_phone: '0532 441 20 18',
    landlord: 'Ali Kaya',
    landlord_phone: '0533 992 14 50',
    rooms: [
      { name: 'Salon', photos: 5, notes: 'Lamine parke temiz, batı cephesi boyası yeni.' },
      { name: 'Mutfak', photos: 4, notes: 'Ankastre fırın ve ocak faal, tezgah sağlam.' },
      { name: 'Yatak Odası', photos: 3, notes: 'Kapı pervazında yüzeysel çizik mevcut.' },
      { name: 'Banyo', photos: 3, notes: 'Armatürler ve duşakabin sağlam, sızıntı yok.' },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Vaillant EcoTEC 24kW' },
      { name: 'Buzdolabı', brand: 'Siemens NoFrost XXL' },
      { name: 'Klima', brand: 'Daikin Inverter 12000' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-892102', value: '1428.5 kWh' },
      { type: 'Su', no: 'SU-441209', value: '382.1 m³' },
      { type: 'Doğalgaz', no: 'GAZ-991283', value: '219.0 m³' },
    ],
    handovers: [
      { id: 'ho-101', type: 'Giriş Teslimatı (Move-In)', date: '11 Eylül 2026', tenant: 'Ahmet Yılmaz', token: 'demo-token-1' },
      { id: 'ho-094', type: 'Çıkış Teslimatı (Move-Out)', date: '15 Ağustos 2025', tenant: 'Burak Sergen', token: 'demo-token-prev' },
    ]
  },
  'prop-2': {
    title: 'Vadi İstanbul Park 2. Kısım D:42',
    city: 'İstanbul',
    district: 'Sarıyer',
    neighborhood: 'Ayazağa',
    address: 'Ayazağa Mah. Cendere Cad. Vadi Park Sit. D:42 Sarıyer / İstanbul',
    unit_number: 'Daire 42',
    floor: '7. Kat',
    room_count: '3+1',
    area_m2: 145,
    status: 'ACTIVE',
    active_tenant: 'Mehmet Demir',
    tenant_phone: '0535 882 19 40',
    landlord: 'Fatma Şahin',
    landlord_phone: '0544 112 33 44',
    rooms: [
      { name: 'Geniş Salon', photos: 6, notes: 'Masif parke cilası yeni, balkon kapısı çift cam.' },
      { name: 'Ada Mutfak', photos: 5, notes: 'Franke ada davlumbaz ve bulaşık makinesi dahil.' },
      { name: 'Ebeveyn Yatak Odası', photos: 4, notes: 'Giyinme odası dolapları kusursuz.' },
      { name: 'Çocuk Odası', photos: 3, notes: 'Duvar kağıdı sağlam, prizler korumalı.' },
      { name: 'Ebeveyn Banyosu', photos: 3, notes: 'Jakuzili küvet ve Geberit gömme rezervuar.' },
    ],
    inventories: [
      { name: 'Merkezi Pay Ölçer', brand: 'Siemens Qundis' },
      { name: 'Ankastre Bulaşık Makinesi', brand: 'Franke Pro' },
      { name: 'Salon VRF Klima', brand: 'Mitsubishi Electric' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-334190', value: '4192.0 kWh' },
      { type: 'Su', no: 'SU-778901', value: '891.4 m³' },
      { type: 'Isı Pay Ölçer', no: 'PAY-11029', value: '741.0 MWh' },
    ],
    handovers: [
      { id: 'ho-102', type: 'Çıkış Teslimatı (Move-Out)', date: '10 Eylül 2026', tenant: 'Mehmet Demir', token: 'demo-token-vadi' },
    ]
  },
  'prop-3': {
    title: 'Batışehir Premium Rezidans D:110',
    city: 'İstanbul',
    district: 'Bağcılar',
    neighborhood: 'Göztepe',
    address: 'Göztepe Mah. İstoç Yolu Batışehir Sit. Kule 3 D:110 Bağcılar / İstanbul',
    unit_number: 'Daire 110',
    floor: '11. Kat',
    room_count: '1+1',
    area_m2: 68,
    status: 'ACTIVE',
    active_tenant: 'Selin Kaya',
    tenant_phone: '0542 331 90 12',
    landlord: 'Kemal Sunal',
    landlord_phone: '0532 555 44 33',
    rooms: [
      { name: 'Amerikan Mutfaklı Salon', photos: 4, notes: 'Spot aydınlatmalar çalışır, zemin granit seramik.' },
      { name: 'Yatak Odası', photos: 3, notes: 'Gömme gardırop rayları düzgün çalışıyor.' },
      { name: 'Hilton Banyo', photos: 2, notes: 'Havalandırma aspiratörü ve duş kabini sağlam.' },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Demirdöküm Nitromix' },
      { name: 'Mikrodalga Fırın', brand: 'Samsung Smart' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-667120', value: '982.1 kWh' },
      { type: 'Su', no: 'SU-220194', value: '184.2 m³' },
      { type: 'Doğalgaz', no: 'GAZ-550192', value: '92.4 m³' },
    ],
    handovers: [
      { id: 'ho-103', type: 'Giriş Teslimatı (Move-In)', date: '08 Eylül 2026', tenant: 'Selin Kaya', token: 'demo-token-bati' },
    ]
  },
  'prop-4': {
    title: 'Zorlu Center Terrazze D:T-4',
    city: 'İstanbul',
    district: 'Beşiktaş',
    neighborhood: 'Levazım',
    address: 'Levazım Mah. Koru Sok. Zorlu Center Terrazze Evleri D:T-4 Beşiktaş / İstanbul',
    unit_number: 'Rezidans T-4',
    floor: '4. Kat',
    room_count: '3+1',
    area_m2: 210,
    status: 'IDLE',
    active_tenant: 'Boşta (Teslime Hazır)',
    tenant_phone: '-',
    landlord: 'Hasan Yılmaz',
    landlord_phone: '0533 111 22 33',
    rooms: [
      { name: 'Boğaz Manzaralı Salon', photos: 8, notes: 'Akıllı ev otomasyon paneli faal, teras zemin kaplama kusursuz.' },
      { name: 'Gourmet Mutfak', photos: 6, notes: 'Gaggenau tam set ankastre cihazlar test edildi.' },
      { name: 'Master Süit', photos: 5, notes: 'Özel tasarım giyinme odası ve banyo.' },
    ],
    inventories: [
      { name: 'Akıllı Ev Merkezi Ünitesi', brand: 'Crestron Automation' },
      { name: 'Şarap Soğutucu', brand: 'Gaggenau Vario' },
      { name: 'Tavan Tipi İklimlendirme', brand: 'Daikin VRV IV' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-009182', value: '8841.0 kWh' },
      { type: 'Su', no: 'SU-991204', value: '1410.5 m³' },
      { type: 'Isı Pay', no: 'PAY-44912', value: '1280.0 MWh' },
    ],
    handovers: [
      { id: 'ho-104', type: 'Çıkış Teslimatı (Move-Out)', date: '01 Eylül 2026', tenant: 'Murat Arslan', token: 'demo-token-zorlu' },
    ]
  },
  'prop-5': {
    title: 'Büyükyalı Fişekhane Suites D:B-18',
    city: 'İstanbul',
    district: 'Zeytinburnu',
    neighborhood: 'Kazlıçeşme',
    address: 'Kazlıçeşme Mah. Kennedy Cad. Büyükyalı Sit. B Blok D:18 Zeytinburnu / İstanbul',
    unit_number: 'Daire B-18',
    floor: '2. Kat',
    room_count: '2+1',
    area_m2: 112,
    status: 'ACTIVE',
    active_tenant: 'Canan Özdemir',
    tenant_phone: '0535 777 66 55',
    landlord: 'Mustafa Aydın',
    landlord_phone: '0542 000 11 22',
    rooms: [
      { name: 'Yüksek Tavanlı Salon', photos: 5, notes: 'Tarihi tuğla doku korunmuş, zemin meşe parke.' },
      { name: 'Açık Mutfak', photos: 4, notes: 'Miele ankastre fırın ve ada masa.' },
      { name: 'Geniş Yatak Odası', photos: 3, notes: 'Deniz manzaralı balkon çıkışı.' },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Viessmann Vitodens' },
      { name: 'Klima', brand: 'Mitsubishi Heavy' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-441829', value: '2319.4 kWh' },
      { type: 'Su', no: 'SU-551029', value: '448.0 m³' },
      { type: 'Doğalgaz', no: 'GAZ-881290', value: '312.8 m³' },
    ],
    handovers: [
      { id: 'ho-105', type: 'Giriş Teslimatı (Move-In)', date: '18 Mayıs 2026', tenant: 'Canan Özdemir', token: 'demo-token-buyuk' },
    ]
  },
  'prop-6': {
    title: 'Sinpaş Finans Şehir Kule 2 D:88',
    city: 'İstanbul',
    district: 'Ümraniye',
    neighborhood: 'Finanskent',
    address: 'Finanskent Mah. Finans Cad. Sinpaş Finans Şehir Kule 2 D:88 Ümraniye / İstanbul',
    unit_number: 'Kule 2 D:88',
    floor: '14. Kat',
    room_count: '1+1',
    area_m2: 74,
    status: 'ACTIVE',
    active_tenant: 'Emre Çetin',
    tenant_phone: '0544 333 22 11',
    landlord: 'Ahmet Faik Özsoy',
    landlord_phone: '0532 123 45 67',
    rooms: [
      { name: 'Kompakt Salon', photos: 4, notes: 'Şehir manzaralı Fransız balkon, laminant zemin temiz.' },
      { name: 'Mutfak Nişi', photos: 3, notes: 'Siemens ikili indüksiyonlu ocak ve aspiratör.' },
      { name: 'Yatak Odası', photos: 3, notes: 'Isı yalıtımlı cephe penceresi kusursuz.' },
    ],
    inventories: [
      { name: 'Pay Ölçerli Isıtma', brand: 'Danfoss Eco' },
      { name: 'İnverter Split Klima', brand: 'LG DualCool' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-771890', value: '1104.2 kWh' },
      { type: 'Su', no: 'SU-119283', value: '205.1 m³' },
    ],
    handovers: [
      { id: 'ho-106', type: 'Giriş Teslimatı (Move-In)', date: '10 Nisan 2026', tenant: 'Emre Çetin', token: 'demo-token-prev' },
    ]
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params?.id as string || 'prop-1'

  const property = propertyDataStore[id] || propertyDataStore['prop-1']

  return (
    <div className="w-full space-y-6">
      {/* Navigation and Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#dddddd]">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="h-8 text-[13px] font-medium gap-1.5 text-[#717171] hover:text-[#222222] hover:bg-[#f7f7f7] rounded-lg">
              <ArrowLeft className="size-3.5" /> Portföye Dön
            </Button>
          </Link>
          <div className="h-4 w-px bg-[#dddddd]" />
          <Badge variant="outline" className={`text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${
            property.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-[#fff8f6] text-[#c13515] border-[#ffd1da]'
          }`}>
            {property.status === 'ACTIVE' ? 'Aktif Kirada' : 'Boşta / Müsait'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/handovers/new?property_id=${id}`}>
            <Button size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 h-9 text-[14px] font-medium px-4 rounded-lg shadow-sm">
              <Plus className="size-3.5" /> Yeni Teslimat Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
            <CardHeader className="p-5 border-b border-[#dddddd]">
              <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-[#222222] leading-snug">{property.title}</h1>
                <p className="text-[14px] text-[#717171] flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#ff385c] shrink-0" />
                  {property.address}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f7f7f7] p-4 rounded-xl border border-[#ebebeb] text-[13px]">
                <div>
                  <span className="text-[#717171] block text-[11px]">Oda Tipi</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.room_count}</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Kullanım Alanı</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Bulunduğu Kat</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.floor}</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Kapı / No</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.unit_number}</span>
                </div>
              </div>

              {/* Room Breakdown */}
              <div>
                <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider mb-3">
                  Kayıtlı Odalar ve Fiziksel Durum
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.rooms.map((room: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-[#dddddd] bg-white hover:border-[#222222] transition-colors flex items-start justify-between text-[13px]">
                      <div>
                        <div className="font-semibold text-[#222222]">{room.name}</div>
                        <div className="text-[12px] text-[#717171] mt-0.5">{room.notes}</div>
                      </div>
                      <Badge variant="secondary" className="text-[11px] shrink-0 font-medium bg-[#f7f7f7] text-[#222222] border border-[#dddddd] rounded-full px-2">
                        {room.photos} Foto
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meter and Inventories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider mb-2">
                    Sayaç Endeksleri
                  </h4>
                  <div className="space-y-2">
                    {property.meters.map((m: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg border border-[#dddddd] bg-[#f7f7f7] flex items-center justify-between text-[13px]">
                        <span className="text-[#717171] font-medium">{m.type} ({m.no})</span>
                        <span className="font-bold text-[#222222]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider mb-2">
                    Kayıtlı Demirbaşlar
                  </h4>
                  <div className="space-y-2">
                    {property.inventories.map((inv: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg border border-[#dddddd] bg-[#f7f7f7] flex items-center justify-between text-[13px]">
                        <span className="text-[#717171] font-medium">{inv.name}</span>
                        <span className="font-semibold text-[#222222]">{inv.brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Parties & Handover History */}
        <div className="space-y-6">
          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px]">
            <CardHeader className="p-4 border-b border-[#dddddd]">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider text-[#222222]">
                Yetkili Taraflar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-[13px]">
              <div className="p-3 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
                <span className="text-[11px] text-[#717171] font-medium block">Aktif Kiracı</span>
                <span className="font-bold text-[#222222] block mt-0.5">{property.active_tenant}</span>
                <span className="text-[12px] text-[#717171] font-mono mt-0.5 block">{property.tenant_phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
                <span className="text-[11px] text-[#717171] font-medium block">Mülk Sahibi</span>
                <span className="font-bold text-[#222222] block mt-0.5">{property.landlord}</span>
                <span className="text-[12px] text-[#717171] font-mono mt-0.5 block">{property.landlord_phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px]">
            <CardHeader className="p-4 border-b border-[#dddddd]">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider text-[#222222]">
                Teslimat Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-[13px]">
              {property.handovers.map((h: any) => (
                <div key={h.id} className="p-3 rounded-xl border border-[#dddddd] bg-white hover:border-[#222222] transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#222222]">{h.type}</span>
                    <Badge variant="outline" className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border-emerald-200 rounded-full px-2">
                      Doğrulandı
                    </Badge>
                  </div>
                  <div className="text-[12px] text-[#717171] flex items-center justify-between">
                    <span>{h.date} &bull; {h.tenant}</span>
                    <Link href={`/verify/${h.token}`} className="text-[#222222] hover:text-[#ff385c] hover:underline inline-flex items-center gap-0.5 font-medium">
                      QR <ExternalLink className="size-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
