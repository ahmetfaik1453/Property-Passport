'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Building2, 
  MapPin, 
  ArrowLeft, 
  Plus, 
  FileText, 
  Users, 
  Layers, 
  Gauge, 
  KeyRound, 
  Camera, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/utils/supabase/client'

const propertyDataStore: { [key: string]: any } = {
  'prop-1': {
    title: 'Nidapark Küçükyalı A Blok D:14',
    city: 'İstanbul',
    district: 'Maltepe',
    neighborhood: 'Küçükyalı',
    address: 'Çınar Mah. Kadir Has Cad. No: 18 A Blok D:14 Maltepe / İstanbul',
    unit_number: 'Daire 14',
    floor: '3. Kat',
    room_count: '2+1',
    area_m2: 95,
    status: 'ACTIVE',
    active_tenant: 'Ahmet Yılmaz',
    tenant_phone: '0532 441 20 18',
    landlord: 'Ali Kaya',
    landlord_phone: '0533 992 14 50',
    rooms: [
      { 
        name: 'Salon', 
        photos: 5, 
        notes: 'Lamine parke temiz, batı cephesi boyası yeni.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Salon Geniş Açı & Aydınlatma', date: '11 Eyl 2026 14:10' },
          { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', title: 'Parke ve Süpürgelik Kontrolü', date: '11 Eyl 2026 14:12' },
          { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', title: 'Pencere Kasaları & Fransız Balkon', date: '11 Eyl 2026 14:15' },
          { url: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80', title: 'Radyatör ve Priz Grubu', date: '11 Eyl 2026 14:16' },
          { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80', title: 'Tavan Alçısı & Kartonpiyer', date: '11 Eyl 2026 14:17' },
        ]
      },
      { 
        name: 'Mutfak', 
        photos: 4, 
        notes: 'Ankastre fırın ve ocak faal, tezgah sağlam.',
        images: [
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'Tezgah ve Granit Evye', date: '11 Eyl 2026 14:18' },
          { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', title: 'Üst Dolap Kapakları & Menteşeler', date: '11 Eyl 2026 14:20' },
          { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80', title: 'Ankastre Ocak ve Davlumbaz', date: '11 Eyl 2026 14:21' },
          { url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80', title: 'Zemin Seramikleri', date: '11 Eyl 2026 14:22' },
        ]
      },
      { 
        name: 'Yatak Odası', 
        photos: 3, 
        notes: 'Kapı pervazında yüzeysel çizik mevcut.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Yatak Odası Genel Görünüm', date: '11 Eyl 2026 14:23' },
          { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80', title: 'Kapı Pervazı Çizik Tespiti (Macro)', date: '11 Eyl 2026 14:25' },
          { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', title: 'Pencere Denizliği ve Duvar', date: '11 Eyl 2026 14:26' },
        ]
      },
      { 
        name: 'Banyo', 
        photos: 3, 
        notes: 'Armatürler ve duşakabin sağlam, sızıntı yok.',
        images: [
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'Duşakabin & Cam Panel', date: '11 Eyl 2026 14:28' },
          { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80', title: 'Lavabo ve Batarya Kontrolü', date: '11 Eyl 2026 14:29' },
          { url: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=1200&q=80', title: 'Gömme Rezervuar & Klozet', date: '11 Eyl 2026 14:30' },
        ]
      },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Vaillant EcoTEC 24kW' },
      { name: 'Buzdolabı', brand: 'Siemens NoFrost XXL' },
      { name: 'Klima', brand: 'Daikin Inverter 12000' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-892102', value: '1428.5 kWh' },
      { type: 'Su', no: 'SU-441209', value: '382.1 m³' },
      { type: 'Doğalgaz', no: 'GAZ-991283', value: '219.0 m³' },
    ],
    handovers: [
      { id: 'ho-101', type: 'Giriş Teslimatı (Move-In)', date: '11 Eylül 2026', tenant: 'Ahmet Yılmaz', token: 'demo-token-1' },
      { id: 'ho-094', type: 'Çıkış Teslimatı (Move-Out)', date: '15 Ağustos 2025', tenant: 'Burak Sergen', token: 'demo-token-prev' },
    ]
  },
  'prop-2': {
    title: 'Vadi İstanbul Park 2. Kısım D:42',
    city: 'İstanbul',
    district: 'Sarıyer',
    neighborhood: 'Ayazağa',
    address: 'Ayazağa Mah. Cendere Cad. Vadi Park Sit. D:42 Sarıyer / İstanbul',
    unit_number: 'Daire 42',
    floor: '7. Kat',
    room_count: '3+1',
    area_m2: 145,
    status: 'ACTIVE',
    active_tenant: 'Mehmet Demir',
    tenant_phone: '0535 882 19 40',
    landlord: 'Fatma Şahin',
    landlord_phone: '0544 112 33 44',
    rooms: [
      { 
        name: 'Geniş Salon', 
        photos: 6, 
        notes: 'Masif parke cilası yeni, balkon kapısı çift cam.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Geniş Salon Panoramik Çekim', date: '10 Eyl 2026 11:15' },
          { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', title: 'Masif Meşe Parke Yüzeyi', date: '10 Eyl 2026 11:17' },
          { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', title: 'Balkon Çift Cam Sürme Doğrama', date: '10 Eyl 2026 11:20' },
          { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', title: 'Tavan Spot Aydınlatma Rayları', date: '10 Eyl 2026 11:22' },
          { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', title: 'VRF Klima İç Ünite Paneli', date: '10 Eyl 2026 11:23' },
          { url: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80', title: 'Giriş Koridoruna Bağlantı', date: '10 Eyl 2026 11:25' },
        ]
      },
      { 
        name: 'Ada Mutfak', 
        photos: 5, 
        notes: 'Franke ada davlumbaz ve bulaşık makinesi dahil.',
        images: [
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'Ada Mutfak Tezgahı ve Franke Davlumbaz', date: '10 Eyl 2026 11:28' },
          { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', title: 'Ankastre Bulaşık Makinesi & İç Sepet', date: '10 Eyl 2026 11:30' },
          { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80', title: 'Lake Dolap Kapakları', date: '10 Eyl 2026 11:32' },
          { url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80', title: 'Granit Zemin Kaplaması', date: '10 Eyl 2026 11:33' },
          { url: 'https://images.unsplash.com/photo-1556909172-8c075d4be999?auto=format&fit=crop&w=1200&q=80', title: 'Kiler Dolabı & Çekmeceler', date: '10 Eyl 2026 11:35' },
        ]
      },
      { 
        name: 'Ebeveyn Yatak Odası', 
        photos: 4, 
        notes: 'Giyinme odası dolapları kusursuz.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Ebeveyn Odası Genel Açı', date: '10 Eyl 2026 11:38' },
          { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', title: 'Giyinme Odası Dolap Mekanizmaları', date: '10 Eyl 2026 11:40' },
          { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80', title: 'Fransız Balkon Önü ve Zemin', date: '10 Eyl 2026 11:42' },
          { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80', title: 'Oda Kapısı ve Kilit Mekanizması', date: '10 Eyl 2026 11:43' },
        ]
      },
      { 
        name: 'Çocuk Odası', 
        photos: 3, 
        notes: 'Duvar kağıdı sağlam, prizler korumalı.',
        images: [
          { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', title: 'Çocuk Odası Genel Görünüm', date: '10 Eyl 2026 11:45' },
          { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', title: 'Duvar Kağıdı ve Pervazlar', date: '10 Eyl 2026 11:47' },
          { url: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80', title: 'Pencereler ve Sineklik Teli', date: '10 Eyl 2026 11:48' },
        ]
      },
      { 
        name: 'Ebeveyn Banyosu', 
        photos: 3, 
        notes: 'Jakuzili küvet ve Geberit gömme rezervuar.',
        images: [
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'Jakuzili Küvet ve Cam Duş Perdesi', date: '10 Eyl 2026 11:50' },
          { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80', title: 'Geberit Rezervuar ve Asma Klozet', date: '10 Eyl 2026 11:52' },
          { url: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=1200&q=80', title: 'Ayna Dolabı ve LED Aydınlatma', date: '10 Eyl 2026 11:53' },
        ]
      },
    ],
    inventories: [
      { name: 'Merkezi Pay Ölçer', brand: 'Siemens Qundis' },
      { name: 'Ankastre Bulaşık Makinesi', brand: 'Franke Pro' },
      { name: 'Salon VRF Klima', brand: 'Mitsubishi Electric' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-334190', value: '4192.0 kWh' },
      { type: 'Su', no: 'SU-778901', value: '891.4 m³' },
      { type: 'Isı Pay Ölçer', no: 'PAY-11029', value: '741.0 MWh' },
    ],
    handovers: [
      { id: 'ho-102', type: 'Çıkış Teslimatı (Move-Out)', date: '10 Eylül 2026', tenant: 'Mehmet Demir', token: 'demo-token-vadi' },
    ]
  },
  'prop-3': {
    title: 'Batışehir Premium Rezidans D:110',
    city: 'İstanbul',
    district: 'Bağcılar',
    neighborhood: 'Göztepe',
    address: 'Göztepe Mah. İstoç Yolu Batışehir Sit. Kule 3 D:110 Bağcılar / İstanbul',
    unit_number: 'Daire 110',
    floor: '11. Kat',
    room_count: '1+1',
    area_m2: 68,
    status: 'ACTIVE',
    active_tenant: 'Selin Kaya',
    tenant_phone: '0542 331 90 12',
    landlord: 'Kemal Sunal',
    landlord_phone: '0532 555 44 33',
    rooms: [
      { 
        name: 'Amerikan Mutfaklı Salon', 
        photos: 4, 
        notes: 'Spot aydınlatmalar çalışır, zemin granit seramik.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', title: 'Amerikan Salon Genel', date: '08 Eyl 2026 15:10' },
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'Mutfak Bankosu ve Evye', date: '08 Eyl 2026 15:12' },
          { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', title: 'Granit Seramik Zemin', date: '08 Eyl 2026 15:14' },
          { url: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=1200&q=80', title: 'Fransız Balkon Kapısı', date: '08 Eyl 2026 15:15' },
        ]
      },
      { 
        name: 'Yatak Odası', 
        photos: 3, 
        notes: 'Gömme gardırop rayları düzgün çalışıyor.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Yatak Odası Genel', date: '08 Eyl 2026 15:18' },
          { url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=80', title: 'Gömme Gardırop Rayları', date: '08 Eyl 2026 15:20' },
          { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', title: 'Pencere ve Radyatör', date: '08 Eyl 2026 15:21' },
        ]
      },
      { 
        name: 'Hilton Banyo', 
        photos: 2, 
        notes: 'Havalandırma aspiratörü ve duş kabini sağlam.',
        images: [
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'Duş Kabini ve Zemin', date: '08 Eyl 2026 15:24' },
          { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80', title: 'Hilton Lavabo ve Dolap', date: '08 Eyl 2026 15:25' },
        ]
      },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Demirdöküm Nitromix' },
      { name: 'Mikrodalga Fırın', brand: 'Samsung Smart' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-667120', value: '982.1 kWh' },
      { type: 'Su', no: 'SU-220194', value: '184.2 m³' },
      { type: 'Doğalgaz', no: 'GAZ-550192', value: '92.4 m³' },
    ],
    handovers: [
      { id: 'ho-103', type: 'Giriş Teslimatı (Move-In)', date: '08 Eylül 2026', tenant: 'Selin Kaya', token: 'demo-token-bati' },
    ]
  },
  'prop-4': {
    title: 'Zorlu Center Terrazze D:T-4',
    city: 'İstanbul',
    district: 'Beşiktaş',
    neighborhood: 'Levazım',
    address: 'Levazım Mah. Koru Sok. Zorlu Center Terrazze Evleri D:T-4 Beşiktaş / İstanbul',
    unit_number: 'Rezidans T-4',
    floor: '4. Kat',
    room_count: '3+1',
    area_m2: 210,
    status: 'IDLE',
    active_tenant: 'Boşta (Teslime Hazır)',
    tenant_phone: '-',
    landlord: 'Hasan Yılmaz',
    landlord_phone: '0533 111 22 33',
    rooms: [
      { 
        name: 'Boğaz Manzaralı Salon', 
        photos: 8, 
        notes: 'Akıllı ev otomasyon paneli faal, teras zemin kaplama kusursuz.',
        images: [
          { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', title: 'Teras ve Panoramik Boğaz Manzarası', date: '01 Eyl 2026 10:10' },
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Geniş Teras Salonu & Doğramalar', date: '01 Eyl 2026 10:12' },
          { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', title: 'Akıllı Aydınlatma ve Crestron Panel', date: '01 Eyl 2026 10:15' },
        ]
      },
      { 
        name: 'Gourmet Mutfak', 
        photos: 6, 
        notes: 'Gaggenau tam set ankastre cihazlar test edildi.',
        images: [
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'Gaggenau Ada Mutfak Ünitesi', date: '01 Eyl 2026 10:18' },
          { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', title: 'Şarap Soğutucu ve Fırın Grubu', date: '01 Eyl 2026 10:20' },
        ]
      },
      { 
        name: 'Master Süit', 
        photos: 5, 
        notes: 'Özel tasarım giyinme odası ve banyo.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Master Süit Yatak Odası', date: '01 Eyl 2026 10:22' },
          { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', title: 'Özel Banyo ve Giyinme Odası', date: '01 Eyl 2026 10:25' },
        ]
      },
    ],
    inventories: [
      { name: 'Akıllı Ev Merkezi Ünitesi', brand: 'Crestron Automation' },
      { name: 'Şarap Soğutucu', brand: 'Gaggenau Vario' },
      { name: 'Tavan Tipi İklimlendirme', brand: 'Daikin VRV IV' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-009182', value: '8841.0 kWh' },
      { type: 'Su', no: 'SU-991204', value: '1410.5 m³' },
      { type: 'Isı Pay', no: 'PAY-44912', value: '1280.0 MWh' },
    ],
    handovers: [
      { id: 'ho-104', type: 'Çıkış Teslimatı (Move-Out)', date: '01 Eylül 2026', tenant: 'Murat Arslan', token: 'demo-token-zorlu' },
    ]
  },
  'prop-5': {
    title: 'Büyükyalı Fişekhane Suites D:B-18',
    city: 'İstanbul',
    district: 'Zeytinburnu',
    neighborhood: 'Kazlıçeşme',
    address: 'Kazlıçeşme Mah. Kennedy Cad. Büyükyalı Sit. B Blok D:18 Zeytinburnu / İstanbul',
    unit_number: 'Daire B-18',
    floor: '2. Kat',
    room_count: '2+1',
    area_m2: 112,
    status: 'ACTIVE',
    active_tenant: 'Canan Özdemir',
    tenant_phone: '0535 777 66 55',
    landlord: 'Mustafa Aydın',
    landlord_phone: '0542 000 11 22',
    rooms: [
      { 
        name: 'Yüksek Tavanlı Salon', 
        photos: 5, 
        notes: 'Tarihi tuğla doku korunmuş, zemin meşe parke.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', title: 'Tarihi Taş Duvar ve Meşe Parke', date: '18 May 2026 11:00' },
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', title: 'Yüksek Tavan ve Pencere Detayı', date: '18 May 2026 11:05' },
        ]
      },
      { 
        name: 'Açık Mutfak', 
        photos: 4, 
        notes: 'Miele ankastre fırın ve ada masa.',
        images: [
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'Miele Ankastre Mutfak', date: '18 May 2026 11:08' },
        ]
      },
      { 
        name: 'Geniş Yatak Odası', 
        photos: 3, 
        notes: 'Deniz manzaralı balkon çıkışı.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Yatak Odası ve Deniz Manzarası', date: '18 May 2026 11:12' },
        ]
      },
    ],
    inventories: [
      { name: 'Kombi', brand: 'Viessmann Vitodens' },
      { name: 'Klima', brand: 'Mitsubishi Heavy' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-441829', value: '2319.4 kWh' },
      { type: 'Su', no: 'SU-551029', value: '448.0 m³' },
      { type: 'Doğalgaz', no: 'GAZ-881290', value: '312.8 m³' },
    ],
    handovers: [
      { id: 'ho-105', type: 'Giriş Teslimatı (Move-In)', date: '18 Mayıs 2026', tenant: 'Canan Özdemir', token: 'demo-token-buyuk' },
    ]
  },
  'prop-6': {
    title: 'Sinpaş Finans Şehir Kule 2 D:88',
    city: 'İstanbul',
    district: 'Ümraniye',
    neighborhood: 'Finanskent',
    address: 'Finanskent Mah. Finans Cad. Sinpaş Finans Şehir Kule 2 D:88 Ümraniye / İstanbul',
    unit_number: 'Kule 2 D:88',
    floor: '14. Kat',
    room_count: '1+1',
    area_m2: 74,
    status: 'ACTIVE',
    active_tenant: 'Emre Çetin',
    tenant_phone: '0544 333 22 11',
    landlord: 'Ahmet Faik Özsoy',
    landlord_phone: '0532 123 45 67',
    rooms: [
      { 
        name: 'Kompakt Salon', 
        photos: 4, 
        notes: 'Şehir manzaralı Fransız balkon, laminant zemin temiz.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', title: 'Kompakt Salon ve Şehir Manzarası', date: '10 Nis 2026 14:00' },
          { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', title: 'Fransız Balkon ve Parke Detayı', date: '10 Nis 2026 14:05' },
        ]
      },
      { 
        name: 'Mutfak Nişi', 
        photos: 3, 
        notes: 'Siemens ikili indüksiyonlu ocak ve aspiratör.',
        images: [
          { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', title: 'İndüksiyonlu Ocak ve Dolaplar', date: '10 Nis 2026 14:08' },
        ]
      },
      { 
        name: 'Yatak Odası', 
        photos: 3, 
        notes: 'Isı yalıtımlı cephe penceresi kusursuz.',
        images: [
          { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', title: 'Yatak Odası Cephesi', date: '10 Nis 2026 14:10' },
        ]
      },
    ],
    inventories: [
      { name: 'Pay Ölçerli Isıtma', brand: 'Danfoss Eco' },
      { name: 'İnverter Split Klima', brand: 'LG DualCool' },
    ],
    meters: [
      { type: 'Elektrik', no: 'ELK-771890', value: '1104.2 kWh' },
      { type: 'Su', no: 'SU-119283', value: '205.1 m³' },
    ],
    handovers: [
      { id: 'ho-106', type: 'Giriş Teslimatı (Move-In)', date: '10 Nisan 2026', tenant: 'Emre Çetin', token: 'demo-token-prev' },
    ]
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params?.id as string || 'prop-1'
  const property = propertyDataStore[id] || propertyDataStore['prop-1']

  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0)

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    checkAuth()
  }, [])

  const openRoomGallery = (room: any) => {
    setSelectedRoom(room)
    setActivePhotoIdx(0)
  }

  const closeRoomGallery = () => {
    setSelectedRoom(null)
    setActivePhotoIdx(0)
  }

  return (
    <div className="w-full space-y-6">
      {/* Demo / Örnek Görünüm Bilgilendirme Bannerı (Giriş yapılmadığında) */}
      {!user && (
        <div className="bg-[#fff8f6] border border-[#ffd1da] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-[#ff385c] shrink-0 mt-1 sm:mt-0 animate-pulse" />
            <div>
              <span className="font-bold text-[#222222] text-[13px]">Örnek Mülk & Tutanak İnceleme Modu</span>
              <p className="text-[#717171] mt-0.5">
                Şu anda bu mülkü ve dijital oda kanıtlarını halka açık örnek formatında inceliyorsunuz. Kendi mülklerinizi kaydetmek için sisteme giriş yapabilirsiniz.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/login">
              <button className="h-8 px-3.5 text-xs font-semibold bg-[#222222] hover:bg-black text-white rounded-lg transition-colors">
                Giriş Yap
              </button>
            </Link>
            <Link href="/register">
              <button className="h-8 px-3.5 text-xs font-semibold border border-[#dddddd] hover:bg-white text-[#222222] rounded-lg transition-colors">
                Hesap Oluştur
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Navigation and Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#dddddd]">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="h-8 text-[13px] font-medium gap-1.5 text-[#717171] hover:text-[#222222] hover:bg-[#f7f7f7] rounded-lg">
              <ArrowLeft className="size-3.5" /> Portföye Dön
            </Button>
          </Link>
          <div className="h-4 w-px bg-[#dddddd]" />
          <Badge variant="outline" className={`text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${
            property.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-[#fff8f6] text-[#c13515] border-[#ffd1da]'
          }`}>
            {property.status === 'ACTIVE' ? 'Aktif Kirada' : 'Boşta / Müsait'}
          </Badge>
          {!user && (
            <Badge variant="secondary" className="text-[11px] font-medium bg-[#f7f7f7] text-[#717171] border border-[#dddddd] rounded-full px-2">
              Örnek Portföy
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/handovers/new?property_id=${id}`}>
            <Button size="sm" className="bg-[#ff385c] hover:bg-[#e00b41] text-white gap-1.5 h-9 text-[14px] font-medium px-4 rounded-lg shadow-sm">
              <Plus className="size-3.5" /> Yeni Teslimat Başlat
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px] overflow-hidden">
            <CardHeader className="p-5 border-b border-[#dddddd]">
              <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-[#222222] leading-snug">{property.title}</h1>
                <p className="text-[14px] text-[#717171] flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#ff385c] shrink-0" />
                  {property.address}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f7f7f7] p-4 rounded-xl border border-[#ebebeb] text-[13px]">
                <div>
                  <span className="text-[#717171] block text-[11px]">Oda Tipi</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.room_count}</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Kullanım Alanı</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.area_m2} m²</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Bulunduğu Kat</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.floor}</span>
                </div>
                <div>
                  <span className="text-[#717171] block text-[11px]">Kapı / No</span>
                  <span className="font-bold text-[#222222] text-[15px] mt-0.5 block">{property.unit_number}</span>
                </div>
              </div>

              {/* Room Breakdown (Tıklanabilir ve Fotoğraf Galerisi Açan Kartlar) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider">
                    Kayıtlı Odalar ve Fiziksel Durum
                  </h4>
                  <span className="text-[11px] text-[#717171]">
                    Fotoğrafları incelemek için odaya tıklayın
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.rooms.map((room: any, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => openRoomGallery(room)}
                      className="p-3.5 rounded-xl border border-[#dddddd] bg-white hover:border-[#222222] hover:shadow-xs transition-all flex items-start justify-between text-[13px] text-left group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-[#222222] group-hover:text-[#ff385c] transition-colors flex items-center gap-1.5">
                          {room.name}
                          <Eye className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff385c]" />
                        </div>
                        <div className="text-[12px] text-[#717171] line-clamp-1">{room.notes}</div>
                      </div>
                      <Badge variant="secondary" className="text-[11px] shrink-0 font-medium bg-[#f7f7f7] text-[#222222] border border-[#dddddd] group-hover:border-[#222222] rounded-full px-2.5 py-0.5 transition-colors">
                        <Camera className="size-3 mr-1 text-[#717171]" />
                        {room.photos || (room.images ? room.images.length : 0)} Foto
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meter and Inventories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider mb-2">
                    Sayaç Endeksleri
                  </h4>
                  <div className="space-y-2">
                    {property.meters.map((m: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg border border-[#dddddd] bg-[#f7f7f7] flex items-center justify-between text-[13px]">
                        <span className="text-[#717171] font-medium">{m.type} ({m.no})</span>
                        <span className="font-bold text-[#222222]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-bold text-[#222222] uppercase tracking-wider mb-2">
                    Kayıtlı Demirbaşlar
                  </h4>
                  <div className="space-y-2">
                    {property.inventories.map((inv: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg border border-[#dddddd] bg-[#f7f7f7] flex items-center justify-between text-[13px]">
                        <span className="text-[#717171] font-medium">{inv.name}</span>
                        <span className="font-semibold text-[#222222]">{inv.brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Parties & Handover History */}
        <div className="space-y-6">
          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px]">
            <CardHeader className="p-4 border-b border-[#dddddd]">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider text-[#222222]">
                Yetkili Taraflar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-[13px]">
              <div className="p-3 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
                <span className="text-[11px] text-[#717171] font-medium block">Aktif Kiracı</span>
                <span className="font-bold text-[#222222] block mt-0.5">{property.active_tenant}</span>
                <span className="text-[12px] text-[#717171] font-mono mt-0.5 block">{property.tenant_phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#f7f7f7] border border-[#ebebeb]">
                <span className="text-[11px] text-[#717171] font-medium block">Mülk Sahibi</span>
                <span className="font-bold text-[#222222] block mt-0.5">{property.landlord}</span>
                <span className="text-[12px] text-[#717171] font-mono mt-0.5 block">{property.landlord_phone}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#dddddd] shadow-none bg-white rounded-[14px]">
            <CardHeader className="p-4 border-b border-[#dddddd]">
              <CardTitle className="text-[13px] font-bold uppercase tracking-wider text-[#222222]">
                Teslimat Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-[13px]">
              {property.handovers.map((h: any) => (
                <div key={h.id} className="p-3 rounded-xl border border-[#dddddd] bg-white hover:border-[#222222] transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#222222]">{h.type}</span>
                    <Badge variant="outline" className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border-emerald-200 rounded-full px-2">
                      Doğrulandı
                    </Badge>
                  </div>
                  <div className="text-[12px] text-[#717171] flex items-center justify-between">
                    <span>{h.date} &bull; {h.tenant}</span>
                    <Link href={`/verify/${h.token}`} className="text-[#222222] hover:text-[#ff385c] hover:underline inline-flex items-center gap-0.5 font-medium">
                      QR <ExternalLink className="size-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Oda Fotoğrafları İnceleme Modal / Lightbox */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#ebebeb] flex items-center justify-between bg-white">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#222222] text-base">{selectedRoom.name} Fotoğraf Galerisi</h3>
                  <Badge variant="secondary" className="text-[11px] rounded-full px-2 bg-[#f7f7f7] border border-[#dddddd]">
                    {selectedRoom.images?.length || 0} Kanıt Görseli
                  </Badge>
                </div>
                <p className="text-xs text-[#717171] mt-0.5">{selectedRoom.notes}</p>
              </div>
              <button 
                onClick={closeRoomGallery}
                className="size-8 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Main Active Image Display */}
            {selectedRoom.images && selectedRoom.images.length > 0 ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black rounded-xl overflow-hidden group flex items-center justify-center">
                  <img 
                    src={selectedRoom.images[activePhotoIdx]?.url} 
                    alt={selectedRoom.images[activePhotoIdx]?.title || selectedRoom.name}
                    className="w-full h-full object-contain"
                  />
                  {/* Photo Title Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <p className="text-sm font-semibold">{selectedRoom.images[activePhotoIdx]?.title}</p>
                    <p className="text-xs text-white/80 font-mono mt-0.5">Kayıt: {selectedRoom.images[activePhotoIdx]?.date}</p>
                  </div>

                  {/* Navigation Arrows */}
                  {selectedRoom.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActivePhotoIdx(prev => (prev > 0 ? prev - 1 : selectedRoom.images.length - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Önceki Fotoğraf"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        onClick={() => setActivePhotoIdx(prev => (prev < selectedRoom.images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Sonraki Fotoğraf"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {selectedRoom.images.map((img: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative size-16 sm:size-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIdx === idx ? 'border-[#ff385c] scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#717171]">
                Bu oda için henüz kayıtlı fotoğraf bulunmuyor.
              </div>
            )}

            {/* Modal Footer */}
            <div className="p-3 border-t border-[#ebebeb] bg-[#f7f7f7] flex items-center justify-between text-xs">
              <span className="text-[#717171] flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" />
                EXIF & Zaman Damgalı Dijital Tutanak Kaydı
              </span>
              <Button size="sm" variant="outline" onClick={closeRoomGallery} className="h-8 text-xs font-semibold rounded-lg">
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
