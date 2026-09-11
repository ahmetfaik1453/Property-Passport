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

export default function DashboardPage() {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Prestij Gayrimenkul Yönetim Paneli</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aktif portföy, saha denetimleri ve doğrulanabilir dijital kanıt kayıtları
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/properties/new">
            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
              <Building2 className="size-3.5" /> Mülk Ekle
            </Button>
          </Link>
          <Link href="/handovers/new">
            <Button size="sm" className="h-9 bg-slate-900 hover:bg-slate-800 text-white gap-1.5 text-xs">
              <Plus className="size-3.5" /> Yeni Teslim Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Portföydeki Mülk</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">18</span>
            </div>
            <div className="size-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="size-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Aktif Kiralamalar</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">14</span>
            </div>
            <div className="size-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="size-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Onay Bekleyenler</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">3</span>
            </div>
            <div className="size-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-slate-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Kayıtlı Kanıt Sayısı</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">426</span>
            </div>
            <div className="size-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Camera className="size-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table View: Professional shadcn Table */}
      <Card className="shadow-none border-slate-200">
        <CardHeader className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-semibold">Devam Eden ve Tamamlanan Teslimat Tutanakları</CardTitle>
            <CardDescription className="text-xs">Dijital kanıtları incelenmiş ve doğrulanabilir kayıtlar</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
              <Input placeholder="Mülk veya kiracı ara..." className="h-8 pl-8 text-xs bg-slate-50" />
            </div>
          </div>
        </CardHeader>

        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="text-xs font-semibold">Taşınmaz Bilgisi</TableHead>
              <TableHead className="text-xs font-semibold">Tür</TableHead>
              <TableHead className="text-xs font-semibold">Taraflar</TableHead>
              <TableHead className="text-xs font-semibold">Kanıt</TableHead>
              <TableHead className="text-xs font-semibold">Durum</TableHead>
              <TableHead className="text-xs font-semibold">Tarih</TableHead>
              <TableHead className="text-xs font-semibold text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentHandovers.map((item) => (
              <TableRow key={item.id} className="hover:bg-slate-50/50">
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
                    <Link href={`/handovers/new?id=${item.id}`}>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                        İncele
                      </Button>
                    </Link>
                    <Link href={`/verify/${item.token}`}>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
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
