# GAYRİMENKUL DİJİTAL KAYIT VE EVIDENCE MANAGEMENT PLATFORM (PROPERTY PASSPORT)
## V1 MVP MASTER ARCHITECTURAL SPECIFICATION & RESEARCH REPORT (MADDE 181)

**Tarih:** 11 Eylül 2026  
**Durum:** Planlama & Mimari İnceleme Aşaması (Kod yazılmadan önceki resmi rapor)  
**Doküman Tipi:** Master Architecture Report & Technology Decision Records (TDR)

---

## 1. PRODUCT ARCHITECTURE (ÜRÜN MİMARİSİ)

### 1.1 Değer Önerisi ve Çözülen Problem
Taşınmazların (konut/ticari) kiralama veya devir aşamalarında (Move-in / Move-out) fiziksel durumunun eksik, dağınık veya manipülasyona açık şekilde tutulması yıllar sonra taraflar (ev sahibi, kiracı, emlakçı) arasında telafisi zor itilaflara yol açar.
**Property Passport**, taşınmazın devir anındaki fiziksel durumunu;
- Hiyerarşik ve ilişkisel oda/demirbaş/sayaç bazında,
- Görsel/işitsel kanıtlarla (fotoğraf, video),
- Tarafların (kiracı ve ev sahibi) sistem içi doğrulanabilir onayıyla,
- Kurcalamaya karşı korumalı (tamamlandıktan sonra salt okunur) bir denetim günlüğü (audit log) ve değiştirilemez PDF raporuyla,
- PII (kişisel veri) sızdırmayan kamuya açık kriptografik doğrulama belirteci (Public QR Verification) ile kayıt altına alan B2B SaaS PropTech platformudur.

### 1.2 Kullanıcı Rolleri ve Erişim Matrisi
1. **AGENCY_ADMIN**: Emlak ofisi sahibi/yöneticisi. Ofis profilini yönetir, danışmanları (agent) davet eder, ofise ait tüm portföyü ve teslim tutanaklarını denetler.
2. **AGENT (Emlak Danışmanı)**: Sahada mülk oluşturan, odaları gezen, kanıtları yükleyen, teslim sürecini (Handover Wizard) yöneten ve onaya sunan ana operatör.
3. **LANDLORD (Mülk Sahibi)**: İlgili mülkün kiralama ve teslim tutanaklarını görüntüleyen, teslim durumunu onaylayan/reddeden paydaş.
4. **TENANT (Kiracı)**: Kendisine atanan kiralama/teslim tutanağını inceleyen, teslim durumunu onaylayan/reddeden paydaş.
5. **PUBLIC / ANONYMOUS**: Yalnızca oluşturulan PDF üzerindeki güvenli QR kodu okutarak belgenin geçerliliğini ve temel doğrulama meta verilerini (PII içermeksizin) görüntüleyen üçüncü şahıslar.

---

## 2. SYSTEM ARCHITECTURE (SİSTEM MİMARİSİ)

```text
                               +--------------------------------------------+
                               |              CLIENT DEVICES                |
                               |  - Mobile Browser (Saha / Mobil Öncelikli) |
                               |  - Desktop Browser (Ofis / Yönetim)        |
                               +---------------------+----------------------+
                                                     |
                                                     | HTTPS / WSS
                                                     v
                               +--------------------------------------------+
                               |        NEXT.JS APP ROUTER (VERCEL)         |
                               |                                            |
                               |  +--------------------+ +----------------+ |
                               |  | Server Components  | | Client Comps.  | |
                               |  | (RSC - Default)    | | (Interactivity)| |
                               |  +---------+----------+ +--------+-------+ |
                               |            |                     |         |
                               |  +---------v---------------------v-------+ |
                               |  |       Server Actions / Route Handlers | |
                               |  |   (Zod Validation, Domain Services)   | |
                               |  +--------------------+------------------+ |
                               +-----------------------+--------------------+
                                                       |
                          +----------------------------+----------------------------+
                          |                                                         |
                          v                                                         v
        +-----------------------------------+                     +-----------------------------------+
        |       SUPABASE AUTH & DB          |                     |         SUPABASE STORAGE          |
        |                                   |                     |                                   |
        | - Supabase Auth (SSR Cookies)     |                     | - Private Bucket: 'evidence'      |
        | - PostgreSQL (Row Level Security) |                     | - Private Bucket: 'documents'     |
        | - Audit Triggers & Transactions   |                     | - Signed URLs / Resizing          |
        | - Multi-tenant Agency Isolation   |                     | - Strict Storage RLS Policies     |
        +-----------------------------------+                     +-----------------------------------+
```

