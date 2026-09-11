'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  ShieldCheck, 
  MapPin, 
  Camera,
  Layers,
  Search,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createClient } from '@/utils/supabase/client'
import { useSearchParams } from 'next/navigation'

export default function DashboardPageClient() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'
  const [showVerifiedBanner, setShowVerifiedBanner] = useState(isVerified)

  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    if (isVerified) {
      setShowVerifiedBanner(true)
    }
  }, [isVerified])

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

  const meta = user?.user_metadata || {}
  const role = meta.role || (user ? 'AGENT' : 'GUEST')
  const fullName = meta.full_name || user?.email?.split('@')[0] || 'Kullanıcı'
  const agencyName = meta.agency_name || 'Acente'

  // Kişiye özel mock / aktif kayıtlar
  // Eğer kiracı girmişse: sadece kiraladığı daire ve teslimat kaydı
  // Eğer mülk sahibi girmişse: sadece kendine ait mülkler
  // Eğer acente girmişse: acentenin tüm portföyü
  const tenantHandover = {
    id: 'ho-101',
    title: 'Nidapark Küçükyalı A Blok D:14',
    district: 'Maltepe, İstanbul',
    type: 'Giriş (Move-in)',
    tenant: fullName,
    landlord: 'Ali Kaya',
    photos: 18,
    status: 'COMPLETED',
    statusText: 'Tamamlandı & Onaylandı',
    date: '11 Eylül 2026',
    token: 'demo-token-1',
    depositAmount: '45.000 ₺',
    monthlyRent: '38.000 ₺',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    rooms: [
      { name: 'Salon', status: 'Temiz / Hasarsız', notes: 'Parkeler ve duvar boyası yeni, klima faal durumda.', count: 6 },
      { name: 'Mutfak', status: 'Kusursuz', notes: 'Ankastre fırın, ocak ve evye çalışır durumda teslim edildi.', count: 4 },
      { name: 'Yatak Odası', status: 'Kusursuz', notes: 'Gömme dolap kapakları sağlam, süpürgeliklerde hasar yok.', count: 4 },
      { name: 'Banyo', status: 'Temiz', notes: 'Duşakabin ve armatürlerde sızıntı yok, derz dolguları sağlam.', count: 4 },
    ],
    meters: {
      elec: '1428.5 kWh',
      water: '382.1 m³',
      gas: '219.0 m³',
    }
  }

  const landlordHandovers = [
    {
      id: 'ho-101',
      title: 'Nidapark Küçükyalı A Blok D:14',
      district: 'Maltepe, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Ahmet Yılmaz',
      landlord: fullName,
      photos: 18,
      status: 'COMPLETED',
      statusText: 'Tamamlandı & Onaylandı',
      date: '11 Eylül 2026',
      token: 'demo-token-1',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'ho-103',
      title: 'Batışehir Premium Rezidans D:110',
      district: 'Bağcılar, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Selin Kaya',
      landlord: fullName,
      photos: 14,
      status: 'IN_PROGRESS',
      statusText: 'Teslim Aşamasında',
      date: '08 Eylül 2026',
      token: 'demo-token-bati',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    },
  ]

  const agentHandovers = [
    {
      id: 'ho-101',
      title: 'Nidapark Küçükyalı A Blok D:14',
      district: 'Maltepe, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Ahmet Yılmaz',
      landlord: 'Ali Kaya',
      photos: 18,
      status: 'COMPLETED',
      statusText: 'Tamamlandı & Onaylandı',
      date: '11 Eylül 2026',
      token: 'demo-token-1',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'ho-102',
      title: 'Vadi İstanbul Park 2. Kısım D:42',
      district: 'Sarıyer, İstanbul',
      type: 'Çıkış (Move-out)',
      tenant: 'Mehmet Demir',
      landlord: 'Fatma Şahin',
      photos: 24,
      status: 'COMPLETED',
      statusText: 'Tamamlandı & Doğrulandı',
      date: '10 Eylül 2026',
      token: 'demo-token-vadi',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'ho-103',
      title: 'Batışehir Premium Rezidans D:110',
      district: 'Bağcılar, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Selin Kaya',
      landlord: 'Kemal Sunal',
      photos: 14,
      status: 'IN_PROGRESS',
      statusText: 'Taslak (Saha)',
      date: '08 Eylül 2026',
      token: 'demo-token-bati',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    },
  ]

  // Başlık ve açıklama role göre dinamik
  const getHeaderInfo = () => {
    if (!user) {
      return {
        title: 'Örnek Gayrimenkul Yönetim Paneli',
        sub: 'Platformu örnek verilerle inceliyorsunuz. Gerçek kayıtlarınız için giriş yapın.',
        badge: 'Örnek Görünüm'
      }
    }
    if (role === 'TENANT') {
      return {
        title: `${fullName} — Kiracı Teslimat Portalı`,
        sub: 'Kiraladığınız konutun teslim tutanağı, sayaç endeksleri ve kanıt fotoğrafları',
        badge: 'Kiracı Hesabı'
      }
    }
    if (role === 'LANDLORD') {
      return {
        title: `${fullName} — Mülk Sahibi Paneli`,
        sub: 'Sahip olduğunuz taşınmazların dijital durum pasaportları ve kiracı teslimat kayıtları',
        badge: 'Mülk Sahibi'
      }
    }
    return {
      title: `${agencyName} Yönetim Paneli`,
      sub: 'Aktif portföy, saha denetimleri ve doğrulanabilir dijital kanıt kayıtları',
      badge: 'Acente Yöneticisi'
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <div className="flex flex-col gap-6">
      {/* E-posta Onaylandı Başarı Bildirimi */}
      {showVerifiedBanner && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start justify-between gap-3 text-emerald-950 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-emerald-950">E-posta Adresiniz Başarıyla Onaylandı!</p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Hesabınız aktif hale getirildi. Artık sisteme tam yetkiyle erişebilirsiniz.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowVerifiedBanner(false)}
            className="size-7 rounded-lg hover:bg-emerald-200/50 text-emerald-800 flex items-center justify-center transition-colors"
            title="Kapat"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Demo / Örnek Görünüm Bilgilendirme Bannerı */}
      {!user && (
        <div className="bg-[#fff8f6] border border-[#ffd1da] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-[#ff385c] shrink-0 mt-1 sm:mt-0 animate-pulse" />
            <div>
              <span className="font-bold text-[#222222] text-[13px]">Örnek Yönetim Paneli (Ziyaretçi Önizleme)</span>
              <p className="text-[#717171] mt-0.5">
                Şu anda platformun canlı kontrol panelini örnek acente verileriyle inceliyorsunuz.
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dddddd]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">
              {headerInfo.title}
            </h1>
            <Badge variant="secondary" className="text-[11px] font-medium bg-[#f7f7f7] text-[#717171] border border-[#dddddd] rounded-full px-2.5 py-0.5">
              {headerInfo.badge}
            </Badge>
          </div>
          <p className="text-[14px] text-[#717171] mt-0.5">
            {headerInfo.sub}
          </p>
        </div>

        {/* Action Buttons: Kiracı için kısıtla, acente ve mülk sahibi için aç */}
        <div className="flex items-center gap-2.5">
          {role !== 'TENANT' && (
            <Link href="/properties/new">
              <Button variant="outline" size="sm" className="h-9 px-4 gap-1.5 text-[14px] font-medium rounded-lg border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7]">
                <Building2 className="size-3.5" /> Mülk Ekle
              </Button>
            </Link>
          )}
          {role === 'AGENT' && (
            <Link href="/handovers/new">
              <Button size="sm" className="h-9 px-4 bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 text-[14px] font-medium rounded-lg shadow-sm">
                <Plus className="size-3.5" /> Yeni Teslim Başlat
              </Button>
            </Link>
          )}
          {role === 'TENANT' && (
            <Link href={`/verify/${tenantHandover.token}`}>
              <Button size="sm" className="h-9 px-4 bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 text-[14px] font-medium rounded-lg shadow-sm">
                <ShieldCheck className="size-3.5" /> Teslim Tutanağımı Doğrula
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. KIRACI ÖZEL GÖRÜNÜMÜ (TENANT VIEW) */}
      {/* ========================================================================= */}
      {role === 'TENANT' ? (
        <div className="space-y-6">
          {/* Kiracının Aktif Kiralama Kartı */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <img 
                  src={tenantHandover.image} 
                  alt={tenantHandover.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                    {tenantHandover.statusText}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 text-white flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base">{tenantHandover.title}</h3>
                    <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
                      <MapPin className="size-3 text-[#ff385c]" /> {tenantHandover.district}
                    </p>
                  </div>
                  <Link href={`/properties/prop-1`}>
                    <Button size="sm" variant="secondary" className="h-8 text-xs font-semibold rounded-lg bg-white text-black hover:bg-gray-100">
                      Mülkü İncele
                    </Button>
                  </Link>
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-[#f7f7f7] p-3 rounded-xl border border-[#ebebeb]">
                    <span className="text-[11px] text-[#717171] block">Mülk Sahibi</span>
                    <span className="text-[13px] font-bold text-[#222222]">{tenantHandover.landlord}</span>
                  </div>
                  <div className="bg-[#f7f7f7] p-3 rounded-xl border border-[#ebebeb]">
                    <span className="text-[11px] text-[#717171] block">Teslim Tarihi</span>
                    <span className="text-[13px] font-bold text-[#222222]">{tenantHandover.date}</span>
                  </div>
                  <div className="bg-[#f7f7f7] p-3 rounded-xl border border-[#ebebeb]">
                    <span className="text-[11px] text-[#717171] block">Aylık Kira</span>
                    <span className="text-[13px] font-bold text-[#222222]">{tenantHandover.monthlyRent}</span>
                  </div>
                  <div className="bg-[#f7f7f7] p-3 rounded-xl border border-[#ebebeb]">
                    <span className="text-[11px] text-[#717171] block">Güvence Depozitosu</span>
                    <span className="text-[13px] font-bold text-[#222222]">{tenantHandover.depositAmount}</span>
                  </div>
                </div>

                {/* Sayaç Endeksleri */}
                <div className="border-t border-[#ebebeb] pt-4">
                  <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider mb-2.5">
                    Giriş Anı Sayaç Okumaları (Resmi Endeksler)
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2.5 rounded-lg border border-[#dddddd] bg-[#fafafa]">
                      <span className="text-[11px] text-[#717171] block font-medium">Elektrik Sayacı</span>
                      <span className="text-sm font-bold font-mono text-[#222222]">{tenantHandover.meters.elec}</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-[#dddddd] bg-[#fafafa]">
                      <span className="text-[11px] text-[#717171] block font-medium">Su Sayacı</span>
                      <span className="text-sm font-bold font-mono text-[#222222]">{tenantHandover.meters.water}</span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-[#dddddd] bg-[#fafafa]">
                      <span className="text-[11px] text-[#717171] block font-medium">Doğalgaz Sayacı</span>
                      <span className="text-sm font-bold font-mono text-[#222222]">{tenantHandover.meters.gas}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Oda Durumları ve Kanıtlar */}
            <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ebebeb]">
                  <h3 className="font-bold text-sm text-[#222222]">Oda Bazlı Fiziksel Durum</h3>
                  <Badge variant="outline" className="text-[11px] font-semibold text-[#ff385c] border-[#ffd1da] bg-[#fff8f6]">
                    {tenantHandover.photos} Fotoğraf
                  </Badge>
                </div>
                <div className="divide-y divide-[#ebebeb] mt-2">
                  {tenantHandover.rooms.map((room, idx) => (
                    <div key={idx} className="py-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#222222]">{room.name}</span>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {room.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#717171] mt-1 leading-snug">
                        {room.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ebebeb] mt-4 flex flex-col gap-2">
                <Link href={`/properties/prop-1`}>
                  <Button variant="outline" className="w-full text-xs font-semibold h-9 rounded-lg border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7]">
                    <Camera className="size-3.5 mr-1.5" /> Tüm Kanıt Fotoğraflarını İncele
                  </Button>
                </Link>
                <Link href={`/verify/${tenantHandover.token}`}>
                  <Button className="w-full text-xs font-semibold h-9 rounded-lg bg-[#222222] hover:bg-black text-white">
                    <ShieldCheck className="size-3.5 mr-1.5" /> Dijital Doğrulama Sertifikası (QR)
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. ACENTE VEYA MÜLK SAHİBİ GÖRÜNÜMÜ */
        /* ========================================================================= */
        <>
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#717171]">
                    {role === 'LANDLORD' ? 'Sahip Olunan Mülk' : 'Portföydeki Mülk'}
                  </span>
                  <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">
                    {role === 'LANDLORD' ? '2' : '18'}
                  </span>
                </div>
                <div className="size-10 rounded-full bg-[#f7f7f7] flex items-center justify-center text-[#222222] border border-[#ebebeb]">
                  <Building2 className="size-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#717171]">Aktif Kiralamalar</span>
                  <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">
                    {role === 'LANDLORD' ? '2' : '14'}
                  </span>
                </div>
                <div className="size-10 rounded-full bg-[#f7f7f7] text-[#222222] flex items-center justify-center border border-[#ebebeb]">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#717171]">Tamamlanan Teslimat</span>
                  <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">
                    {role === 'LANDLORD' ? '1' : '15'}
                  </span>
                </div>
                <div className="size-10 rounded-full bg-[#fff8f6] text-[#ff385c] flex items-center justify-center border border-[#ffd1da]">
                  <Clock className="size-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#717171]">Kayıtlı Kanıt Sayısı</span>
                  <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">
                    {role === 'LANDLORD' ? '32' : '426'}
                  </span>
                </div>
                <div className="size-10 rounded-full bg-[#f7f7f7] text-[#222222] flex items-center justify-center border border-[#ebebeb]">
                  <Camera className="size-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Table View */}
          <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px] overflow-hidden">
            <CardHeader className="p-4 border-b border-[#dddddd] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
              <div>
                <CardTitle className="text-[16px] font-semibold text-[#222222]">
                  {role === 'LANDLORD' ? 'Taşınmazlarınıza Ait Teslimat Tutanakları' : 'Devam Eden ve Tamamlanan Teslimat Tutanakları'}
                </CardTitle>
                <CardDescription className="text-[13px] text-[#717171]">
                  Dijital kanıtları incelenmiş ve doğrulanabilir kayıtlar
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-3 top-2.5 size-3.5 text-[#717171]" />
                  <Input placeholder="Mülk veya kiracı ara..." className="h-9 pl-8 text-[13px] bg-[#f7f7f7] border-[#dddddd] rounded-full focus:bg-white focus:border-[#222222]" />
                </div>
              </div>
            </CardHeader>

            <Table>
              <TableHeader className="bg-[#f7f7f7]">
                <TableRow className="border-b border-[#dddddd] hover:bg-transparent">
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Taşınmaz Bilgisi</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Tür</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Taraflar</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Kanıt</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Durum</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222]">Tarih</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#222222] text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(role === 'LANDLORD' ? landlordHandovers : agentHandovers).map((item) => (
                  <TableRow key={item.id} className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]/60 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-lg overflow-hidden shrink-0 bg-[#f0f0f0] border border-[#ebebeb]">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[13px] text-[#222222] truncate">{item.title}</span>
                          <span className="text-[12px] text-[#717171] flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="size-3 text-[#ff385c] shrink-0" /> {item.district}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-[#222222]">{item.type}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-[12px]">
                        <span className="text-[#222222] font-medium">K: {item.tenant}</span>
                        <span className="text-[11px] text-[#717171]">M: {item.landlord}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-[13px] text-[#222222] font-medium">
                        <Camera className="size-3.5 text-[#717171]" /> {item.photos}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.status === 'COMPLETED' ? (
                        <Badge variant="outline" className="text-[11px] font-semibold rounded-full border-emerald-200 text-emerald-800 bg-emerald-50 px-2.5 py-0.5">
                          Tamamlandı & Onaylandı
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[11px] font-semibold rounded-full border-amber-200 text-amber-800 bg-amber-50 px-2.5 py-0.5">
                          Teslim Aşamasında
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-[12px] text-[#717171]">{item.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/handovers/new?id=${item.id}`}>
                          <Button size="sm" variant="ghost" className="h-8 px-3 text-[13px] font-medium rounded-lg text-[#222222] hover:bg-[#f7f7f7]">
                            İncele
                          </Button>
                        </Link>
                        <Link href={`/verify/${item.token}`}>
                          <Button size="sm" variant="outline" className="h-8 px-3 text-[13px] font-medium rounded-lg gap-1 border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7]">
                            QR <ArrowUpRight className="size-3 text-[#717171]" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  )
}
