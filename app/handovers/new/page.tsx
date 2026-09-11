import type { Metadata } from 'next'
import HandoverWizardPageClient from './handover-wizard-client'

export const metadata: Metadata = {
  title: 'Teslim Tutanağı Başlat | Property Passport',
  description: '8 adımlı saha denetimi, oda ve demirbaş tespit tutanağı hazırlama sihirbazı.',
  alternates: {
    canonical: '/handovers/new',
  },
}

export default function HandoverWizardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Teslim Tutanağı Başlat | Property Passport',
    description: '8 adımlı saha teslimat ve durum tespit sihirbazı',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HandoverWizardPageClient />
    </>
  )
}
