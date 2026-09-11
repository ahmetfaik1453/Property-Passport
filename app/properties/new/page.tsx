'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, Save, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { isValidName } from '@/lib/validations'

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {}
    if (!isValidName(formData.title)) {
      errs.title = 'Mülk başlığı en az 2, en fazla 60 karakter olmalıdır.'
    }
    if (!formData.city.trim()) {
      errs.city = 'İl alanı zorunludur.'
    }
    if (!formData.district.trim()) {
      errs.district = 'İlçe alanı zorunludur.'
    }
    if (!formData.neighborhood.trim()) {
      errs.neighborhood = 'Mahalle alanı zorunludur.'
    }
    if (!formData.unit_number.trim()) {
      errs.unit_number = 'Daire / İç kapı no zorunludur.'
    }
    const area = Number(formData.area_m2)
    if (!formData.area_m2 || isNaN(area) || area <= 0 || area > 50000) {
      errs.area_m2 = 'Geçerli bir metrekare alanı giriniz (1 - 50.000).'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    alert('Mülk başarıyla oluşturuldu!')
    router.push('/properties')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/properties">
          <Button variant="ghost" size="sm" className="gap-1 text-slate-500 text-xs h-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Portföye Dön
          </Button>
        </Link>
      </div>

      <Card className="border-slate-200 shadow-xs">
        <CardHeader className="border-b border-slate-100 p-5">
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-700" />
            Yeni Taşınmaz Tanımla
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Taşınmazın adres hiyerarşisi, tapu/bina bilgisi ve temel fiziksel özelliklerini girin.
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Mülk Başlığı / Proje Adı *</label>
              <Input
                required
                maxLength={60}
                placeholder="Örn: Nidapark Küçükyalı A Blok D:14"
                className={`text-xs h-9 ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }))
                }}
              />
              {errors.title && <span className="text-[11px] text-red-600 font-medium">{errors.title}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">İl *</label>
                <Input
                  required
                  maxLength={30}
                  placeholder="İstanbul"
                  className={`text-xs h-9 ${errors.city ? 'border-red-500' : ''}`}
                  value={formData.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value })
                    if (errors.city) setErrors((prev) => ({ ...prev, city: '' }))
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">İlçe *</label>
                <Input
                  required
                  maxLength={30}
                  placeholder="Maltepe"
                  className={`text-xs h-9 ${errors.district ? 'border-red-500' : ''}`}
                  value={formData.district}
                  onChange={(e) => {
                    setFormData({ ...formData, district: e.target.value })
                    if (errors.district) setErrors((prev) => ({ ...prev, district: '' }))
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Mahalle *</label>
                <Input
                  required
                  maxLength={40}
                  placeholder="Küçükyalı"
                  className={`text-xs h-9 ${errors.neighborhood ? 'border-red-500' : ''}`}
                  value={formData.neighborhood}
                  onChange={(e) => {
                    setFormData({ ...formData, neighborhood: e.target.value })
                    if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: '' }))
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Bina / Blok</label>
                <Input
                  maxLength={20}
                  placeholder="A Blok"
                  className="text-xs h-9"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Kat</label>
                <Input
                  maxLength={10}
                  placeholder="3"
                  className="text-xs h-9"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Daire / İç Kapı No *</label>
                <Input
                  required
                  maxLength={15}
                  placeholder="14"
                  className={`text-xs h-9 ${errors.unit_number ? 'border-red-500' : ''}`}
                  value={formData.unit_number}
                  onChange={(e) => {
                    setFormData({ ...formData, unit_number: e.target.value })
                    if (errors.unit_number) setErrors((prev) => ({ ...prev, unit_number: '' }))
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Oda Tipi *</label>
                <select
                  value={formData.room_count}
                  onChange={(e) => setFormData({ ...formData, room_count: e.target.value })}
                  className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-900 shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                  <option value="1+0">1+0 (Stüdyo)</option>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                  <option value="4+1">4+1 ve üzeri</option>
                  <option value="Villa">Müstakil / Villa</option>
                  <option value="Ticari">Ofis / Dükkan (Ticari)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Net / Brüt Alan (m²) *</label>
                <Input
                  required
                  type="number"
                  min="1"
                  max="50000"
                  placeholder="95"
                  className={`text-xs h-9 ${errors.area_m2 ? 'border-red-500' : ''}`}
                  value={formData.area_m2}
                  onChange={(e) => {
                    setFormData({ ...formData, area_m2: e.target.value })
                    if (errors.area_m2) setErrors((prev) => ({ ...prev, area_m2: '' }))
                  }}
                />
                {errors.area_m2 && <span className="text-[11px] text-red-600 font-medium">{errors.area_m2}</span>}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <Link href="/properties">
                <Button type="button" variant="outline" size="sm" className="h-9 text-xs">
                  Vazgeç
                </Button>
              </Link>
              <Button type="submit" size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-9 text-xs">
                <Save className="w-3.5 h-3.5" /> Mülkü Kaydet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
