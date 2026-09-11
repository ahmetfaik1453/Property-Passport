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

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params?.id as string || 'prop-1'

  const property = {
    id,
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
      { name: 'Salon', photos: 5, status: 'Kusursuz', notes: 'Lamine parke temiz, boya yeni.' },
      { name: 'Mutfak', photos: 4, status: 'İyi', notes: 'Ankastre fırın ve ocak faal.' },
      { name: 'Yatak Odası', photos: 3, status: 'Küçük Çizik', notes: 'Kapı pervazında yüzeysel çizik.' },
      { name: 'Banyo', photos: 3, status: 'Kusursuz', notes: 'Armatürler ve duşakabin sağlam.' },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Vaillant EcoTEC', status: 'Faal' },
      { name: 'Buzdolabı', brand: 'Siemens NoFrost', status: 'Faal' },
      { name: 'Klima', brand: 'Daikin Inverter', status: 'Faal' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-892102', value: '1428.5 kWh' },
      { type: 'Su', no: 'SU-441209', value: '382.1 m³' },
      { type: 'Doğalgaz', no: 'GAZ-991283', value: '219.0 m³' },
    ],
    handovers: [
      {
        id: 'ho-101',
        type: 'Giriş Teslimatı (Move-In)',
        date: '11 Eylül 2026',
        tenant: 'Ahmet Yılmaz',
        status: 'Onaylandı & Arşivlendi',
        token: 'demo-token-1',
      },
      {
        id: 'ho-094',
        type: 'Çıkış Teslimatı (Move-Out)',
        date: '15 Ağustos 2025',
        tenant: 'Burak Sergen',
        status: 'Tamamlandı',
        token: 'demo-token-prev',
      },
    ]
  }

  return (
    <div className="w-full space-y-6">
      {/* Navigation and Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-slate-500">
              <ArrowLeft className="size-3.5" /> Portföye Dön
            </Button>
          </Link>
          <div className="h-4 w-px bg-slate-300" />
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold">
            Aktif Kirada
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/handovers/new?property_id=${property.id}`}>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 h-8 text-xs font-semibold px-3 shadow-xs">
              <Plus className="size-3.5" /> Yeni Teslimat Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-xs bg-white">
            <CardHeader className="p-5 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold text-slate-900 leading-snug">{property.title}</h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-slate-400 shrink-0" />
                  {property.address}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Oda Tipi</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{property.room_count}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kullanım Alanı</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Bulunduğu Kat</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{property.floor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kapı / No</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{property.unit_number}</span>
                </div>
              </div>

              {/* Room Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Kayıtlı Odalar ve Fiziksel Durum
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.rooms.map((room, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white flex items-start justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-900">{room.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{room.notes}</div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] shrink-0 font-medium">
                        {room.photos} Foto
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meter and Inventories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Sayaç Endeksleri
                  </h4>
                  <div className="space-y-2">
                    {property.meters.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">{m.type} ({m.no})</span>
                        <span className="font-bold text-slate-900">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Kayıtlı Demirbaşlar
                  </h4>
                  <div className="space-y-2">
                    {property.inventories.map((inv, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">{inv.name}</span>
                        <span className="font-semibold text-slate-800">{inv.brand}</span>
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
          {/* Parties Card */}
          <Card className="border-slate-200 shadow-xs bg-white">
            <CardHeader className="p-4 border-b border-slate-100">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Yetkili Taraflar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Aktif Kiracı</span>
                <span className="font-bold text-slate-900 block mt-0.5">{property.active_tenant}</span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">{property.tenant_phone}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Mülk Sahibi</span>
                <span className="font-bold text-slate-900 block mt-0.5">{property.landlord}</span>
                <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">{property.landlord_phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Handover History */}
          <Card className="border-slate-200 shadow-xs bg-white">
            <CardHeader className="p-4 border-b border-slate-100">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Teslimat Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs">
              {property.handovers.map((h) => (
                <div key={h.id} className="p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{h.type}</span>
                    <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200">
                      Doğrulandı
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{h.date} &bull; {h.tenant}</span>
                    <Link href={`/verify/${h.token}`} className="text-slate-900 hover:underline inline-flex items-center gap-0.5 font-medium">
                      QR <ExternalLink className="size-2.5" />
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
