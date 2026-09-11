import Link from 'next/link'
import { Building2, Plus, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PropertiesPage() {
  const sampleProperties = [
    {
      id: 'prop-1',
      title: 'Nidapark Küçükyalı A Blok',
      city: 'İstanbul',
      district: 'Maltepe',
      neighborhood: 'Küçükyalı',
      unit_number: 'Daire 14',
      room_count: '2+1',
      area_m2: 95,
      status: 'ACTIVE',
      active_tenant: 'Ahmet Yılmaz',
      last_handover: '11 Eylül 2026',
    },
    {
      id: 'prop-2',
      title: 'Vadi İstanbul Park 2. Kısım',
      city: 'İstanbul',
      district: 'Sarıyer',
      neighborhood: 'Ayazağa',
      unit_number: 'Daire 42',
      room_count: '3+1',
      area_m2: 145,
      status: 'ACTIVE',
      active_tenant: 'Mehmet Demir',
      last_handover: '15 Ağustos 2026',
    },
    {
      id: 'prop-3',
      title: 'Batışehir Premium Rezidans',
      city: 'İstanbul',
      district: 'Bağcılar',
      neighborhood: 'Göztepe',
      unit_number: 'Daire 110',
      room_count: '1+1',
      area_m2: 68,
      status: 'ACTIVE',
      active_tenant: 'Selin Kaya',
      last_handover: '20 Temmuz 2026',
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Mülk Portföyü</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ajansınıza ait tüm taşınmazlar, aktif kiracılar ve teslimat geçmişi
          </p>
        </div>
        <Link href="/properties/new">
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 h-9 text-xs">
            <Plus className="size-3.5" /> Yeni Mülk Ekle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleProperties.map((property) => (
          <Card key={property.id} className="shadow-none border-slate-200 flex flex-col justify-between">
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="size-3" />
                    {property.district}, {property.city}
                  </p>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                  Aktif
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Oda & Alan:</span>
                  <span className="font-medium text-slate-800">{property.room_count} / {property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kapı No:</span>
                  <span className="font-medium text-slate-800">{property.unit_number}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mevcut Kiracı:</span>
                  <span className="font-medium text-slate-800 truncate block">{property.active_tenant}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Son Teslim:</span>
                  <span className="font-medium text-slate-800">{property.last_handover}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Link href={`/handovers/new?property_id=${property.id}`}>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Teslim Başlat
                  </Button>
                </Link>
                <Link href={`/properties/${property.id}`}>
                  <Button size="sm" className="bg-slate-900 text-white h-8 text-xs gap-1">
                    Detaylar <ArrowRight className="size-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
