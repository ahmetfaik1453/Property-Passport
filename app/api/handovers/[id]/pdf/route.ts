import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToStream } from '@react-pdf/renderer'
import { HandoverReportPDF } from '@/lib/pdf/HandoverReportPDF'

interface PropertyReportModel {
  documentId: string
  handoverDate: string
  handoverType: string
  propertyTitle: string
  address: string
  agencyName: string
  landlordName: string
  tenantName: string
  rooms: Array<{ name: string; condition: string; notes: string }>
  meters: Array<{ type: string; value: string; unit: string }>
  keys: Array<{ type: string; quantity: number }>
  verificationUrl: string
}

const handoverReportsData: Record<string, PropertyReportModel> = {
  'ho-101': {
    documentId: 'DOC-TR-2026-HO-101',
    handoverDate: '11 Eylül 2026',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyTitle: 'Nidapark Küçükyalı A Blok D:14',
    address: 'Küçükyalı Mah. İnönü Cad. No:14 D:14 Maltepe / İstanbul',
    agencyName: 'Prestij Gayrimenkul',
    landlordName: 'Ali Kaya',
    tenantName: 'Ahmet Yılmaz',
    rooms: [
      { name: 'Salon', condition: 'İyi / Temiz', notes: 'Parke ve duvarlar hasarsız, boya yeni.' },
      { name: 'Mutfak', condition: 'İyi / Temiz', notes: 'Tezgah ve dolap kapakları sağlam, evye çalışır durumda.' },
      { name: 'Yatak Odası', condition: 'Çizik / Yıpranmış', notes: 'Giriş kapısı arkasında süpürgelikte küçük çizik mevcut.' },
      { name: 'Banyo', condition: 'İyi / Temiz', notes: 'Duşakabin ve armatürler kusursuz, sızıntı yok.' },
    ],
    meters: [
      { type: 'Elektrik', value: '1428.5', unit: 'kWh' },
      { type: 'Su', value: '382.1', unit: 'm³' },
      { type: 'Doğalgaz', value: '219.0', unit: 'm³' },
    ],
    keys: [
      { type: 'Daire Çelik Kapı Anahtarı', quantity: 3 },
      { type: 'Bina Dış Giriş Çipi', quantity: 2 },
      { type: 'Posta Kutusu Anahtarı', quantity: 1 },
    ],
    verificationUrl: 'https://property-passport-livid.vercel.app/verify/demo-token-1',
  },
  'prop-1': {
    documentId: 'DOC-TR-2026-HO-101',
    handoverDate: '11 Eylül 2026',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyTitle: 'Nidapark Küçükyalı A Blok D:14',
    address: 'Küçükyalı Mah. İnönü Cad. No:14 D:14 Maltepe / İstanbul',
    agencyName: 'Prestij Gayrimenkul',
    landlordName: 'Ali Kaya',
    tenantName: 'Ahmet Yılmaz',
    rooms: [
      { name: 'Salon', condition: 'İyi / Temiz', notes: 'Parke ve duvarlar hasarsız, boya yeni.' },
      { name: 'Mutfak', condition: 'İyi / Temiz', notes: 'Tezgah ve dolap kapakları sağlam, evye çalışır durumda.' },
      { name: 'Yatak Odası', condition: 'Çizik / Yıpranmış', notes: 'Giriş kapısı arkasında süpürgelikte küçük çizik mevcut.' },
      { name: 'Banyo', condition: 'İyi / Temiz', notes: 'Duşakabin ve armatürler kusursuz, sızıntı yok.' },
    ],
    meters: [
      { type: 'Elektrik', value: '1428.5', unit: 'kWh' },
      { type: 'Su', value: '382.1', unit: 'm³' },
      { type: 'Doğalgaz', value: '219.0', unit: 'm³' },
    ],
    keys: [
      { type: 'Daire Çelik Kapı Anahtarı', quantity: 3 },
      { type: 'Bina Dış Giriş Çipi', quantity: 2 },
      { type: 'Posta Kutusu Anahtarı', quantity: 1 },
    ],
    verificationUrl: 'https://property-passport-livid.vercel.app/verify/demo-token-1',
  },
  'ho-102': {
    documentId: 'DOC-TR-2026-HO-102',
    handoverDate: '10 Eylül 2026',
    handoverType: 'Çıkış Teslimatı (Move-Out)',
    propertyTitle: 'Vadi İstanbul Park 2. Kısım D:42',
    address: 'Ayazağa Mah. Cendere Cad. Vadi Park Sit. D:42 Sarıyer / İstanbul',
    agencyName: 'Prestij Gayrimenkul',
    landlordName: 'Fatma Şahin',
    tenantName: 'Mehmet Demir',
    rooms: [
      { name: 'Geniş Salon', condition: 'İyi / Temiz', notes: 'Masif parke cilası yeni, balkon kapısı çift cam.' },
      { name: 'Ada Mutfak', condition: 'İyi / Temiz', notes: 'Ada davlumbaz ve bulaşık makinesi dahil.' },
      { name: 'Ebeveyn Yatak Odası', condition: 'İyi / Temiz', notes: 'Giyinme odası dolapları kusursuz.' },
      { name: 'Çocuk Odası', condition: 'İyi / Temiz', notes: 'Duvar kağıdı sağlam, prizler korumalı.' },
      { name: 'Ebeveyn Banyosu', condition: 'İyi / Temiz', notes: 'Jakuzili küvet ve gömme rezervuar.' },
    ],
    meters: [
      { type: 'Elektrik', value: '4192.0', unit: 'kWh' },
      { type: 'Su', value: '891.4', unit: 'm³' },
      { type: 'Isı Pay Ölçer', value: '741.0', unit: 'MWh' },
    ],
    keys: [
      { type: 'Daire Çelik Kapı Anahtarı', quantity: 4 },
      { type: 'Otopark Kumandası', quantity: 2 },
      { type: 'Posta Kutusu Anahtarı', quantity: 1 },
    ],
    verificationUrl: 'https://property-passport-livid.vercel.app/verify/demo-token-vadi',
  },
  'prop-2': {
    documentId: 'DOC-TR-2026-HO-102',
    handoverDate: '10 Eylül 2026',
    handoverType: 'Çıkış Teslimatı (Move-Out)',
    propertyTitle: 'Vadi İstanbul Park 2. Kısım D:42',
    address: 'Ayazağa Mah. Cendere Cad. Vadi Park Sit. D:42 Sarıyer / İstanbul',
    agencyName: 'Prestij Gayrimenkul',
    landlordName: 'Fatma Şahin',
    tenantName: 'Mehmet Demir',
    rooms: [
      { name: 'Geniş Salon', condition: 'İyi / Temiz', notes: 'Masif parke cilası yeni, balkon kapısı çift cam.' },
      { name: 'Ada Mutfak', condition: 'İyi / Temiz', notes: 'Ada davlumbaz ve bulaşık makinesi dahil.' },
      { name: 'Ebeveyn Yatak Odası', condition: 'İyi / Temiz', notes: 'Giyinme odası dolapları kusursuz.' },
      { name: 'Çocuk Odası', condition: 'İyi / Temiz', notes: 'Duvar kağıdı sağlam, prizler korumalı.' },
      { name: 'Ebeveyn Banyosu', condition: 'İyi / Temiz', notes: 'Jakuzili küvet ve gömme rezervuar.' },
    ],
    meters: [
      { type: 'Elektrik', value: '4192.0', unit: 'kWh' },
      { type: 'Su', value: '891.4', unit: 'm³' },
      { type: 'Isı Pay Ölçer', value: '741.0', unit: 'MWh' },
    ],
    keys: [
      { type: 'Daire Çelik Kapı Anahtarı', quantity: 4 },
      { type: 'Otopark Kumandası', quantity: 2 },
      { type: 'Posta Kutusu Anahtarı', quantity: 1 },
    ],
    verificationUrl: 'https://property-passport-livid.vercel.app/verify/demo-token-vadi',
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const reportData = handoverReportsData[id] || {
    documentId: `DOC-TR-2026-${id.slice(0, 6).toUpperCase()}`,
    handoverDate: '11 Eylül 2026',
    handoverType: 'Giriş Teslimatı (Move-In)',
    propertyTitle: 'Nidapark Küçükyalı A Blok D:14',
    address: 'Küçükyalı Mah. İnönü Cad. No:14 D:14 Maltepe / İstanbul',
    agencyName: 'Prestij Gayrimenkul',
    landlordName: 'Ali Kaya',
    tenantName: 'Ahmet Yılmaz',
    rooms: [
      { name: 'Salon', condition: 'İyi / Temiz', notes: 'Parke ve duvarlar hasarsız, boya yeni.' },
      { name: 'Mutfak', condition: 'İyi / Temiz', notes: 'Tezgah ve dolap kapakları sağlam, evye çalışır durumda.' },
      { name: 'Yatak Odası', condition: 'Çizik / Yıpranmış', notes: 'Giriş kapısı arkasında süpürgelikte küçük çizik mevcut.' },
      { name: 'Banyo', condition: 'İyi / Temiz', notes: 'Duşakabin ve armatürler kusursuz, sızıntı yok.' },
    ],
    meters: [
      { type: 'Elektrik', value: '1428.5', unit: 'kWh' },
      { type: 'Su', value: '382.1', unit: 'm³' },
      { type: 'Doğalgaz', value: '219.0', unit: 'm³' },
    ],
    keys: [
      { type: 'Daire Çelik Kapı Anahtarı', quantity: 3 },
      { type: 'Bina Dış Giriş Çipi', quantity: 2 },
      { type: 'Posta Kutusu Anahtarı', quantity: 1 },
    ],
    verificationUrl: 'https://property-passport-livid.vercel.app/verify/demo-token-1',
  }

  try {
    const pdfDoc = HandoverReportPDF({ data: reportData })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await renderToStream(pdfDoc as any)

    const readable = new ReadableStream({
      async start(controller) {
        stream.on('data', (chunk: Buffer) => controller.enqueue(chunk))
        stream.on('end', () => controller.close())
        stream.on('error', (err: Error) => controller.error(err))
      },
    })

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Teslim_Tutanagi_${reportData.documentId}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json({ error: 'PDF oluşturulamadı' }, { status: 500 })
  }
}
