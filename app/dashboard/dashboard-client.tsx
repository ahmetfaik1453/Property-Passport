'use client'

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
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DashboardPageClient() {
  const recentHandovers = [
    {
      id: 'ho-101',
      title: 'Nidapark Küçükyalı A Blok D:14',
      district: 'Maltepe, İstanbul',
      type: 'Giriş (Move-in)',
      tenant: 'Ahmet Yılmaz',
      landlord: 'Ali Kaya',
      photos: 18,
      status: 'PENDING',
      statusText: 'Onay Bekliyor',
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
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dddddd]">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">Prestij Gayrimenkul Yönetim Paneli</h1>
          <p className="text-[14px] text-[#717171] mt-0.5">
            Aktif portföy, saha denetimleri ve doğrulanabilir dijital kanıt kayıtları
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/properties/new">
            <Button variant="outline" size="sm" className="h-9 px-4 gap-1.5 text-[14px] font-medium rounded-lg border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7]">
              <Building2 className="size-3.5" /> Mülk Ekle
            </Button>
          </Link>
          <Link href="/handovers/new">
            <Button size="sm" className="h-9 px-4 bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 text-[14px] font-medium rounded-lg shadow-sm">
              <Plus className="size-3.5" /> Yeni Teslim Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#717171]">Portföydeki Mülk</span>
              <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">18</span>
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
              <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">14</span>
            </div>
            <div className="size-10 rounded-full bg-[#f7f7f7] text-[#222222] flex items-center justify-center border border-[#ebebeb]">
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border border-[#dddddd] bg-white rounded-[14px]">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#717171]">Onay Bekleyenler</span>
              <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">3</span>
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
              <span className="text-[24px] font-bold tracking-tight text-[#222222] mt-0.5">426</span>
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
            <CardTitle className="text-[16px] font-semibold text-[#222222]">Devam Eden ve Tamamlanan Teslimat Tutanakları</CardTitle>
            <CardDescription className="text-[13px] text-[#717171]">Dijital kanıtları incelenmiş ve doğrulanabilir kayıtlar</CardDescription>
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
            {recentHandovers.map((item) => (
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
    </div>
  )
}
