import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Property Passport - Dijital Gayrimenkul Kanıt ve Teslim Yönetimi',
  description: 'Taşınmaz devir teslim süreçlerini yapılandırılmış dijital kanıtlar, fotoğraflar, sayaç kayıtları ve doğrulanabilir QR kod ile güvenceye alın.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-full flex flex-col antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  )
}
