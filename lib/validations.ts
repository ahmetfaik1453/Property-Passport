/**
 * Form ve veri doğrulama (Validation) kuralları ve formatlayıcılar
 */

// Türkiye telefon numarası formatlama (05XX XXX XX XX)
export function formatPhoneNumber(value: string): string {
  // Sadece rakamları al
  const digits = value.replace(/\D/g, '')

  // Başta 90 varsa veya direkt 5 ile başlıyorsa normalize et
  let clean = digits
  if (clean.startsWith('90')) {
    clean = clean.substring(2)
  }
  if (clean.length > 0 && !clean.startsWith('0')) {
    clean = '0' + clean
  }

  // Maksimum 11 hane (05XX XXX XX XX)
  clean = clean.slice(0, 11)

  // Maskeleme
  if (clean.length <= 4) return clean
  if (clean.length <= 7) return `${clean.slice(0, 4)} ${clean.slice(4)}`
  if (clean.length <= 9) return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`
  return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7, 9)} ${clean.slice(9, 11)}`
}

// Telefon numarası geçerlilik kontrolü
export function isValidPhoneNumber(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  // Türkiye standardı: 05XX XXX XX XX -> 11 hane olmalı ve 05 ile başlamalı
  return /^05[0-9]{9}$/.test(digits)
}

// E-posta geçerlilik kontrolü
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 100) return false
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

// İsim geçerlilik kontrolü (en az 2, en fazla 60 karakter)
export function isValidName(name: string): boolean {
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 60
}

// TC Kimlik / Vergi No kontrolü (opsiyonel alanlar için)
export function isValidIdentityNo(id: string): boolean {
  const digits = id.replace(/\D/g, '')
  return digits.length === 11 || digits.length === 10
}
