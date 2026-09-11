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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mülk Portföyü</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ajansınıza ait tüm taşınmazlar, aktif kiracılar ve teslimat geçmişi
          </p>
        </div>
        <Link href="/properties/new">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" /> Yeni Mülk Ekle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProperties.map((property) => (
          <Card key={property.id} className="hover:border-slate-300 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.district}, {property.city}
                  </p>
                </div>
                <Badge variant="success">Aktif</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block">Oda & Alan:</span>
                  <span className="font-medium text-slate-800">{property.room_count} / {property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Kapı No:</span>
                  <span className="font-medium text-slate-800">{property.unit_number}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mevcut Kiracı:</span>
                  <span className="font-medium text-slate-800">{property.active_tenant}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Son Teslim:</span>
                  <span className="font-medium text-slate-800">{property.last_handover}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <Link href={`/handovers/new?property_id=${property.id}`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    Teslim Başlat
                  </Button>
                </Link>
                <Link href={`/properties/${property.id}`}>
                  <Button size="sm" className="bg-slate-900 text-xs gap-1">
                    Detaylar <ArrowRight className="w-3 h-3" />
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
