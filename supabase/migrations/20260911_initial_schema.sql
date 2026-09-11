-- ==============================================================================
-- PROPERTY PASSPORT V1 MVP - MASTER DATABASE MIGRATION
-- Multi-tenancy, Row Level Security (RLS), Handover, Evidence, Audit Logs
-- ==============================================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES & MULTI-TENANCY
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agencies (
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

DO $$ BEGIN
    CREATE TYPE agency_role AS ENUM ('AGENCY_ADMIN', 'AGENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.agency_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role agency_role NOT NULL DEFAULT 'AGENT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(agency_id, user_id)
);

-- ==============================================================================
-- 2. CONTACTS (LANDLORDS & TENANTS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.landlords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    identity_no TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    identity_no TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. PROPERTIES & LEASES
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE property_status AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    building TEXT,
    floor TEXT,
    unit_number TEXT,
    room_count TEXT NOT NULL,
    area_m2 NUMERIC(7,2) NOT NULL,
    description TEXT,
    status property_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$ BEGIN
    CREATE TYPE lease_status AS ENUM ('DRAFT', 'ACTIVE', 'ENDED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.leases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    landlord_id UUID NOT NULL REFERENCES public.landlords(id) ON DELETE RESTRICT,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE,
    rent_amount NUMERIC(12,2),
    currency VARCHAR(3) DEFAULT 'TRY',
    deposit_amount NUMERIC(12,2),
    status lease_status NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. HANDOVER RECORDS
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE handover_type AS ENUM ('MOVE_IN', 'MOVE_OUT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE handover_status AS ENUM ('DRAFT', 'IN_PROGRESS', 'PENDING_APPROVAL', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.handover_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    lease_id UUID REFERENCES public.leases(id) ON DELETE SET NULL,
    type handover_type NOT NULL,
    status handover_status NOT NULL DEFAULT 'DRAFT',
    handover_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. ROOMS & ITEMS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    room_type TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    overall_condition TEXT DEFAULT 'GOOD',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$ BEGIN
    CREATE TYPE item_condition AS ENUM ('GOOD', 'USED', 'DAMAGED', 'SCRATCHED', 'BROKEN', 'NOT_WORKING', 'REQUIRES_ATTENTION');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.room_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'STRUCTURAL',
    condition item_condition NOT NULL DEFAULT 'GOOD',
    description TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. INVENTORIES, METERS, KEYS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    brand TEXT,
    model TEXT,
    serial_number TEXT,
    condition item_condition NOT NULL DEFAULT 'GOOD',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DO $$ BEGIN
    CREATE TYPE meter_type AS ENUM ('ELECTRICITY', 'WATER', 'NATURAL_GAS', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.meters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    type meter_type NOT NULL,
    meter_number TEXT,
    current_value NUMERIC(12,3) NOT NULL,
    unit TEXT NOT NULL DEFAULT 'kWh',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.property_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 7. EVIDENCE / MEDIA
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE media_type AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
    room_item_id UUID REFERENCES public.room_items(id) ON DELETE SET NULL,
    inventory_id UUID REFERENCES public.inventories(id) ON DELETE SET NULL,
    meter_id UUID REFERENCES public.meters(id) ON DELETE SET NULL,
    key_id UUID REFERENCES public.property_keys(id) ON DELETE SET NULL,
    type media_type NOT NULL DEFAULT 'IMAGE',
    storage_path TEXT NOT NULL,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
    captured_at TIMESTAMPTZ,
    content_hash TEXT,
    hash_algorithm TEXT DEFAULT 'SHA-256',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 8. APPROVALS & SIGN-OFFS
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE approval_role AS ENUM ('AGENT', 'LANDLORD', 'TENANT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE approval_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id),
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

-- ==============================================================================
-- 9. DOCUMENTS & QR VERIFICATION TOKENS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    version INT NOT NULL DEFAULT 1,
    storage_path TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    generated_by UUID NOT NULL REFERENCES public.profiles(id),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handover_id UUID NOT NULL REFERENCES public.handover_records(id) ON DELETE CASCADE,
    public_token TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

-- ==============================================================================
-- 10. AUDIT LOGS (APPEND-ONLY)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 11. INDEXES FOR PERFORMANCE
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_agency_members_user ON public.agency_members(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_agency ON public.properties(agency_id);
CREATE INDEX IF NOT EXISTS idx_handover_property ON public.handover_records(property_id);
CREATE INDEX IF NOT EXISTS idx_handover_lease ON public.handover_records(lease_id);
CREATE INDEX IF NOT EXISTS idx_rooms_handover ON public.rooms(handover_id);
CREATE INDEX IF NOT EXISTS idx_room_items_room ON public.room_items(room_id);
CREATE INDEX IF NOT EXISTS idx_media_handover ON public.media(handover_id);
CREATE INDEX IF NOT EXISTS idx_media_room ON public.media(room_id);
CREATE INDEX IF NOT EXISTS idx_inventories_handover ON public.inventories(handover_id);
CREATE INDEX IF NOT EXISTS idx_meters_handover ON public.meters(handover_id);
CREATE INDEX IF NOT EXISTS idx_keys_handover ON public.property_keys(handover_id);
CREATE INDEX IF NOT EXISTS idx_approvals_handover ON public.approvals(handover_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_token ON public.qr_codes(public_token);
CREATE INDEX IF NOT EXISTS idx_audit_logs_agency ON public.audit_logs(agency_id);

-- ==============================================================================
-- 12. ROW LEVEL SECURITY (RLS) HELPER FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_user_agency_ids()
RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT agency_id FROM public.agency_members WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_agency_member(target_agency_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.agency_members 
        WHERE agency_id = target_agency_id AND user_id = auth.uid()
    );
$$;

-- ENABLE RLS ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landlords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.handover_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 13. RLS POLICIES
-- ==============================================================================

-- Profiles: Herkes kendi profilini okur/günceller, oturum açmış kullanıcılar başkalarının temel bilgilerini görebilir
CREATE POLICY "Users can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Agencies: Sadece üye olan kullanıcılar ajanslarını görebilir/yönetebilir
CREATE POLICY "Agency members can view agency" ON public.agencies FOR SELECT TO authenticated
    USING (id IN (SELECT public.get_user_agency_ids()));
CREATE POLICY "Agency admins can update agency" ON public.agencies FOR UPDATE TO authenticated
    USING (id IN (SELECT agency_id FROM public.agency_members WHERE user_id = auth.uid() AND role = 'AGENCY_ADMIN'));

-- Agency Members
CREATE POLICY "Members can view agency membership" ON public.agency_members FOR SELECT TO authenticated
    USING (agency_id IN (SELECT public.get_user_agency_ids()));

-- Properties: Sadece ilgili ajansın üyeleri görebilir/yönetebilir
CREATE POLICY "Agency members can access properties" ON public.properties FOR ALL TO authenticated
    USING (agency_id IN (SELECT public.get_user_agency_ids()));

-- Landlords & Tenants
CREATE POLICY "Agency members can access landlords" ON public.landlords FOR ALL TO authenticated
    USING (agency_id IN (SELECT public.get_user_agency_ids()));
CREATE POLICY "Agency members can access tenants" ON public.tenants FOR ALL TO authenticated
    USING (agency_id IN (SELECT public.get_user_agency_ids()));

-- Leases
CREATE POLICY "Agency members can access leases" ON public.leases FOR ALL TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids())));

-- Handover Records: Mülk ajansına ait olmalı
CREATE POLICY "Agency members can access handovers" ON public.handover_records FOR ALL TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids())));

-- Rooms & Items
CREATE POLICY "Agency members can access rooms" ON public.rooms FOR ALL TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids())));
CREATE POLICY "Agency members can access room items" ON public.room_items FOR ALL TO authenticated
    USING (room_id IN (SELECT id FROM public.rooms WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));

