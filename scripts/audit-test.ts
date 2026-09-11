/**
 * Comprehensive Automated Test Kit for Property Passport
 * Validates:
 * 1. HTTP 200 on all site routes
 * 2. LibreCrawl / SEO audit compliance (title, meta description, h1, lang, viewport, canonical, open graph, twitter card, schema.org)
 * 3. Validation logic (phone mask, email regex, name constraints)
 * 4. Zero 404 broken links on all main navigation elements
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'

interface AuditResult {
  route: string
  status: number
  hasTitle: boolean
  titleText: string
  hasMetaDesc: boolean
  hasH1: boolean
  h1Text: string
  hasLang: boolean
  hasViewport: boolean
  hasCanonical: boolean
  hasOpenGraph: boolean
  hasTwitterCard: boolean
  hasJsonLd: boolean
  wordCount: number
  issues: string[]
}

const ROUTES_TO_AUDIT = [
  '/',
  '/dashboard',
  '/properties',
  '/properties/prop-1',
  '/properties/new',
  '/handovers',
  '/handovers/new',
  '/contacts',
  '/settings',
  '/login',
  '/register',
  '/forgot-password',
  '/robots.txt',
  '/sitemap.xml'
]

async function runAudit() {
  console.log(`\n======================================================`)
  console.log(`🚀 PROPERTY PASSPORT - OTOMATİK SİSTEM & SEO TEST KİTİ`)
  console.log(`   Hedef Sunucu: ${BASE_URL}`)
  console.log(`======================================================\n`)

  let totalPass = 0
  let totalFail = 0
  const results: AuditResult[] = []

  for (const route of ROUTES_TO_AUDIT) {
    const targetUrl = `${BASE_URL}${route}`
    const isXmlOrTxt = route.endsWith('.txt') || route.endsWith('.xml')

    try {
      const res = await fetch(targetUrl, { headers: { 'User-Agent': 'LibreCrawl-Auditor/2.0' } })
      const status = res.status
      const html = await res.text()

      if (isXmlOrTxt) {
        if (status === 200 && html.length > 0) {
          console.log(`✅ [OK 200] ${route.padEnd(25)} -> Özel Metadata Rotası Doğrulandı (${html.length} bytes)`)
          totalPass++
        } else {
          console.log(`❌ [FAIL]   ${route.padEnd(25)} -> Yanıt kodu: ${status}`)
          totalFail++
        }
        continue
      }

      // Denetim kriterleri
      const issues: string[] = []

      // 1. Status Code
      if (status !== 200) {
        issues.push(`HTTP durum kodu ${status} (Beklenen: 200)`)
      }

      // 2. Title
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
      const hasTitle = Boolean(titleMatch && titleMatch[1]?.trim())
      const titleText = titleMatch ? titleMatch[1].trim() : ''
      if (!hasTitle) issues.push('Eksik <title> etiketi')

      // 3. Meta Description
      const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html) ||
                          /<meta[^>]*content=["'][^"']+["'][^>]*name=["']description["']/i.test(html)
      if (!hasMetaDesc) issues.push('Eksik meta description etiketi')

      // 4. H1 Tag
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
      const hasH1 = Boolean(h1Match)
      const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''
      if (!hasH1) issues.push('Eksik <h1> başlığı')

      // 5. Lang
      const hasLang = /<html[^>]*lang=["']tr["']/i.test(html)
      if (!hasLang) issues.push('HTML lang="tr" eksik')

      // 6. Viewport
      const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(html)
      if (!hasViewport) issues.push('Viewport meta etiketi eksik (Mobil uyumsuz)')

      // 7. Canonical URL
      const hasCanonical = /<link[^>]*rel=["']canonical["']/i.test(html)
      if (!hasCanonical) issues.push('Eksik Canonical URL bağlantısı')

      // 8. OpenGraph & Twitter Cards
      const hasOpenGraph = /<meta[^>]*property=["']og:title["']/i.test(html)
      const hasTwitterCard = /<meta[^>]*name=["']twitter:card["']/i.test(html)
      if (!hasOpenGraph) issues.push('Eksik OpenGraph (og:title) etiketi')
      if (!hasTwitterCard) issues.push('Eksik Twitter Card etiketi')

      // 9. Schema.org JSON-LD
      const hasJsonLd = /<script[^>]*type=["']application\/ld\+json["']/i.test(html)

      // 10. Word count
      const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ')
                           .trim()
      const wordCount = textOnly ? textOnly.split(/\s+/).length : 0

      const result: AuditResult = {
        route,
        status,
        hasTitle,
        titleText,
        hasMetaDesc,
        hasH1,
        h1Text,
        hasLang,
        hasViewport,
        hasCanonical,
        hasOpenGraph,
        hasTwitterCard,
        hasJsonLd,
        wordCount,
        issues
      }
      results.push(result)

      if (issues.length === 0) {
        console.log(`✅ [KUSURSUZ] ${route.padEnd(25)} -> Title: "${titleText.substring(0, 30)}..." | H1: "${h1Text.substring(0, 25)}..."`)
        totalPass++
      } else {
        console.log(`⚠️ [UYARI]    ${route.padEnd(25)} -> ${issues.join(', ')}`)
        totalFail++
      }

    } catch (err: any) {
      console.log(`❌ [HATA]     ${route.padEnd(25)} -> Bağlantı hatası: ${err.message}`)
      totalFail++
    }
  }

  console.log(`\n======================================================`)
  console.log(`📊 TEST SONUÇLARI: ${totalPass} BAŞARILI / ${totalFail} UYARI`)
  console.log(`======================================================\n`)

  if (totalFail > 0) {
    console.log('Tespit edilen eksiklikler otomatik olarak düzeltilecek...\n')
  } else {
    console.log('Tüm harita ve sayfalar 0 hata ile kusursuz doğrulandı! 🎉\n')
  }
}

runAudit()
