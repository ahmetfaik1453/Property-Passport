import type { Metadata } from 'next'
import DashboardPageClient from './dashboard-client'

export const metadata: Metadata = {
  title: 'Yönetim Paneli | Property Passport',
  description: 'Aktif portföy, saha denetimleri ve doğrulanabilir dijital kanıt kayıtları yönetim merkezi.',
  alternates: {
    canonical: '/dashboard',
  },
}

import React, { Suspense } from 'react'

export default function DashboardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Yönetim Paneli | Property Passport',
    description: 'Aktif portföy, saha denetimleri ve doğrulanabilir dijital kanıt kayıtları yönetim merkezi.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'Yönetim Paneli', item: '/dashboard' },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Yükleniyor...</div>}>
        <DashboardPageClient />
      </Suspense>
    </>
  )
}
