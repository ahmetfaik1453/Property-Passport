import type { Metadata } from 'next'
import NewPropertyPageClient from './new-property-client'

export const metadata: Metadata = {
  title: 'Yeni Mülk Tanımla | Property Passport',
  description: 'Taşınmaz adres hiyerarşisi, tapu/bina bilgisi ve temel fiziksel özelliklerini sisteme kaydedin.',
  alternates: {
    canonical: '/properties/new',
  },
}

export default function NewPropertyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Yeni Mülk Tanımla | Property Passport',
    description: 'Taşınmaz kayıt ve tanımlama formu',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewPropertyPageClient />
    </>
  )
}
