import type { Metadata } from 'next'
import HandoversPageClient from './handovers-client'

export const metadata: Metadata = {
  title: 'Teslim Tutanakları | Property Passport',
  description: 'Giriş ve çıkış teslimatları, sayaç kayıtları, oda fotoğrafları ve doğrulanabilir dijital belgeler.',
  alternates: {
    canonical: '/handovers',
  },
}

export default function HandoversPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Teslim Tutanakları | Property Passport',
    description: 'Dijital gayrimenkul teslim ve kanıt tutanakları listesi',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Nidapark Küçükyalı A Blok D:14 Teslim Tutanağı' },
      { '@type': 'ListItem', position: 2, name: 'Vadi İstanbul Park 2. Kısım D:42 Teslim Tutanağı' },
      { '@type': 'ListItem', position: 3, name: 'Batışehir Premium Rezidans D:110 Teslim Tutanağı' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HandoversPageClient />
    </>
  )
}
