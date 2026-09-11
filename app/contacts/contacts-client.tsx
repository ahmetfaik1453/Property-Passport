'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Plus,
  Building2,
  Phone,
  Mail,
  Calendar,
  FileText,
  Camera,
  ArrowUpRight,
  ShieldCheck,
  X,
  MapPin,
  ExternalLink
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
  const [selectedContact, setSelectedContact] = useState<any>(null)

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

      {/* Mobile Cards (< sm ekranlar) */}
      <div className="sm:hidden flex flex-col gap-3">
        {activeTab === 'TENANTS' ? (
          tenants.map((t) => (
            <div 
              key={t.id} 
              onClick={() => setSelectedContact({ ...t, contactType: 'TENANT' })}
              className="p-4 rounded-xl border border-[#dddddd] bg-white space-y-2.5 shadow-2xs cursor-pointer hover:border-[#222222] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-sm text-[#222222] block">{t.name}</span>
                  <span className="text-xs text-[#717171]">{t.property}</span>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-semibold rounded-full shrink-0">
                  {t.status}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-xs pt-1 border-t border-[#f0f0f0] text-[#717171]">
                <div className="flex justify-between">
                  <span>Telefon:</span>
                  <span className="font-mono text-[#222222] font-medium">{t.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>E-posta:</span>
                  <span className="text-[#222222]">{t.email}</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end text-xs font-semibold text-[#ff385c]">
                Detayları İncele →
              </div>
            </div>
          ))
        ) : (
          landlords.map((l) => (
            <div 
              key={l.id} 
              onClick={() => setSelectedContact({ ...l, contactType: 'LANDLORD' })}
              className="p-4 rounded-xl border border-[#dddddd] bg-white space-y-2.5 shadow-2xs cursor-pointer hover:border-[#222222] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-sm text-[#222222] block">{l.name}</span>
                  <span className="text-xs text-[#717171]">{l.property}</span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-semibold rounded-full px-2 py-0.5 bg-[#f7f7f7] text-[#222222] border border-[#dddddd] shrink-0">
                  {l.totalProperties} Mülk
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-xs pt-1 border-t border-[#f0f0f0] text-[#717171]">
                <div className="flex justify-between">
                  <span>Telefon:</span>
                  <span className="font-mono text-[#222222] font-medium">{l.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>E-posta:</span>
                  <span className="text-[#222222]">{l.email}</span>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end text-xs font-semibold text-[#ff385c]">
                Detayları İncele →
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table Card (sm ve üzeri) */}
      <Card className="hidden sm:block border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#f7f7f7]">
            <TableRow className="border-b border-[#dddddd] hover:bg-transparent">
              <TableHead className="text-[12px] font-semibold text-[#222222]">Kişi / Yetkili</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">Telefon</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">E-posta</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">İlişkili Taşınmaz</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222]">{activeTab === 'TENANTS' ? 'Durum' : 'Portföy Miktarı'}</TableHead>
              <TableHead className="text-[12px] font-semibold text-[#222222] text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeTab === 'TENANTS' ? (
              tenants.map((t) => (
                <TableRow 
                  key={t.id} 
                  onClick={() => setSelectedContact({ ...t, contactType: 'TENANT' })}
                  className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]/80 transition-colors cursor-pointer"
                >
                  <TableCell className="font-semibold text-[13px] text-[#222222]">{t.name}</TableCell>
                  <TableCell className="text-[13px] font-mono text-[#717171]">{t.phone}</TableCell>
                  <TableCell className="text-[13px] text-[#717171]">{t.email}</TableCell>
                  <TableCell className="text-[13px] font-medium text-[#222222]">{t.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] font-semibold rounded-full px-2.5 py-0.5">
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedContact({ ...t, contactType: 'TENANT' })
                      }}
                      className="h-8 px-2.5 text-xs font-semibold text-[#ff385c] hover:bg-[#fff8f6] rounded-lg"
                    >
                      Profili Gör
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              landlords.map((l) => (
                <TableRow 
                  key={l.id} 
                  onClick={() => setSelectedContact({ ...l, contactType: 'LANDLORD' })}
                  className="border-b border-[#ebebeb] hover:bg-[#f7f7f7]/80 transition-colors cursor-pointer"
                >
                  <TableCell className="font-semibold text-[13px] text-[#222222]">{l.name}</TableCell>
                  <TableCell className="text-[13px] font-mono text-[#717171]">{l.phone}</TableCell>
                  <TableCell className="text-[13px] text-[#717171]">{l.email}</TableCell>
                  <TableCell className="text-[13px] font-medium text-[#222222]">{l.property}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[11px] font-semibold rounded-full px-2.5 py-0.5 bg-[#f7f7f7] text-[#222222] border border-[#dddddd]">
                      {l.totalProperties} Mülk
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedContact({ ...l, contactType: 'LANDLORD' })
                      }}
                      className="h-8 px-2.5 text-xs font-semibold text-[#ff385c] hover:bg-[#fff8f6] rounded-lg"
                    >
                      Mülkleri Gör
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Kişi / Profil Detay Modalı (Slide-over / Modal) */}
      {selectedContact && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#dddddd] shadow-2xl animate-in zoom-in-95 duration-150 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#ebebeb] pb-4">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-[#ff385c]/10 text-[#ff385c] flex items-center justify-center font-bold text-lg">
                  {selectedContact.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#222222]">{selectedContact.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[11px] font-semibold bg-[#f7f7f7] text-[#222222] border border-[#dddddd]">
                      {selectedContact.contactType === 'TENANT' ? 'Kiracı Profili' : 'Mülk Sahibi Profili'}
                    </Badge>
                    <span className="text-xs text-[#717171]">ID: {selectedContact.id}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedContact(null)}
                className="size-8 rounded-lg hover:bg-[#f7f7f7] text-[#717171] hover:text-[#222222] flex items-center justify-center transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* İletişim Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-[#dddddd] bg-[#fafafa] flex items-center gap-3">
                <Phone className="size-4 text-[#717171]" />
                <div>
                  <span className="text-[11px] text-[#717171] block">Telefon Numarası</span>
                  <a href={`tel:${selectedContact.phone}`} className="text-[13px] font-semibold text-[#222222] font-mono hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
              </div>
              <div className="p-3 rounded-xl border border-[#dddddd] bg-[#fafafa] flex items-center gap-3">
                <Mail className="size-4 text-[#717171]" />
                <div>
                  <span className="text-[11px] text-[#717171] block">E-posta Adresi</span>
                  <a href={`mailto:${selectedContact.email}`} className="text-[13px] font-semibold text-[#222222] hover:underline truncate block max-w-[180px]">
                    {selectedContact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* İlişkili Taşınmazlar & Teslimat Bilgisi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#222222] flex items-center gap-1.5">
                  <Building2 className="size-4 text-[#ff385c]" />
                  {selectedContact.contactType === 'TENANT' ? 'Kiralanan Taşınmaz' : 'Kayıtlı Mülk Portföyü'}
                </h4>
                <span className="text-xs text-[#717171]">
                  {selectedContact.contactType === 'TENANT' ? '1 Taşınmaz' : `${selectedContact.totalProperties || 1} Taşınmaz`}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-[#dddddd] bg-white space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-sm text-[#222222]">{selectedContact.property}</h5>
                    <p className="text-xs text-[#717171] mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 text-[#ff385c]" /> İstanbul
                    </p>
                  </div>
                  <Link href="/properties/prop-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs font-semibold rounded-lg border-[#dddddd] text-[#222222]">
                      Mülke Git <ArrowUpRight className="size-3 ml-1" />
                    </Button>
                  </Link>
                </div>

                <div className="border-t border-[#ebebeb] pt-3 flex items-center justify-between text-xs">
                  <span className="text-[#717171]">Son Teslimat Durumu:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Tamamlandı & Onaylandı (11 Eylül 2026)
                  </span>
                </div>
              </div>

              {selectedContact.contactType === 'LANDLORD' && (selectedContact.totalProperties || 1) > 1 && (
                <div className="p-4 rounded-xl border border-[#dddddd] bg-white space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-sm text-[#222222]">Batışehir Premium Rezidans D:110</h5>
                      <p className="text-xs text-[#717171] mt-0.5 flex items-center gap-1">
                        <MapPin className="size-3 text-[#ff385c]" /> Bağcılar, İstanbul
                      </p>
                    </div>
                    <Link href="/properties/prop-3">
                      <Button size="sm" variant="outline" className="h-7 text-xs font-semibold rounded-lg border-[#dddddd] text-[#222222]">
                        Mülke Git <ArrowUpRight className="size-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  <div className="border-t border-[#ebebeb] pt-3 flex items-center justify-between text-xs">
                    <span className="text-[#717171]">Kiracı:</span>
                    <span className="font-medium text-[#222222]">Selin Kaya</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hızlı İşlemler */}
            <div className="pt-2 border-t border-[#ebebeb] flex items-center justify-end gap-2.5">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedContact(null)}
                className="h-9 px-4 text-xs font-semibold rounded-lg border-[#dddddd]"
              >
                Kapat
              </Button>
              <Link href="/handovers/new?id=ho-101">
                <Button size="sm" className="h-9 px-4 bg-[#ff385c] hover:bg-[#e00b41] text-white text-xs font-semibold rounded-lg">
                  <FileText className="size-3.5 mr-1.5" /> Teslim Tutanaklarını İncele
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

