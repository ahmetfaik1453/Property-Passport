import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <p className="text-sm text-slate-500 mt-2 mb-6">Aradığınız sayfa bulunamadı veya taşınmış olabilir.</p>
      <Link href="/">
        <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
          <ArrowLeft className="size-4" /> Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  )
}
