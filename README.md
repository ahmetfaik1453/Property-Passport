# Property Passport — Gayrimenkul Dijital Kayıt ve Evidence Management Platformu

**Version:** V1 MVP  
**Stack:** Next.js (App Router, TypeScript) + Supabase (PostgreSQL, RLS, Storage, Auth) + Tailwind CSS + shadcn/ui + @react-pdf/renderer

---

## 1. Proje Özeti
**Property Passport**, gayrimenkullerin kiralama veya devir aşamalarında (Move-in / Move-out) fiziksel durumunun odalar, demirbaşlar, sayaçlar ve fotoğraflar bazında eksiksiz kayıt altına alınmasını, tarafların (emlakçı, ev sahibi, kiracı) sistem içi onayını ve bu tutanakların kurcalamaya karşı korumalı resmi PDF raporu ve kamuya açık PII-free QR doğrulama belirteci ile arşivlenmesini sağlayan B2B SaaS PropTech platformudur.

---

## 2. Temel Mimari Prensipler (Do Not Reinvent The Wheel)
- **Kimlik Doğrulama & Oturum**: Supabase Auth (`@supabase/ssr`) ile cookie tabanlı güvenli oturum.
- **Veritabanı & İzolasyon**: PostgreSQL + Katı Row-Level Security (RLS). A Acentesi B Acentesinin verilerine erişemez.
- **Dosya Depolama**: Supabase Storage (Private `evidence` ve `documents` bucket'ları; kısa ömürlü Signed URL erişimi).
- **PDF Raporlama**: `@react-pdf/renderer` ile Vercel Serverless uyumlu, Türkçe karakter destekli fatura/tutanak motoru (`/api/handovers/[id]/pdf`).
- **QR Doğrulama**: `qrcode` kütüphanesi ile üretilen ve `/verify/[token]` rotasına yönlendiren token tabanlı doğrulama.
- **Gizlilik İlkesi (Privacy by Design)**: Kamuya açık QR sayfasında mülk sahibi veya kiracı kişisel verileri (TC, telefon, tam ad) ve özel fotoğraflar gösterilmez; yalnızca belge orijinalliği ve temel referans özetlenir.
- **İmmutability**: Teslim tamamlandığında (`COMPLETED`) tutanak salt-okunur kilitlenir; tüm işlemler `audit_logs` tablosuna yazılır.

---

## 3. Kurulum ve Yerel Geliştirme

### Gereksinimler
- Node.js 18+
- npm veya pnpm
- Supabase Hesabı / Projesi

### Adım 1: Depoyu Klonlayın ve Bağımlılıkları Yükleyin
```bash
cd "Property Passport"
npm install
```

### Adım 2: Çevre Değişkenlerini Tanımlayın
`.env.example` dosyasını `.env.local` olarak kopyalayın ve Supabase anahtarlarınızı girin:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Adım 3: Veritabanı Şemasını ve RLS Politikalarını Yükleyin
Supabase Dashboard -> **SQL Editor** bölümüne gidin ve `supabase/migrations/20260911_initial_schema.sql` dosyasının içeriğini çalıştırın.

Bu işlem aşağıdaki tabloları, ilişkileri ve RLS politikalarını oluşturacaktır:
- `profiles`, `agencies`, `agency_members`
- `landlords`, `tenants`, `properties`, `leases`
- `handover_records`, `rooms`, `room_items`
- `inventories`, `meters`, `property_keys`
- `media`, `approvals`, `documents`, `qr_codes`, `audit_logs`

### Adım 4: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

---

## 4. Sayfa ve Rota Haritası
- `/` — Karşılama, değer önerisi ve tanıtım sayfası.
- `/login` — Emlak ofisi ve danışman giriş ekranı.
- `/dashboard` — KPI kartları, mülk özeti ve son teslimat akışı.
- `/properties` — Ajans mülk portföyü ve filtreleme.
- `/properties/new` — Türkiye adres yapısına (İl, İlçe, Mahalle) uygun yeni mülk formu.
- `/handovers/new` — 8 adımlı mobil öncelikli Saha Teslimat Sihirbazı (Oda denetimleri, kamera ile görsel kanıt yükleme, demirbaşlar, sayaçlar, dijital onay, PDF ve QR üretimi).
- `/verify/[token]` — Kamuya açık, PII sızdırmayan dijital kanıt doğrulama sayfası.
- `/api/handovers/[id]/pdf` — Resmi B2B teslim tutanağı PDF akış endpoint'i.

---

## 5. Güvenlik Notları
- Kamuya açık olan tek sayfa `/verify/[token]` rotasıdır ve bu sayfada hiçbir PII verisi (Ad, Soyad, TC, Telefon) yer almaz.
- Tüm veritabanı erişimi RLS `get_user_agency_ids()` üzerinden izole edilmiştir.
- Tamamlanan teslimat kayıtları veritabanı trigger'ı ile dondurulur; manipülasyona karşı korunur.
