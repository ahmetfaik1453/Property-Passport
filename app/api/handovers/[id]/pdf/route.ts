import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToStream } from '@react-pdf/renderer'
import { HandoverReportPDF } from '@/lib/pdf/HandoverReportPDF'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const reportData = {
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
    verificationUrl: 'https://propertypassport.app/verify/demo-token-1',
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
