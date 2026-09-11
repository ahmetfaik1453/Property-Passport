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

      {/* Table Card */}
      <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
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
                  <div className="flex flex-col">
                    <span className="font-semibold text-[13px] text-[#222222]">{item.title}</span>
                    <span className="text-[12px] text-[#717171] flex items-center gap-1 mt-0.5">
                      <MapPin className="size-3 text-[#ff385c]" /> {item.district}
                    </span>
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
