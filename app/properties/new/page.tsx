'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function NewPropertyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    city: 'İstanbul',
    district: '',
    neighborhood: '',
    building: '',
    floor: '',
    unit_number: '',
    room_count: '2+1',
    area_m2: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prototip / MVP simülasyonu
    alert('Mülk başarıyla oluşturuldu!')
    router.push('/properties')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/properties">
          <Button variant="ghost" size="sm" className="gap-1 text-slate-500">
            <ArrowLeft className="w-4 h-4" /> Portföye Dön
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Yeni Mülk Tanımla
          </CardTitle>
          <p className="text-sm text-slate-500">
            Taşınmazın adres hiyerarşisi ve temel fiziksel özelliklerini girin.
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Mülk Başlığı / Proje Adı *</label>
              <Input
                required
                placeholder="Örn: Nidapark Küçükyalı A Blok D:14"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">İl *</label>
                <Input
                  required
                  placeholder="İstanbul"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">İlçe *</label>
                <Input
                  required
                  placeholder="Maltepe"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Mahalle *</label>
                <Input
                  required
                  placeholder="Küçükyalı"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Bina / Blok</label>
                <Input
                  placeholder="A Blok"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Kat</label>
                <Input
                  placeholder="3"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Daire / İç Kapı No *</label>
                <Input
                  required
                  placeholder="14"
                  value={formData.unit_number}
                  onChange={(e) => setFormData({ ...formData, unit_number: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Oda Tipi *</label>
                <Input
                  required
                  placeholder="Örn: 2+1, 3+1, Stüdyo"
                  value={formData.room_count}
                  onChange={(e) => setFormData({ ...formData, room_count: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Net / Brüt Alan (m²) *</label>
                <Input
                  required
                  type="number"
                  placeholder="95"
                  value={formData.area_m2}
                  onChange={(e) => setFormData({ ...formData, area_m2: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <Link href="/properties">
                <Button type="button" variant="outline">
                  Vazgeç
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Save className="w-4 h-4" /> Mülkü Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
