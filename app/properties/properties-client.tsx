'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Plus, 
  MapPin, 
  ArrowRight, 
  Search,
  Star,
  ShieldCheck
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'

export default function PropertiesPageClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    checkAuth()
  }, [])

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
      statusText: 'Aktif Kirada',
      active_tenant: 'Ahmet Yılmaz',
      last_handover: '11 Eylül 2026',
      total_handovers: 3,
      rating: '4.95',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
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
      statusText: 'Tahliye Tesliminde',
      active_tenant: 'Mehmet Demir',
      last_handover: '15 Ağustos 2026',
      total_handovers: 2,
      rating: '4.88',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
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
      statusText: 'Aktif Kirada',
      active_tenant: 'Selin Kaya',
      last_handover: '20 Temmuz 2026',
      total_handovers: 1,
      rating: '4.92',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
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
      statusText: 'Teslime Hazır',
      active_tenant: 'Boşta (Teslime Hazır)',
      last_handover: '02 Haziran 2026',
      total_handovers: 4,
      rating: '4.99',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
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
      statusText: 'Aktif Kirada',
      active_tenant: 'Canan Özdemir',
      last_handover: '18 Mayıs 2026',
      total_handovers: 2,
      rating: '4.91',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
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
      statusText: 'Aktif Kirada',
      active_tenant: 'Emre Çetin',
      last_handover: '10 Nisan 2026',
      total_handovers: 1,
      rating: '4.86',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const role = user?.user_metadata?.role || (user ? 'AGENT' : 'GUEST')
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''

  const propertiesList = role === 'LANDLORD' 
    ? sampleProperties.slice(0, 2) 
    : sampleProperties

  const filtered = propertiesList.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.active_tenant.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (statusFilter === 'ALL') return matchesSearch
    return matchesSearch && p.status === statusFilter
  })

  return (
    <div className="w-full space-y-8">
      {/* Demo / Örnek Görünüm Bilgilendirme Bannerı (Giriş yapılmadığında) */}
      {!user && (
        <div className="bg-[#fff8f6] border border-[#ffd1da] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-[#ff385c] shrink-0 mt-1 sm:mt-0 animate-pulse" />
            <div>
              <span className="font-bold text-[#222222] text-[13px]">Örnek Teslim Portföyü (Ziyaretçi Görünümü)</span>
              <p className="text-[#717171] mt-0.5">
                Şu anda platformun canlı teslim tutanaklarını ve mülk durum kayıtlarını örnek portföy üzerinden inceliyorsunuz. Kendi acentenizin portföyünü yönetmek için giriş yapabilirsiniz.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/login">
              <button className="h-8 px-3.5 text-xs font-semibold bg-[#222222] hover:bg-black text-white rounded-lg transition-colors">
                Giriş Yap
              </button>
            </Link>
            <Link href="/register">
              <button className="h-8 px-3.5 text-xs font-semibold border border-[#dddddd] hover:bg-white text-[#222222] rounded-lg transition-colors">
                Hesap Oluştur
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ebebeb]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-bold text-[#222222] tracking-tight">
              {role === 'LANDLORD' ? 'Mülklerim' : user ? 'Mülk Portföyü' : 'Örnek Mülk Portföyü'}
            </h1>
            <span className="text-xs bg-[#f7f7f7] text-[#6a6a6a] px-2.5 py-0.5 rounded-full font-semibold border border-[#ebebeb]">
              {propertiesList.length} Taşınmaz
            </span>
            {!user && (
              <span className="text-[11px] bg-[#fff8f6] text-[#c13515] px-2.5 py-0.5 rounded-full font-semibold border border-[#ffd1da]">
                Demo İnceleme
              </span>
            )}
          </div>
          <p className="text-xs text-[#6a6a6a] mt-1">
            {role === 'LANDLORD' 
              ? 'Mülkiyetinizdeki taşınmazlar, güncel kiracılar ve onaylı teslimat durumları'
              : user 
                ? 'Ajansınıza kayıtlı taşınmazlar, oda dökümleri, kiracı geçmişi ve kanıt tutanakları' 
                : 'Doğrulanabilir dijital kanıt modeliyle kayıt altına alınmış örnek taşınmazlar ve teslimat geçmişi'}
          </p>
        </div>

        {role !== 'TENANT' && (
          <Link href="/properties/new">
            <button className="bg-[#ff385c] hover:bg-[#e00b41] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs flex items-center gap-1.5">
              <Plus className="size-3.5" /> Yeni Mülk Ekle
            </button>
          </Link>
        )}
      </div>

      {/* Filter and Search Bar (Airbnb pill aesthetic) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-full border border-[#dddddd] shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
        <div className="relative flex-1 pl-3">
          <Search className="absolute left-4 top-2.5 size-3.5 text-[#6a6a6a]" />
          <input 
            placeholder="Proje adı, ilçe veya kiracı ara..." 
            className="w-full pl-9 h-8 text-xs text-[#222222] placeholder-[#929292] bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 pr-2">
          <button 
            onClick={() => setStatusFilter('ALL')}
            className={`h-8 text-xs px-3.5 rounded-full font-medium transition-colors ${
              statusFilter === 'ALL' ? 'bg-[#222222] text-white' : 'text-[#6a6a6a] hover:bg-[#f7f7f7]'
            }`}
          >
            Tümü
          </button>
          <button 
            onClick={() => setStatusFilter('ACTIVE')}
            className={`h-8 text-xs px-3.5 rounded-full font-medium transition-colors ${
              statusFilter === 'ACTIVE' ? 'bg-[#222222] text-white' : 'text-[#6a6a6a] hover:bg-[#f7f7f7]'
            }`}
          >
            Kirada ({sampleProperties.filter(x => x.status === 'ACTIVE').length})
          </button>
          <button 
            onClick={() => setStatusFilter('IDLE')}
            className={`h-8 text-xs px-3.5 rounded-full font-medium transition-colors ${
              statusFilter === 'IDLE' ? 'bg-[#222222] text-white' : 'text-[#6a6a6a] hover:bg-[#f7f7f7]'
            }`}
          >
            Boşta ({sampleProperties.filter(x => x.status === 'IDLE').length})
          </button>
        </div>
      </div>

      {/* Property Cards Grid — Airbnb photo-first layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((property) => (
          <div 
            key={property.id} 
            className="group flex flex-col justify-between space-y-3 bg-white border border-[#ebebeb] rounded-[14px] p-3 shadow-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
          >
            {/* Photo container with 14px radius */}
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-[#f2f2f2]">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#222222] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                {property.statusText}
              </div>
            </div>

            {/* Meta details */}
            <div className="space-y-1.5 px-1 text-xs">
              <div className="flex items-center justify-between font-bold text-sm text-[#222222]">
                <span className="truncate">{property.title}</span>
                <span className="flex items-center gap-1 font-semibold text-xs shrink-0">
                  <Star className="size-3.5 fill-[#222222] text-[#222222]" /> {property.rating}
                </span>
              </div>
              <p className="text-[#6a6a6a] flex items-center gap-1">
                <MapPin className="size-3 text-[#929292]" /> {property.neighborhood}, {property.district}
              </p>
              <div className="text-[#6a6a6a] font-medium">
                {property.room_count} &bull; {property.area_m2} m² &bull; {property.unit_number}
              </div>
              <div className="text-[#6a6a6a] pt-0.5 flex items-center justify-between border-t border-[#f2f2f2]">
                <span>Kiracı: <strong className="text-[#222222]">{property.active_tenant}</strong></span>
                <span className="text-[#929292] text-[11px]">{property.total_handovers} Tutanak</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2 pt-2 px-1">
              <Link href={`/handovers/new?property_id=${property.id}`} className="flex-1">
                <button className="w-full h-8 text-xs font-semibold text-[#222222] border border-[#dddddd] hover:bg-[#f7f7f7] rounded-lg transition-colors">
                  Teslim Başlat
                </button>
              </Link>
              <Link href={`/properties/${property.id}`} className="flex-1">
                <button className="w-full h-8 text-xs font-semibold bg-[#222222] hover:bg-black text-white rounded-lg transition-colors flex items-center justify-center gap-1">
                  Detaylar <ArrowRight className="size-3" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