-- Inventories, Meters, Keys
CREATE POLICY "Agency members can access inventories" ON public.inventories FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));
CREATE POLICY "Agency members can access meters" ON public.meters FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));
CREATE POLICY "Agency members can access keys" ON public.property_keys FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));

-- Media
CREATE POLICY "Agency members can access media" ON public.media FOR ALL TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids())));

-- Approvals
CREATE POLICY "Agency members can access approvals" ON public.approvals FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));

-- Documents
CREATE POLICY "Agency members can access documents" ON public.documents FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));

-- QR Codes
CREATE POLICY "Agency members can access qr_codes" ON public.qr_codes FOR ALL TO authenticated
    USING (handover_id IN (SELECT id FROM public.handover_records WHERE property_id IN (SELECT id FROM public.properties WHERE agency_id IN (SELECT public.get_user_agency_ids()))));
-- Public verification access: Anonim kullanıcılar public_token üzerinden okuyabilir
CREATE POLICY "Public can view active qr_codes by token" ON public.qr_codes FOR SELECT TO anon
    USING (is_active = true);

-- Audit Logs: Append-only
CREATE POLICY "Agency members can view audit logs" ON public.audit_logs FOR SELECT TO authenticated
    USING (agency_id IN (SELECT public.get_user_agency_ids()));
CREATE POLICY "Users can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated
    WITH CHECK (agency_id IN (SELECT public.get_user_agency_ids()));

-- ==============================================================================
-- 14. AUTH USER CREATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
