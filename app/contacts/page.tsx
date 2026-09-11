import type { Metadata } from 'next'
import ContactsPageClient from './contacts-client'

export const metadata: Metadata = {
  title: 'Kişiler & Rehber | Property Passport',
  description: 'Teslim tutanaklarında taraf olan kiracı ve maliklerin iletişim ve mülk eşleştirmeleri rehberi.',
  alternates: {
    canonical: '/contacts',
  },
}

export default function ContactsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Kişiler & Rehber | Property Passport',
    description: 'Ev sahipleri ve kiracılar iletişim rehberi',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactsPageClient />
    </>
  )
}
