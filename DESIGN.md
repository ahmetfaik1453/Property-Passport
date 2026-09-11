# Airbnb Design System Specification & Token Guide — Property Passport

> Bu doküman, sağlanan Airbnb Tasarım Analizinin (`Airbnb-design-analysis`) token'larını, tipografisini, renk paletini ve bileşen kurallarını Property Passport platformu için tek referans noktası (Single Source of Truth) olarak tanımlar.

---

## 1. Color Tokens (Renk Paleti)

Airbnb'nin saf beyaz tuval (`canvas`), derin koyu mürekkep (`ink`) ve tekil marka voltajı olan **Rausch** (`#ff385c`) ekseninde yapılandırılmıştır.

| Token Adı | Hex Kodu | Kullanım Alanı |
| :--- | :--- | :--- |
| **primary (Rausch)** | `#ff385c` | Birincil CTA butonları, arama/onay orbları, aktif seçimler, vurgulu bağlantılar |
| **primary-active** | `#e00b41` | Buton basılma (active/pressed) durumu |
| **primary-disabled** | `#ffd1da` | Devre dışı birincil butonlar |
| **primary-error-text** | `#c13515` | Form doğrulama hata metinleri |
| **primary-error-text-hover** | `#b32505` | Hata linki hover durumu |
| **ink** | `#222222` | Başlıklar, birincil metinler, yıldız puanı (asla saf siyah değil) |
| **body** | `#3f3f3f` | Uzun inceleme metinleri, gövde açıklamaları |
| **muted** | `#6a6a6a` | Alt başlıklar, pasif tablar, ikincil meta bilgiler |
| **muted-soft** | `#929292` | Çok açık gri açıklamalar, placeholder'lar |
| **hairline** | `#dddddd` | Standart 1px kart sınırları, ayraçlar, arama segment çizgileri |
| **hairline-soft** | `#ebebeb` | İnce liste ayraçları |
| **border-strong** | `#c1c1c1` | Odaklanmış/vurgulanmış input sınırları |
| **canvas** | `#ffffff` | Sayfa taban zemini (Saf Beyaz) |
| **surface-soft** | `#f7f7f7` | Hafif gri zeminler, filtre barları, disabled inputlar |
| **surface-strong** | `#f2f2f2` | Dairesel ikon buton zeminleri, tag zeminleri |
| **on-primary** | `#ffffff` | Rausch üzeri beyaz yazı |
| **luxe** | `#460479` | Premium / Özel segment rozeti |
| **plus** | `#92174d` | Doğrulanmış / Plus mülk rozeti |

---

## 2. Typography Scale (Tipografi Hiyerarşisi)

Airbnb felsefesinde devasa kalın fontlar yerine fotoğraf ve beyaz alanın gücüne güvenilir. Başlıklar 20-28px ağırlıklı ve 500-600 ağırlığındadır (Font: Satoshi / Inter / Circular fallback):

| Token | Boyut | Ağırlık | Satır Yüksekliği | Kullanım |
| :--- | :--- | :--- | :--- | :--- |
| `display-xl` | 28px | 700 | 1.43 | Ana sayfa ana başlığı (Hero) |
| `display-lg` | 22px | 500 | 1.18 | Mülk detay başlığı |
| `display-md` | 21px | 700 | 1.43 | Bölüm ana başlıkları |
| `display-sm` | 20px | 600 | 1.20 | Alt bölüm başlıkları |
| `title-md` | 16px | 600 | 1.25 | Kart başlıkları, mülk adları |
| `title-sm` | 16px | 500 | 1.25 | Form ve liste grup başlıkları |
| `body-md` | 16px | 400 | 1.50 | Standart gövde metni |
| `body-sm` | 14px | 400 | 1.43 | Kart meta satırları, sayaç/oda bilgileri |
| `caption` | 14px | 500 | 1.29 | Arama segmenti ve input etiketleri |
| `caption-sm` | 13px | 400 | 1.23 | Footer telif ve dipnot metinleri |
| `badge` | 11px | 600 | 1.18 | "Doğrulanmış / Favori" rozet metni |
| `uppercase-tag` | 9px | 700 | 1.25 | "YENİ" etiketi |
| `button-md` | 14-16px | 500 | 1.25 | Buton metinleri |

---

## 3. Shape, Elevation & Components (Bileşen Standartları)

### Radius Ölçeği
- `rounded-sm`: **8px** (Butonlar, form inputları)
- `rounded-md`: **14px** (Mülk kartları, fotoğraf kırpması, panel kartları)
- `rounded-lg`: **20px** (Büyük diyaloglar, detay konteynerleri)
- `rounded-xl`: **32px** (Kategori ve filtre barları)
- `rounded-full`: **9999px** (Arama pill barı, Rausch arama/onay orbları, dairesel butonlar)

### Gölge Standartları (Elevation)
Airbnb'de kademeli yumuşak gölgeler yerine tek bir zarif float gölgesi kullanılır:
- **Default:** Sıfır gölge, düz beyaz canvas + 1px hairline border (`#dddddd`).
- **Hover / Floating Shadow:** `0 2px 6px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.08)` (Kart hover durumu, arama barı ve modal zeminleri).

### Temel Bileşenler
1. **Primary Button:** `#ff385c` dolgu, beyaz yazı, 8px radius, 14×24px padding, 48px yükseklik (veya 36-40px kompakt).
2. **Search / Filter Pill:** 9999px (`rounded-full`), beyaz zemin, 1px `#dddddd` sınır, segmentler arası 1px ayrım çizgisi, sağında Rausch ikon orbu.
3. **Property Card:** 1:1 veya 4:3 fotoğraf öncelikli görsel kartı, 14px radius, sol üstte yüzen "Doğrulanmış" rozeti (`guest-favorite-badge`), altında sade `ink` ve `muted` tipografi.
4. **Text Input:** 56px / 40px yükseklik, 1px `#dddddd` kenarlık, odakta 2px `#222222` (glow veya ring yok).
