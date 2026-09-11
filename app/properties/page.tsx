import type { Metadata } from 'next'
import PropertiesPageClient from './properties-client'

export const metadata: Metadata = {
  title: 'Mülk Portföyü | Property Passport',
  description: 'Ajansınıza kayıtlı taşınmazlar, oda dökümleri, kiracı geçmişi ve kanıt tutanakları.',
  alternates: {
    canonical: '/properties',
  },
}

export default function PropertiesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mülk Portföyü | Property Passport',
    description: 'Ajansınıza ait taşınmaz ve bağımsız bölüm listesi',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Nidapark Küçükyalı A Blok D:14' },
      { '@type': 'ListItem', position: 2, name: 'Vadi İstanbul Park 2. Kısım D:42' },
      { '@type': 'ListItem', position: 3, name: 'Batışehir Premium Rezidans D:110' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertiesPageClient />
    </>
  )
}
