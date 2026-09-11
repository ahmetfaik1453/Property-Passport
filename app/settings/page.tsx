import type { Metadata } from 'next'
import SettingsPageClient from './settings-client'

export const metadata: Metadata = {
  title: 'Acente Ayarları | Property Passport',
  description: 'Teslim tutanaklarında basılacak şirket unvanı, iletişim bilgileri ve imza yetkilisi ayarları.',
  alternates: {
    canonical: '/settings',
  },
}

export default function SettingsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Acente Ayarları | Property Passport',
    description: 'Kurumsal acente profili ve dijital kanıt mühürleme parametreleri',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SettingsPageClient />
    </>
  )
}