---

## 3. DATABASE SCHEMA (VERİTABANI ŞEMASI)

Tüm ID'ler `UUIDv4` standardındadır.

```sql
-- 1. PROFILES & MULTI-TENANCY
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tax_number TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE agency_role AS ENUM ('AGENCY_ADMIN', 'AGENT');
CREATE TABLE agency_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role agency_role NOT NULL DEFAULT 'AGENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(agency_id, user_id)
);

-- 2. CONTACTS (LANDLORDS & TENANTS)
CREATE TABLE landlords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    identity_no TEXT, -- TC Kimlik (maskeli/hassas)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    identity_no TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROPERTIES & LEASES
CREATE TYPE property_status AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    building TEXT,
    floor TEXT,
    unit_number TEXT,
    room_count TEXT NOT NULL, -- örn: 3+1
    area_m2 NUMERIC(7,2) NOT NULL,
    description TEXT,
    status property_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE lease_status AS ENUM ('DRAFT', 'ACTIVE', 'ENDED', 'CANCELLED');
CREATE TABLE leases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    landlord_id UUID NOT NULL REFERENCES landlords(id) ON DELETE RESTRICT,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE,
    rent_amount NUMERIC(12,2),
    currency VARCHAR(3) DEFAULT 'TRY',
    deposit_amount NUMERIC(12,2),
    status lease_status NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. HANDOVER RECORDS
CREATE TYPE handover_type AS ENUM ('MOVE_IN', 'MOVE_OUT');
CREATE TYPE handover_status AS ENUM ('DRAFT', 'IN_PROGRESS', 'PENDING_APPROVAL', 'COMPLETED', 'CANCELLED');
CREATE TABLE handover_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    lease_id UUID REFERENCES leases(id) ON DELETE SET NULL,
    type handover_type NOT NULL,
    status handover_status NOT NULL DEFAULT 'DRAFT',
    handover_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by UUID NOT NULL REFERENCES profiles(id),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ROOMS & ITEMS
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Salon, Mutfak, vb.
    room_type TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    overall_condition TEXT DEFAULT 'GOOD',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE item_condition AS ENUM ('GOOD', 'USED', 'DAMAGED', 'SCRATCHED', 'BROKEN', 'NOT_WORKING', 'REQUIRES_ATTENTION');
CREATE TABLE room_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Duvarlar, Parke, Pencereler, Kapı
    category TEXT DEFAULT 'STRUCTURAL',
    condition item_condition NOT NULL DEFAULT 'GOOD',
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. INVENTORIES, METERS, KEYS
CREATE TABLE inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    name TEXT NOT NULL, -- Buzdolabı, Kombi, vb.
    brand TEXT,
    model TEXT,
    serial_number TEXT,
    condition item_condition NOT NULL DEFAULT 'GOOD',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE meter_type AS ENUM ('ELECTRICITY', 'WATER', 'NATURAL_GAS', 'OTHER');
CREATE TABLE meters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    type meter_type NOT NULL,
    meter_number TEXT,
    current_value NUMERIC(12,3) NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kWh', -- kWh, m3 vb.
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE property_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- Daire Kapısı, Bina Giriş, Posta Kutusu
    quantity INT NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. EVIDENCE / MEDIA
CREATE TYPE media_type AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    room_item_id UUID REFERENCES room_items(id) ON DELETE SET NULL,
    inventory_id UUID REFERENCES inventories(id) ON DELETE SET NULL,
    meter_id UUID REFERENCES meters(id) ON DELETE SET NULL,
    key_id UUID REFERENCES property_keys(id) ON DELETE SET NULL,
    type media_type NOT NULL DEFAULT 'IMAGE',
    storage_path TEXT NOT NULL,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES profiles(id),
    captured_at TIMESTAMPTZ,
    -- Future V2 readiness fields:
    content_hash TEXT,
    hash_algorithm TEXT DEFAULT 'SHA-256',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. APPROVALS & SIGN-OFFS
CREATE TYPE approval_role AS ENUM ('AGENT', 'LANDLORD', 'TENANT');
CREATE TYPE approval_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id),
    signer_name TEXT NOT NULL,
    signer_role approval_role NOT NULL,
    status approval_status NOT NULL DEFAULT 'PENDING',
    rejection_reason TEXT,
    ip_address TEXT,
    user_agent TEXT,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(handover_id, signer_role)
);

-- 9. DOCUMENTS & QR VERIFICATION TOKENS
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    version INT NOT NULL DEFAULT 1,
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    generated_by UUID NOT NULL REFERENCES profiles(id),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES handover_records(id) ON DELETE CASCADE,
    public_token TEXT NOT NULL UNIQUE, -- Yüksek entropili CSPRNG token
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- 10. AUDIT LOGS (IMMUTABLE)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL, -- HANDOVER_CREATED, MEDIA_UPLOADED, etc.
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 4. ROW LEVEL SECURITY (RLS) STRATEGY

Tüm tablolarda `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` zorunludur.

### Multi-Tenant Hiyerarşik Yetki Kontrolü (Postgres Helper Functions):
```sql
-- Kullanıcının bağlı olduğu ajans ID'lerini döndüren güvenli RLS fonksiyonu
CREATE OR REPLACE FUNCTION get_user_agency_ids()
RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT agency_id FROM agency_members WHERE user_id = auth.uid();
$$;

