import React from 'react'
import path from 'path'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

// Türkçe karakter desteği için Arial TTF fontlarını kaydediyoruz
try {
  Font.register({
    family: 'Arial',
    fonts: [
      { src: path.join(process.cwd(), 'public', 'fonts', 'Arial.ttf') },
      { src: path.join(process.cwd(), 'public', 'fonts', 'Arial-Bold.ttf'), fontWeight: 'bold' }
    ]
  })
} catch (e) {
  console.warn('Font registration error:', e)
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    color: '#1e293b',
    fontFamily: 'Arial',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2,
  },
  docBadge: {
    fontSize: 8,
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '4 8',
    borderRadius: 4,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    padding: '4 6',
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
    marginBottom: 6,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: '4 6',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f1f5f9',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
  },
})

interface HandoverReportPDFProps {
  data: {
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
}

export const HandoverReportPDF: React.FC<HandoverReportPDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>TAŞINMAZ DEVİR TESLİM TUTANAĞI</Text>
          <Text style={styles.subtitle}>Dijital Kanıt ve Durum Tespit Kaydı</Text>
        </View>
        <View style={styles.docBadge}>
          <Text>{data.documentId}</Text>
        </View>
      </View>

      {/* Parties & Property */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. TAŞINMAZ VE TARAF BİLGİLERİ</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Taşınmaz:</Text>
            <Text style={styles.value}>{data.propertyTitle}</Text>
            <Text style={{ fontSize: 8, color: '#475569' }}>{data.address}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Teslim Türü & Tarih:</Text>
            <Text style={styles.value}>{data.handoverType} - {data.handoverDate}</Text>
            <Text style={{ fontSize: 8, color: '#475569' }}>Yetkili Acente: {data.agencyName}</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 6 }]}>
          <View style={styles.col}>
            <Text style={styles.label}>Mülk Sahibi (Landlord):</Text>
            <Text style={styles.value}>{data.landlordName}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Kiracı (Tenant):</Text>
            <Text style={styles.value}>{data.tenantName}</Text>
          </View>
        </View>
      </View>

      {/* Room Inspections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. ODA BAZLI FİZİKSEL DURUM VE DENETİM</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={{ flex: 1.5, fontSize: 8 }}>Oda / Bölüm</Text>
            <Text style={{ flex: 1.2, fontSize: 8 }}>Tespit Edilen Durum</Text>
            <Text style={{ flex: 3, fontSize: 8 }}>Denetim Notları & Açıklama</Text>
          </View>
          {data.rooms.map((room, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={{ flex: 1.5, fontSize: 8, fontWeight: 'bold' }}>{room.name}</Text>
              <Text style={{ flex: 1.2, fontSize: 8 }}>{room.condition}</Text>
              <Text style={{ flex: 3, fontSize: 8, color: '#475569' }}>{room.notes}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Meters & Keys */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. SAYAÇ OKUMALARI VE TESLİM EDİLEN ANAHTARLAR</Text>
        <View style={styles.row}>
          <View style={[styles.col, { marginRight: 10 }]}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 2 }}>Sayaçlar (Endeks)</Text>
            {data.meters.map((meter, idx) => (
              <Text key={idx} style={{ fontSize: 8, color: '#334155', marginBottom: 2 }}>
                • {meter.type}: <Text style={{ fontWeight: 'bold' }}>{meter.value} {meter.unit}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.col}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 2 }}>Anahtarlar</Text>
            {data.keys.map((key, idx) => (
              <Text key={idx} style={{ fontSize: 8, color: '#334155', marginBottom: 2 }}>
                • {key.type}: <Text style={{ fontWeight: 'bold' }}>{key.quantity} Adet</Text>
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Verification Notice */}
      <View style={[styles.section, { marginTop: 10, padding: 8, backgroundColor: '#f8fafc', borderRadius: 4 }]}>
        <Text style={{ fontSize: 8, fontWeight: 'bold', color: '#1e293b' }}>
          DİJİTAL DOĞRULAMA VE İSPAT MEKANİZMASI:
        </Text>
        <Text style={{ fontSize: 7, color: '#64748b', marginTop: 2 }}>
          Bu tutanağın orijinal hali, sisteme yüklenen tüm yüksek çözünürlüklü oda fotoğrafları ve tarafların dijital onay kayıtları Property Passport güvencesindedir. Belgenin orijinalliği {data.verificationUrl} adresinden doğrulanabilir.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Property Passport Dijital Kayıt Sistemi — Sayfa 1 / 1 — Yasal Uyarı: Bu belge sistem içi durum beyanıdır; resmi e-imza kanunu kapsamındaki nitelikli sertifika yerine geçmez.
        </Text>
      </View>
    </Page>
  </Document>
)
