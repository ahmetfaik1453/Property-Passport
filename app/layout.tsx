import type { Metadata, Viewport } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
}

// Vercel deployment veya environment URL
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://property-passport-livid.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Property Passport - Gayrimenkul Teslim Yönetimi',
    template: '%s | Property Passport',
  },
  description: 'Taşınmaz devir teslim süreçlerini yapılandırılmış dijital kanıtlar, sayaç kayıtları ve doğrulanabilir QR kod ile güvenceye alın.',
  keywords: [
    'gayrimenkul teslim tutanağı',
    'dijital mülk pasaportu',
    'kiracı tahliye teslim',
    'demirbaş tespit tutanağı',
    'sayaç okuma kanıtı',
    'emlak teslim yönetimi',
  ],
  authors: [{ name: 'Property Passport' }],
  creator: 'Property Passport',
  publisher: 'Property Passport',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    title: 'Property Passport - Gayrimenkul Teslim Yönetimi',
    description: 'Taşınmaz devir teslim süreçlerini fotoğraflar, sayaç kayıtları ve doğrulanabilir QR kod ile güvenceye alın.',
    siteName: 'Property Passport',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Passport - Gayrimenkul Teslim Yönetimi',
    description: 'Taşınmaz devir teslim süreçlerini dijital kanıtlarla ihtilafsız yönetin.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={cn("h-full bg-slate-50", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-full flex flex-col antialiased text-slate-900 selection:bg-slate-900 selection:text-white`}>
        {children}
      </body>
    </html>
  )
}