-- Emlakçı kontrolü
CREATE OR REPLACE FUNCTION is_agency_member(target_agency_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT EXISTS (
        SELECT 1 FROM agency_members 
        WHERE agency_id = target_agency_id AND user_id = auth.uid()
    );
$$;
```

---

## 5. STORAGE STRATEGY (DOSYA DEPOLAMA MİMARİSİ)

### Bucket Yapısı (Private)
- `evidence`: Orijinal fotoğraflar, videolar, küçük resimler (thumbnails).
- `documents`: Üretilen imzalı/resmi devir teslim PDF belgeleri.

### Dizin Formatı
```text
evidence/
  properties/{property_id}/handovers/{handover_id}/
    rooms/{room_id}/{media_id}_original.webp
    rooms/{room_id}/{media_id}_thumb.webp
    meters/{meter_id}/{media_id}.webp
documents/
  properties/{property_id}/handovers/{handover_id}/handover_report_v{version}.pdf
```

---

## 6. AUTHENTICATION STRATEGY (KİMLİK DOĞRULAMA)

- **Supabase Auth SSR** standardı: `@supabase/ssr` paketi ile cookie-tabanlı session yönetimi.
- Next.js `middleware.ts` üzerinden korumalı sayfaların (`/dashboard/*`, `/properties/*`, vb.) kontrolü.
- Kullanıcı kaydında (SignUp), PostgreSQL trigger'ı `auth.users` tablosundan otomatik olarak `public.profiles` tablosuna kayıt oluşturur.

---

## 7. ROUTE MAP (SAYFA VE YÖNLENDİRME HARİTASI)

```text
/ (Marketing & Giriş Yönlendirme)
├── /login (Giriş Yap)
├── /register (Kayıt Ol)
├── /forgot-password (Şifre Sıfırlama)
│
├── /dashboard (Özet İstatistikler, Son Teslimatlar, Hızlı Aksiyonlar)
│
├── /properties (Mülk Listesi - Arama, Filtreleme, Durum)
├── /properties/new (Yeni Mülk Tanımlama)
├── /properties/[id] (Mülk Detayı - Tablar: Genel, Odalar, Demirbaşlar, Teslimatlar)
├── /properties/[id]/edit (Mülk Düzenleme)
│
├── /properties/[id]/handover/new (Yeni Teslim Başlatma Sihirbazı)
├── /handovers/[handoverId] (Teslim Süreci Ana Ekranı / Wizard)
│   ├── Step 1: Mülk & Taraflar (Mülk sahibi, kiracı seçimi)
│   ├── Step 2: Odalar & Kontroller (Oda durumu, duvar, zemin, kapı incelemesi)
│   ├── Step 3: Kanıt Yükleme (Fotoğraf / Video - Odaya & Öğeye bağlı)
│   ├── Step 4: Demirbaşlar (Beyaz eşya, mobilya durumu)
│   ├── Step 5: Sayaçlar & Anahtarlar (Elektrik, su, gaz değerleri ve sayaç fotosu, anahtarlar)
│   ├── Step 6: İnceleme & Özet (Eksik alan kontrolü)
│   ├── Step 7: Onay Akışı (Kiracı & Ev sahibi sistem içi onayı)
│   └── Step 8: Tamamlama, PDF & QR Üretimi
│
├── /verify/[token] (KAMUYA AÇIK - Minimal Kanıt Doğrulama Sayfası, PII YOK)
│
└── /settings
    ├── /settings/profile (Profil bilgileri)
    ├── /settings/agency (Ajans ayarları, logo, adres)
    └── /settings/members (Danışman yönetimi ve davetler)
```

---

## 8. COMPONENT MAP (BİLEŞEN HARİTASI)

### Generic UI Primitives (`components/ui/*` - shadcn/ui):
- `button`, `dialog`, `drawer` (mobil için bottom sheet), `card`, `input`, `textarea`, `badge`, `select`, `table`, `tabs`, `toast`, `alert-dialog`, `skeleton`, `progress`.

### Domain Components:
- **Property**: `PropertyCard`, `PropertyForm`, `PropertyTimeline`.
- **Handover Wizard**: `HandoverWizard`, `RoomInspectionCard`, `CustomItemDialog`, `EvidenceUploader`, `MeterReadingEditor`, `KeyInventoryEditor`, `HandoverSummaryReview`, `ApprovalPanel`.
- **Document & Verification**: `DocumentViewer`, `QRCodeCard`, `VerificationBadge`.

---

## 9. DEPENDENCY MAP & COMPARISON (AÇIK KAYNAK VE KÜTÜPHANE ARAŞTIRMASI)

| İhtiyaç | Seçilen Kütüphane | Alternatifler | Neden Seçildi? | Lisans |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | `next` (v15+) + `react` (v19) | Vite SPA, Remix | Next.js App Router, SSR, Server Actions, Vercel entegrasyonu | MIT |
| **BaaS / Veritabanı** | `@supabase/supabase-js` + `@supabase/ssr` | Firebase, Custom Express/Prisma | RLS, PostgreSQL, Storage ve Auth hepsi bir arada | Apache-2.0 / MIT |
| **UI Primitives** | Radix UI / `shadcn/ui` | MUI, Ant Design, Mantine | Zero-runtime CSS, kopyalanabilir ve genişletilebilir, headless erişilebilirlik | MIT |
| **Stil Sistemi** | `tailwindcss` | Emotion, Styled Components | Performans, standardizasyon, küçük bundle | MIT |
| **İkonlar** | `lucide-react` | FontAwesome, React Icons | Tutarlı, modern B2B SaaS estetiği, hafif | ISC |
| **Form Yönetimi** | `react-hook-form` | Formik | Re-render performansı, küçük bundle, esnek yapı | MIT |
| **Validasyon** | `zod` | Yup, Joi | TypeScript ile kusursuz entegrasyon, client+server ortak şema | MIT |
| **Tablo** | `@tanstack/react-table` | DataGrid | Headless, esnek filtreleme, sayfalama ve sorting | MIT |
| **Tarih İşlemleri** | `date-fns` | Moment.js, Day.js | Fonksiyonel, tree-shakeable, hafif, Türkçe yerelleştirme desteği | MIT |
| **Görsel Sıkıştırma** | `browser-image-compression` | Canvas custom | İstemci tarafında upload öncesi hızlı sıkıştırma (mobil veri ve storage tasarrufu) | MIT |
| **PDF Üretimi** | `@react-pdf/renderer` | Puppeteer, jsPDF, html2pdf | React JSX yapısıyla deklaratif tasarım, Türkçe font desteği, Vercel serverless uyumluluğu | MIT |
| **QR Kod Üretimi** | `qrcode` | qrcode.react, custom SVG | Hem sunucuda (PDF için buffer/data URL) hem istemcide çalışan olgun kütüphane | MIT |

---

## 10. TECHNOLOGY DECISION RECORDS (TDR)

### TDR 01: PDF Generation Engine
- **Seçilen Çözüm**: `@react-pdf/renderer`
- **Seçim Gerekçesi**: Puppeteer'ın ağır Vercel paket boyutu ve soğuk başlatma sorunlarından kaçınmak, jsPDF'in stil/düzen tutarsızlıklarını bertaraf etmek ve React bileşen deklaratifliği ile temiz, Türkçe karakter destekli fatura/tutanak PDF'leri üretmek.

### TDR 02: QR Code Generation
- **Seçilen Çözüm**: `qrcode` (npm)
- **Seçim Gerekçesi**: Hem sunucuda (PDF içerisine Base64/Buffer basmak için) hem tarayıcıda sıfır dış API çağrısı ile anlık güvenli QR üretir.

### TDR 03: State & Form Management
- **Seçilen Çözüm**: `react-hook-form` + `zod`
- **Seçim Gerekçesi**: Form doğrulamasında tip güvenliği, sıfır gereksiz re-render ve harici global state kütüphanesi karmaşıklığı olmadan draft yönetimi.

---

## 11. SECURITY RISKS & COUNTERMEASURES
- **Multi-tenant İzolasyonu**: Katı PostgreSQL RLS (`get_user_agency_ids()`).
- **PII Sızıntısı Engeli**: Kamuya açık doğrulama endpoint'i yalnızca referans kod, tarih ve geçerlilik döner; kiracı/ev sahibi kimlik ve fotoğrafları gizlenir.
- **Değiştirilemezlik (Immutability)**: Handover tamamlandığında (`COMPLETED`) trigger ile güncelleme kilitlenir, audit log yalnızca ekleme (append-only) olarak tutulur.

---

## 12. DEVELOPMENT PHASES (AŞAMALI PLANI)
- **Phase 1**: Temel Proje Yapısı (Next.js, Tailwind, shadcn, Supabase SSR, Auth)
- **Phase 2**: Portföy & Taraf Yönetimi (Mülkler, Ev Sahibi, Kiracı, Kiralama)
- **Phase 3 & 4**: Handover Sihirbazı & Kanıt Yükleme (Oda denetimi, hasar durumları, fotoğraf/video yükleme)
- **Phase 5**: Demirbaş, Sayaçlar ve Anahtarlar
- **Phase 6**: Denetim Özeti, Taraf Onayı & İmmutable Audit Log
- **Phase 7**: Profesyonel PDF Tutanak Raporlama Motoru
- **Phase 8**: Kamuya Açık QR Kod & Doğrulama Sayfası (`/verify/[token]`)
- **Phase 9**: Test ve Güvenlik Doğrulaması (RLS & Multi-tenant sızıntı testleri)
- **Phase 10**: Dokümantasyon & README
