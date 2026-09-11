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
  CheckCircle2, 
  Clock, 
  Download,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function HandoversPage() {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Teslim Tutanakları</h1>
            <Badge variant="secondary" className="text-xs font-semibold">
              {handoversList.length} Tutanak
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Giriş ve çıkış teslimatları, sayaç kayıtları, oda fotoğrafları ve doğrulanabilir dijital belgeler
          </p>
        </div>

        <Link href="/handovers/new">
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-9 text-xs font-semibold px-3.5 shadow-xs">
            <Plus className="size-3.5" /> Yeni Teslim Başlat
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
          <Input 
            placeholder="Tutanak, mülk, kiracı veya malik ara..." 
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
            variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('COMPLETED')}
            className={`h-8 text-xs px-3 ${statusFilter === 'COMPLETED' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Tamamlanan ({handoversList.filter(x => x.status === 'COMPLETED').length})
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'PENDING' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('PENDING')}
            className={`h-8 text-xs px-3 ${statusFilter === 'PENDING' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            Onay Bekleyen ({handoversList.filter(x => x.status === 'PENDING').length})
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="border-slate-200 shadow-xs bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="text-xs font-semibold">Taşınmaz Bilgisi</TableHead>
              <TableHead className="text-xs font-semibold">Tür</TableHead>
              <TableHead className="text-xs font-semibold">Taraflar</TableHead>
              <TableHead className="text-xs font-semibold">Kanıt</TableHead>
              <TableHead className="text-xs font-semibold">Durum</TableHead>
              <TableHead className="text-xs font-semibold">Tarih</TableHead>
              <TableHead className="text-xs font-semibold text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/60">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-slate-900">{item.title}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="size-3" /> {item.district}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-slate-700">{item.type}</TableCell>
                <TableCell>
                  <div className="flex flex-col text-xs">
                    <span className="text-slate-800 font-medium">K: {item.tenant}</span>
                    <span className="text-[11px] text-slate-500">M: {item.landlord}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium">
                    <Camera className="size-3.5 text-slate-400" /> {item.photos}
                  </span>
                </TableCell>
                <TableCell>
                  {item.status === 'COMPLETED' ? (
                    <Badge variant="outline" className="text-[11px] border-emerald-200 text-emerald-800 bg-emerald-50">
                      Tamamlandı
                    </Badge>
                  ) : item.status === 'PENDING' ? (
                    <Badge variant="outline" className="text-[11px] border-amber-200 text-amber-800 bg-amber-50">
                      Onay Bekliyor
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[11px] border-slate-200 text-slate-700 bg-slate-100">
                      Taslak
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-500">{item.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link href={`/api/handovers/${item.id}/pdf`} target="_blank">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1" title="PDF İndir">
                        <Download className="size-3" /> PDF
                      </Button>
                    </Link>
                    <Link href={`/verify/${item.token}`}>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-slate-200">
                        QR <ArrowUpRight className="size-3" />
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
