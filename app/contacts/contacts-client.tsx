'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail, isValidName } from '@/lib/validations'

export default function ContactsPageClient() {
  const [activeTab, setActiveTab] = useState<'TENANTS' | 'LANDLORDS'>('TENANTS')
  const [showAddModal, setShowAddModal] = useState(false)

  // Yeni kişi state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [propertyAssigned, setPropertyAssigned] = useState('')
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const [tenants, setTenants] = useState([
    {
      id: 't-1',
      name: 'Ahmet Yılmaz',
      phone: '0532 441 20 18',
      email: 'ahmet.yilmaz@gmail.com',
      property: 'Nidapark Küçükyalı A Blok D:14',
      status: 'Aktif Kiracı',
      startDate: '11 Eylül 2026',
    },
    {
      id: 't-2',
      name: 'Mehmet Demir',
      phone: '0535 882 19 40',
      email: 'mehmet.demir@hotmail.com',
      property: 'Vadi İstanbul Park 2. Kısım D:42',
      status: 'Tahliye Tesliminde',
      startDate: '15 Ağustos 2024',
    },
    {
      id: 't-3',
      name: 'Selin Kaya',
      phone: '0542 331 90 12',
      email: 'selin.kaya@outlook.com',
      property: 'Batışehir Premium Rezidans D:110',
      status: 'Aktif Kiracı',
      startDate: '20 Temmuz 2026',
    },
  ])

  const [landlords, setLandlords] = useState([
    {
      id: 'l-1',
      name: 'Ali Kaya',
      phone: '0533 992 14 50',
      email: 'ali.kaya@holding.com.tr',
      property: 'Nidapark Küçükyalı A Blok D:14',
      totalProperties: 3,
    },
    {
      id: 'l-2',
      name: 'Fatma Şahin',
      phone: '0544 112 33 44',
      email: 'fatma.sahin@invest.com',
      property: 'Vadi İstanbul Park 2. Kısım D:42',
      totalProperties: 1,
    },
    {
      id: 'l-3',
      name: 'Kemal Sunal',
      phone: '0532 555 44 33',
      email: 'kemal.sunal@gmail.com',
      property: 'Batışehir Premium Rezidans D:110',
      totalProperties: 2,
    },
  ])

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { [key: string]: string } = {}

    if (!isValidName(name)) errs.name = 'Ad Soyad 2-60 karakter olmalıdır.'
    if (!isValidPhoneNumber(phone)) errs.phone = 'Geçerli bir telefon numarası giriniz (05XX XXX XX XX).'
    if (email && !isValidEmail(email)) errs.email = 'Geçerli bir e-posta adresi yazınız.'

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs)
      return
    }

    if (activeTab === 'TENANTS') {
      setTenants([
        {
          id: `t-${Date.now()}`,
          name,
          phone,
          email: email || '-',
          property: propertyAssigned || 'Atanmamış',
          status: 'Yeni Kayıt',
          startDate: 'Bugün',
        },
        ...tenants,
      ])
    } else {
      setLandlords([
        {
          id: `l-${Date.now()}`,
          name,
          phone,
          email: email || '-',
          property: propertyAssigned || 'Atanmamış',
          totalProperties: 1,
        },
        ...landlords,
      ])
    }

    setName('')
    setPhone('')
    setEmail('')
    setPropertyAssigned('')
    setFormErrors({})
    setShowAddModal(false)
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dddddd]">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#222222]">Ev Sahibi & Kiracılar Rehberi</h1>
          <p className="text-[14px] text-[#717171] mt-1">
            Teslim tutanaklarında taraf olan kiracı ve maliklerin iletişim ve mülk eşleştirmeleri
          </p>
        </div>

        <Button 
          size="sm" 
          onClick={() => setShowAddModal(!showAddModal)}
          className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-2 h-9 text-[14px] font-medium px-4 rounded-lg shadow-sm"
        >
          <Plus className="size-3.5" /> {activeTab === 'TENANTS' ? 'Yeni Kiracı Ekle' : 'Yeni Mülk Sahibi Ekle'}
        </Button>
      </div>

      {/* Inline Add Modal Form */}
      {showAddModal && (
        <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] p-5">
          <form onSubmit={handleAddContact} className="space-y-4">
            <h3 className="text-[16px] font-bold text-[#222222]">
              {activeTab === 'TENANTS' ? 'Yeni Kiracı Kaydı' : 'Yeni Mülk Sahibi Kaydı'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[12px] font-semibold text-[#222222] block mb-1">Ad Soyad *</label>
                <Input
                  required
                  placeholder="Ahmet Yılmaz"
                  className={`text-[13px] h-9 bg-white border-[#dddddd] rounded-lg ${formErrors.name ? 'border-[#c13515]' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && <span className="text-[11px] text-[#c13515] mt-0.5 block">{formErrors.name}</span>}
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#222222] block mb-1">Telefon *</label>
                <Input
                  required
                  placeholder="0532 000 00 00"
                  className={`text-[13px] h-9 bg-white font-mono border-[#dddddd] rounded-lg ${formErrors.phone ? 'border-[#c13515]' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                />
                {formErrors.phone && <span className="text-[11px] text-[#c13515] mt-0.5 block">{formErrors.phone}</span>}
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#222222] block mb-1">E-posta</label>
                <Input
                  type="email"
                  placeholder="kullanici@ornek.com"
                  className={`text-[13px] h-9 bg-white border-[#dddddd] rounded-lg ${formErrors.email ? 'border-[#c13515]' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && <span className="text-[11px] text-[#c13515] mt-0.5 block">{formErrors.email}</span>}
              </div>

              <div>
                <label className="text-[12px] font-semibold text-[#222222] block mb-1">İlişkili Mülk</label>
                <Input
                  placeholder="Örn: Nidapark D:14"
                  className="text-[13px] h-9 bg-white border-[#dddddd] rounded-lg"
                  value={propertyAssigned}
                  onChange={(e) => setPropertyAssigned(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)} className="h-8 text-[13px] font-medium border-[#dddddd] text-[#222222] hover:bg-[#f7f7f7] rounded-lg">
                İptal
              </Button>
              <Button type="submit" size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white h-8 text-[13px] font-medium rounded-lg px-4 shadow-sm">
                Kaydet
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-[#dddddd]">
        <button
          onClick={() => setActiveTab('TENANTS')}
          className={`pb-3 px-1 text-[14px] font-semibold transition-all border-b-2 ${
            activeTab === 'TENANTS'
              ? 'border-[#222222] text-[#222222]'
              : 'border-transparent text-[#717171] hover:text-[#222222]'
          }`}
        >
          Kiracılar ({tenants.length})
        </button>
        <button
          onClick={() => setActiveTab('LANDLORDS')}
          className={`pb-3 px-1 text-[14px] font-semibold transition-all border-b-2 ${
            activeTab === 'LANDLORDS'
              ? 'border-[#222222] text-[#222222]'
              : 'border-transparent text-[#717171] hover:text-[#222222]'
          }`}
        >
          Mülk Sahipleri ({landlords.length})
        </button>
      </div>

      {/* Table Card */}
      <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#f7f7f7]">
            <TableRow className="border-b border-[#dddddd] hover:bg-transparent">
              <TableHead className="text-[12px] font-semibold text-[#222222]">Kişi / Yetkili</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Telefon</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">E-posta</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">İlişkili Taşınmaz</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">{activeTab === 'TENANTS' ? 'Durum' : 'Portföy Miktarı'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTab === 'TENANTS' ? (
              tenants.map((t) => (
                <TableRow key={t.id} className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]/60 transition-colors">
                  <TableCell className="font-semibold text-[13px] text-[#222222]">{t.name}</TableCell>
                  <TableCell className="text-[13px] font-mono text-[#717171]">{t.phone}</TableCell>
                  <TableCell className="text-[13px] text-[#717171]">{t.email}</TableCell>
                  <TableCell className="text-[13px] font-medium text-[#222222]">{t.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] font-semibold rounded-full px-2.5 py-0.5">
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              landlords.map((l) => (
                <TableRow key={l.id} className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]/60 transition-colors">
                  <TableCell className="font-semibold text-[13px] text-[#222222]">{l.name}</TableCell>
                  <TableCell className="text-[13px] font-mono text-[#717171]">{l.phone}</TableCell>
                  <TableCell className="text-[13px] text-[#717171]">{l.email}</TableCell>
                  <TableCell className="text-[13px] font-medium text-[#222222]">{l.property}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 bg-[#f7f7f7] text-[#222222] border border-[#dddddd]">
                      {l.totalProperties} Mülk
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
