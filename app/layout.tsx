import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="tr" className={cn("h-full bg-slate-50", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-full flex flex-col antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  )
}
