export type AgencyRole = 'AGENCY_ADMIN' | 'AGENT'
export type PropertyStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
export type LeaseStatus = 'DRAFT' | 'ACTIVE' | 'ENDED' | 'CANCELLED'
export type HandoverType = 'MOVE_IN' | 'MOVE_OUT'
export type HandoverStatus = 'DRAFT' | 'IN_PROGRESS' | 'PENDING_APPROVAL' | 'COMPLETED' | 'CANCELLED'
export type ItemCondition = 'GOOD' | 'USED' | 'DAMAGED' | 'SCRATCHED' | 'BROKEN' | 'NOT_WORKING' | 'REQUIRES_ATTENTION'
export type MeterType = 'ELECTRICITY' | 'WATER' | 'NATURAL_GAS' | 'OTHER'
export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT'
export type ApprovalRole = 'AGENT' | 'LANDLORD' | 'TENANT'
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string | null
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export interface Agency {
  id: string
  name: string
  tax_number?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  city?: string | null
  logo_url?: string | null
  created_at: string
  updated_at: string
}

export interface AgencyMember {
  id: string
  agency_id: string
  user_id: string
  role: AgencyRole
  created_at: string
}

export interface Landlord {
  id: string
  agency_id: string
  profile_id?: string | null
  name: string
  phone: string
  email?: string | null
  identity_no?: string | null
  created_at: string
  updated_at: string
}

export interface Tenant {
  id: string
  agency_id: string
  profile_id?: string | null
  name: string
  phone: string
  email?: string | null
  identity_no?: string | null
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  agency_id: string
  title: string
  city: string
  district: string
  neighborhood: string
  building?: string | null
  floor?: string | null
  unit_number?: string | null
  room_count: string
  area_m2: number
  description?: string | null
  status: PropertyStatus
  created_at: string
  updated_at: string
}

export interface Lease {
  id: string
  property_id: string
  landlord_id: string
  tenant_id: string
  start_date: string
  end_date?: string | null
  rent_amount?: number | null
  currency: string
  deposit_amount?: number | null
  status: LeaseStatus
  created_at: string
  updated_at: string
  landlord?: Landlord
  tenant?: Tenant
}

export interface HandoverRecord {
  id: string
  property_id: string
  lease_id?: string | null
  type: HandoverType
  status: HandoverStatus
  handover_date: string
  created_by: string
  completed_at?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
  property?: Property
  lease?: Lease
  creator?: Profile
}

export interface Room {
  id: string
  property_id: string
  handover_id: string
  name: string
  room_type: string
  order_index: number
  overall_condition: string
  notes?: string | null
  created_at: string
  updated_at: string
  items?: RoomItem[]
  media?: Media[]
}

export interface RoomItem {
  id: string
  room_id: string
  name: string
  category: string
  condition: ItemCondition
  description?: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface Inventory {
  id: string
  handover_id: string
  room_id?: string | null
  name: string
  brand?: string | null
  model?: string | null
  serial_number?: string | null
  condition: ItemCondition
  description?: string | null
  created_at: string
  updated_at: string
}

export interface Meter {
  id: string
  handover_id: string
  type: MeterType
  meter_number?: string | null
  current_value: number
  unit: string
  description?: string | null
  created_at: string
  media?: Media[]
}

export interface PropertyKey {
  id: string
  handover_id: string
  type: string
  quantity: number
  description?: string | null
  created_at: string
}

export interface Media {
  id: string
  property_id: string
  handover_id: string
  room_id?: string | null
  room_item_id?: string | null
  inventory_id?: string | null
  meter_id?: string | null
  key_id?: string | null
  type: MediaType
  storage_path: string
  filename: string
  mime_type: string
  size_bytes: number
  uploaded_by: string
  captured_at?: string | null
  content_hash?: string | null
  hash_algorithm: string
  created_at: string
}

export interface Approval {
  id: string
  handover_id: string
  user_id?: string | null
  signer_name: string
  signer_role: ApprovalRole
  status: ApprovalStatus
  rejection_reason?: string | null
  ip_address?: string | null
  user_agent?: string | null
  approved_at?: string | null
  created_at: string
}

export interface QRCodeRecord {
  id: string
  handover_id: string
  public_token: string
  is_active: boolean
  view_count: number
  created_at: string
  revoked_at?: string | null
}
