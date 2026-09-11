'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Plus, 
  MapPin, 
  ArrowRight, 
  Search, 
  Filter, 
  Layers, 
  User, 
  Calendar,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

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
      total_handovers: 3,
      verified: true,
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
      total_handovers: 2,
      verified: true,
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
      total_handovers: 1,
      verified: true,
    },
    {
      id: 'prop-4',
      title: 'Zorlu Center Terrazze',
      city: 'İstanbul',
      district: 'Beşiktaş',
      neighborhood: 'Levazım',
      unit_number: 'Rezidans T-4',
      room_count: '3+1',
      area_m2: 210,
      status: 'IDLE',
      active_tenant: 'Boşta (Teslime Hazır)',
      last_handover: '02 Haziran 2026',
      total_handovers: 4,
      verified: true,
    },
    {
      id: 'prop-5',
      title: 'Büyükyalı Fişekhane Suites',
      city: 'İstanbul',
      district: 'Zeytinburnu',
      neighborhood: 'Kazlıçeşme',
      unit_number: 'Daire B-18',
      room_count: '2+1',
      area_m2: 112,
      status: 'ACTIVE',
      active_tenant: 'Canan Özdemir',
      last_handover: '18 Mayıs 2026',
      total_handovers: 2,
      verified: true,
    },
    {
      id: 'prop-6',
      title: 'Sinpaş Finans Şehir',
      city: 'İstanbul',
      district: 'Ümraniye',
      neighborhood: 'Finanskent',
      unit_number: 'Kule 2 D:88',
      room_count: '1+1',
      area_m2: 74,
      status: 'ACTIVE',
      active_tenant: 'Emre Çetin',
      last_handover: '10 Nisan 2026',
      total_handovers: 1,
      verified: true,
    },
  ]

  const filtered = sampleProperties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.active_tenant.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (statusFilter === 'ALL') return matchesSearch
    return matchesSearch && p.status === statusFilter
  })

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Mülk Portföyü</h1>
            <Badge variant="secondary" className="text-xs font-semibold">
              {sampleProperties.length} Taşınmaz
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ajansınıza kayıtlı taşınmazlar, oda dökümleri, kiracı geçmişi ve kanıt tutanakları
          </p>
        </div>

        <Link href="/properties/new">
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-9 text-xs font-semibold px-3.5 shadow-xs">
            <Plus className="size-3.5" /> Yeni Mülk Ekle
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
          <Input 
            placeholder="Proje adı, ilçe veya kiracı ara..." 
            className="pl-9 h-8 text-xs bg-slate-50/75 border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={statusFilter === 'ALL' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('ALL')}
            className={`h-8 text-xs px-3 ${statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Tümü
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'ACTIVE' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('ACTIVE')}
            className={`h-8 text-xs px-3 ${statusFilter === 'ACTIVE' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Kirada ({sampleProperties.filter(x => x.status === 'ACTIVE').length})
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'IDLE' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('IDLE')}
            className={`h-8 text-xs px-3 ${statusFilter === 'IDLE' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Boşta ({sampleProperties.filter(x => x.status === 'IDLE').length})
          </Button>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((property) => (
          <Card key={property.id} className="border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between bg-white">
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1 leading-snug">
                    {property.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="size-3 text-slate-400 shrink-0" />
                    {property.neighborhood}, {property.district} / {property.city}
                  </p>
                </div>
                {property.status === 'ACTIVE' ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold shrink-0">
                    Dolu
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[11px] font-semibold shrink-0">
                    Boşta
                  </Badge>
                )}
              </div>

              {/* Property Attributes Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-100 text-xs bg-slate-50/50 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[11px]">Tip & Metrekare</span>
                  <span className="font-semibold text-slate-800">{property.room_count} &bull; {property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kapı / Daire No</span>
                  <span className="font-semibold text-slate-800">{property.unit_number}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Aktif Kiracı</span>
                  <span className="font-medium text-slate-800 truncate block">{property.active_tenant}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Son Teslim Tarihi</span>
                  <span className="font-medium text-slate-800">{property.last_handover}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <Link href={`/handovers/new?property_id=${property.id}`}>
                  <Button size="sm" variant="outline" className="h-8 text-xs font-semibold border-slate-200 hover:bg-slate-100">
                    Teslim Başlat
                  </Button>
                </Link>
                <Link href={`/properties/${property.id}`}>
                  <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white h-8 text-xs font-semibold gap-1 px-3">
                    Detaylar <ArrowRight className="size-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-6">
          <Building2 className="size-8 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">Aramaya uygun taşınmaz bulunamadı</h3>
          <p className="text-xs text-slate-500 mt-1">Filtreleri temizleyebilir veya yeni bir mülk ekleyebilirsiniz.</p>
        </div>
      )}
    </div>
  )
}
