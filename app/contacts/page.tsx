'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  FileText, 
  UserCheck, 
  KeyRound,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail, isValidName } from '@/lib/validations'

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState<'TENANTS' | 'LANDLORDS'>('TENANTS')
  const [searchTerm, setSearchTerm] = useState('')
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Ev Sahibi & Kiracılar Rehberi</h1>
          <p className="text-xs text-slate-500 mt-1">
            Teslim tutanaklarında taraf olan kiracı ve maliklerin iletişim ve mülk eşleştirmeleri
          </p>
        </div>

        <Button 
          size="sm" 
          onClick={() => setShowAddModal(!showAddModal)}
          className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-9 text-xs font-semibold px-3.5 shadow-xs"
        >
          <Plus className="size-3.5" /> {activeTab === 'TENANTS' ? 'Yeni Kiracı Ekle' : 'Yeni Mülk Sahibi Ekle'}
        </Button>
      </div>

      {/* Inline Add Modal Form */}
      {showAddModal && (
        <Card className="border-slate-200 shadow-xs bg-slate-50/50 p-5">
          <form onSubmit={handleAddContact} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {activeTab === 'TENANTS' ? 'Yeni Kiracı Kaydı' : 'Yeni Mülk Sahibi Kaydı'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Ad Soyad *</label>
                <Input
                  required
                  placeholder="Ahmet Yılmaz"
                  className={`text-xs h-8 bg-white ${formErrors.name ? 'border-red-500' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && <span className="text-[10px] text-red-600">{formErrors.name}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Telefon *</label>
                <Input
                  required
                  placeholder="0532 000 00 00"
                  className={`text-xs h-8 bg-white font-mono ${formErrors.phone ? 'border-red-500' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                />
                {formErrors.phone && <span className="text-[10px] text-red-600">{formErrors.phone}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">E-posta</label>
                <Input
                  type="email"
                  placeholder="kullanici@ornek.com"
                  className={`text-xs h-8 bg-white ${formErrors.email ? 'border-red-500' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && <span className="text-[10px] text-red-600">{formErrors.email}</span>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">İlişkili Mülk</label>
                <Input
                  placeholder="Örn: Nidapark D:14"
                  className="text-xs h-8 bg-white"
                  value={propertyAssigned}
                  onChange={(e) => setPropertyAssigned(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)} className="h-8 text-xs">
                İptal
              </Button>
              <Button type="submit" size="sm" className="bg-slate-900 text-white h-8 text-xs">
                Kaydet
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('TENANTS')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'TENANTS'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Kiracılar ({tenants.length})
        </button>
        <button
          onClick={() => setActiveTab('LANDLORDS')}
          className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'LANDLORDS'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Mülk Sahipleri ({landlords.length})
        </button>
      </div>

      {/* Table Card */}
      <Card className="border-slate-200 shadow-xs bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="text-xs font-semibold">Kişi / Yetkili</TableHead>
              <TableHead className="text-xs font-semibold">Telefon</TableHead>
              <TableHead className="text-xs font-semibold">E-posta</TableHead>
              <TableHead className="text-xs font-semibold">İlişkili Taşınmaz</TableHead>
              <TableHead className="text-xs font-semibold">{activeTab === 'TENANTS' ? 'Durum' : 'Portföy Miktarı'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTab === 'TENANTS' ? (
              tenants.map((t) => (
                <TableRow key={t.id} className="hover:bg-slate-50/60">
                  <TableCell className="font-semibold text-xs text-slate-900">{t.name}</TableCell>
                  <TableCell className="text-xs font-mono text-slate-700">{t.phone}</TableCell>
                  <TableCell className="text-xs text-slate-600">{t.email}</TableCell>
                  <TableCell className="text-xs font-medium text-slate-800">{t.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px]">
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              landlords.map((l) => (
                <TableRow key={l.id} className="hover:bg-slate-50/60">
                  <TableCell className="font-semibold text-xs text-slate-900">{l.name}</TableCell>
                  <TableCell className="text-xs font-mono text-slate-700">{l.phone}</TableCell>
                  <TableCell className="text-xs text-slate-600">{l.email}</TableCell>
                  <TableCell className="text-xs font-medium text-slate-800">{l.property}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[11px]">
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
