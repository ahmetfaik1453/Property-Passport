'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Plus, 
  Search, 
  ArrowUpRight, 
  Camera, 
  MapPin, 
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function HandoversPageClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const [user, setUser] = useState<any>(null)

  const handoversList = [
    {
      id: 'ho-101',
      title: 'Nidapark Küçükyalı A Blok D:14',
      district: 'Maltepe, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Ahmet Yılmaz',
      landlord: 'Ali Kaya',
      photos: 18,
      status: 'COMPLETED',
      statusText: 'Tamamlandı & Doğrulandı',
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
    {
      id: 'ho-104',
      title: 'Zorlu Center Terrazze D:T-4',
      district: 'Beşiktaş, İstanbul',
      type: 'Çıkış (Move-out)',
      tenant: 'Murat Arslan',
      landlord: 'Hasan Yılmaz',
      photos: 32,
      status: 'PENDING',
      statusText: 'Onay Bekliyor',
      date: '01 Eylül 2026',
      token: 'demo-token-zorlu',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'ho-105',
      title: 'Büyükyalı Fişekhane D:B-18',
      district: 'Zeytinburnu, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Canan Özdemir',
      landlord: 'Mustafa Aydın',
      photos: 19,
      status: 'COMPLETED',
      statusText: 'Tamamlandı & Doğrulandı',
      date: '18 Mayıs 2026',
      token: 'demo-token-buyuk',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    }
  ]

  const filtered = handoversList.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.landlord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (statusFilter === 'ALL') return matchesSearch
    return matchesSearch && item.status === statusFilter
  })

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dddddd]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">Teslim Tutanakları</h1>
            <Badge variant="secondary" className="text-[11px] font-semibold bg-[#f7f7f7] text-[#222222] border border-[#dddddd] rounded-full px-2.5 py-0.5">
              {handoversList.length} Tutanak
            </Badge>
          </div>
          <p className="text-[14px] text-[#717171] mt-1">
            Giriş ve çıkış teslimatları, sayaç kayıtları, oda fotoğrafları ve doğrulanabilir dijital belgeler
          </p>
        </div>

        <Link href="/handovers/new">
          <Button size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-2 h-9 text-[14px] font-medium px-4 rounded-lg shadow-sm">
            <Plus className="size-3.5" /> Yeni Teslim Başlat
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-[14px] border border-[#dddddd]">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 size-3.5 text-[#717171]" />
          <Input 
            placeholder="Tutanak, mülk, kiracı veya malik ara..." 
            className="pl-9 h-9 text-[13px] bg-[#f7f7f7] border-[#dddddd] rounded-full focus:bg-white focus:border-[#222222]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={statusFilter === 'ALL' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('ALL')}
            className={`h-8 text-[13px] font-medium px-3 rounded-full border-[#dddddd] ${statusFilter === 'ALL' ? 'bg-[#222222] text-white' : 'text-[#222222] bg-white hover:bg-[#f7f7f7]'}`}
          >
            Tümü
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('COMPLETED')}
            className={`h-8 text-[13px] font-medium px-3 rounded-full border-[#dddddd] ${statusFilter === 'COMPLETED' ? 'bg-[#222222] text-white' : 'text-[#222222] bg-white hover:bg-[#f7f7f7]'}`}
          >
            Tamamlanan ({handoversList.filter(x => x.status === 'COMPLETED').length})
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'PENDING' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('PENDING')}
            className={`h-8 text-[13px] font-medium px-3 rounded-full border-[#dddddd] ${statusFilter === 'PENDING' ? 'bg-[#222222] text-white' : 'text-[#222222] bg-white hover:bg-[#f7f7f7]'}`}
          >
            Onay Bekleyen ({handoversList.filter(x => x.status === 'PENDING').length})
          </Button>
        </div>
      </div>

      {/* Mobile Card List (< sm ekranlar) */}
      <div className="sm:hidden flex flex-col gap-3">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-[#dddddd] bg-white space-y-3 shadow-2xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-semibold text-sm text-[#222222] block">{item.title}</span>
                <span className="text-xs text-[#717171] flex items-center gap-1 mt-0.5">
                  <MapPin className="size-3 text-[#ff385c]" /> {item.district}
                </span>
              </div>
              {item.status === 'COMPLETED' ? (
                <Badge variant="outline" className="text-[10px] font-semibold rounded-full border-emerald-200 text-emerald-800 bg-emerald-50 shrink-0">
                  Tamamlandı
                </Badge>
              ) : item.status === 'PENDING' ? (
                <Badge variant="outline" className="text-[10px] font-semibold rounded-full border-[#ffd1da] text-[#c13515] bg-[#fff8f6] shrink-0">
                  Onay Bekliyor
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] font-semibold rounded-full border-[#dddddd] text-[#717171] bg-[#f7f7f7] shrink-0">
                  Taslak
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#f0f0f0] text-[#717171]">
              <div>
                <span className="block text-[10px] uppercase text-[#a0a0a0]">Tür / Tarih</span>
                <span className="text-[#222222] font-medium">{item.type}</span> &bull; {item.date}
              </div>
              <div>
                <span className="block text-[10px] uppercase text-[#a0a0a0]">Kanıt</span>
                <span className="inline-flex items-center gap-1 text-[#222222] font-medium">
                  <Camera className="size-3 text-[#717171]" /> {item.photos} Görsel
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="text-[11px] text-[#717171] truncate max-w-[150px]">
                K: {item.tenant}
              </div>
              <div className="flex items-center gap-2">
                <a href={`/api/handovers/${item.id}/pdf`} download={`tutanak-${item.id}.pdf`}>
                  <Button size="sm" variant="ghost" className="h-8 px-2.5 text-xs font-semibold rounded-lg text-[#222222] hover:bg-[#f7f7f7] gap-1">
                    <Download className="size-3 text-[#717171]" /> PDF
                  </Button>
                </a>
                <Link href={`/verify/${item.token}`}>
                  <Button size="sm" variant="outline" className="h-8 px-2.5 text-xs font-semibold rounded-lg gap-1 border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7]">
                    QR <ArrowUpRight className="size-3 text-[#717171]" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table (sm ve üzeri ekranlar) */}
      <Card className="hidden sm:block border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#f7f7f7]">
            <TableRow className="border-b border-[#dddddd] hover:bg-transparent">
              <TableHead className="text-[12px] font-semibold text-[#222222]">Taşınmaz Bilgisi</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Tür</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Taraflar</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Kanıt</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Durum</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Tarih</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222] text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
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
                      Tamamlandı
                    </Badge>
                  ) : item.status === 'PENDING' ? (
                    <Badge variant="outline" className="text-[11px] font-semibold rounded-full border-[#ffd1da] text-[#c13515] bg-[#fff8f6] px-2.5 py-0.5">
                      Onay Bekliyor
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[11px] font-semibold rounded-full border-[#dddddd] text-[#717171] bg-[#f7f7f7] px-2.5 py-0.5">
                      Taslak
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-[12px] text-[#717171]">{item.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/api/handovers/${item.id}/pdf`} download={`tutanak-${item.id}.pdf`}>
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-[13px] font-medium rounded-lg text-[#222222] hover:bg-[#f7f7f7] gap-1" title="PDF İndir">
                        <Download className="size-3 text-[#717171]" /> PDF
                      </Button>
                    </a>
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
    </div>
  )
}
