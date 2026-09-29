-- ====================================================================
-- ESQUEMA DE BASE DE DATOS AERONÁUTICA & MERCANTIL (PostgreSQL / Supabase)
-- Proyecto: Plataforma Híbrida para Abogado Aeronáutico & Piloto Comercial
-- Caracas, Venezuela (SVCS / SVMI / SVFM) & Operaciones Multijurisdicción (INAC / FAA)
-- ====================================================================

-- 1. TIPOS ENUMERADOS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin_lawyer', 'aircraft_owner', 'prospective_buyer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE aircraft_status AS ENUM ('draft', 'published', 'under_contract', 'sold', 'private_management');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE aviation_authority AS ENUM ('INAC', 'FAA', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABLA DE PERFILES DE USUARIO (Conexión con Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'prospective_buyer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENTIDAD AERONAVE (Catálogo de Brokerage y Gestión Privada)
CREATE TABLE IF NOT EXISTS aircraft (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    registration_mark TEXT NOT NULL, -- Matrícula (YV o N)
    serial_number TEXT NOT NULL,
    authority aviation_authority DEFAULT 'INAC',
    make TEXT NOT NULL,              -- Fabricante (ej. Piper, Beechcraft, Cessna)
    model TEXT NOT NULL,             -- Modelo (ej. King Air B200, Citation CJ3)
    manufacture_year INT NOT NULL,
    home_base_icao VARCHAR(4),       -- Base OACI ej. SVCS, SVMI, SVFM
    status aircraft_status DEFAULT 'draft',
    price_usd NUMERIC(12, 2),        -- Nullable si es solo administración o consulta
    is_for_sale BOOLEAN DEFAULT FALSE,
    is_under_management BOOLEAN DEFAULT FALSE,
    featured_image_url TEXT,
    gallery_image_urls TEXT[],
    description_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TIEMPOS TÉCNICOS Y ESPECIFICACIONES (Aeronautical Spec Sheet)
CREATE TABLE IF NOT EXISTS aircraft_technical_specs (
    aircraft_id UUID PRIMARY KEY REFERENCES aircraft(id) ON DELETE CASCADE,
    airframe_tt_hours NUMERIC(7, 1) NOT NULL, -- Total Time Airframe (TTAF)
    engine_details JSONB DEFAULT '[]'::jsonb, -- [{ "position": "L", "model": "PT6A-42", "smoh_hours": 1200, "tbo": 3600 }]
    propeller_details JSONB DEFAULT '[]'::jsonb, -- [{ "position": "L", "spoh_hours": 300 }]
    avionics_features TEXT[] DEFAULT '{}',    -- Suite instalada: Garmin G1000, Collins Pro Line, ADS-B Out, Radar RDR-2000
    cabin_configuration TEXT,                 -- ej. "VIP 6 pasajeros + Club Seating en cuero beige"
    logbooks_complete BOOLEAN DEFAULT TRUE,
    damage_history BOOLEAN DEFAULT FALSE,
    damage_history_notes TEXT,
    legal_clearance_title BOOLEAN DEFAULT TRUE, -- Libre de gravámenes / Clear Title
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BÓVEDA DOCUMENTAL CIFRADA (Documentos Sensibles de la Aeronave)
CREATE TABLE IF NOT EXISTS aircraft_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aircraft_id UUID NOT NULL REFERENCES aircraft(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,              -- 'airworthiness_cert', 'insurance_policy', 'title_deed', 'logbook_scan', 'ppi_report'
    storage_path TEXT NOT NULL,               -- Ruta en bucket privado de Supabase Storage
    expiration_date DATE,                     -- Fecha crítica para disparar alertas
    file_size_bytes BIGINT,
    mime_type TEXT DEFAULT 'application/pdf',
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INFORMES MENSUALES DE ADMINISTRACIÓN (V1: PDFs / V2: Desglose Contable)
CREATE TABLE IF NOT EXISTS management_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aircraft_id UUID NOT NULL REFERENCES aircraft(id) ON DELETE CASCADE,
    report_period_month INT NOT NULL CHECK (report_period_month BETWEEN 1 AND 12),
    report_period_year INT NOT NULL,
    summary_notes TEXT,
    pdf_attachment_path TEXT NOT NULL,
    -- Campos reservados para la fase 2.0 (desglose cuantitativo):
    total_operating_cost_usd NUMERIC(10, 2),
    flight_hours_period NUMERIC(5, 1),
    cost_breakdown JSONB DEFAULT '{"fuel": 0, "hangar": 0, "crew": 0, "maintenance": 0}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SISTEMA DE ALERTAS REGULATORIAS Y DE MANTENIMIENTO
CREATE TABLE IF NOT EXISTS compliance_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aircraft_id UUID NOT NULL REFERENCES aircraft(id) ON DELETE CASCADE,
    title TEXT NOT NULL,                      -- ej. "Vencimiento Certificado de Aeronavegabilidad INAC"
    due_date DATE NOT NULL,
    alert_type TEXT NOT NULL,                 -- 'regulatory', 'insurance', 'maintenance_100h', 'service_bulletin'
    severity TEXT DEFAULT 'warning',          -- 'critical', 'warning', 'info'
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA PARA MANDATOS DE COMPRA Y LEADS DE EMAIL MARKETING (OFF-MARKET)
CREATE TABLE IF NOT EXISTS buyer_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT NOT NULL UNIQUE,
    phone_whatsapp TEXT,
    preferred_categories TEXT[] NOT NULL,     -- ['turboprop', 'light_jet', 'piston']
    budget_range TEXT NOT NULL,               -- 'under_250k', '250k_750k', '750k_2m', 'over_2m'
    operation_profile TEXT,                   -- 'paved_ifr', 'unpaved_strips', 'commercial_charter'
    timeline TEXT NOT NULL,                   -- 'immediate', '1_3_months', 'exploring'
    source_tag TEXT DEFAULT 'website_offmarket_form',
    is_active_subscriber BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLA DE SOLICITUDES DE INSPECCIÓN IN SITU (Pre-Purchase Inspection - PPI)
CREATE TABLE IF NOT EXISTS inspection_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    aircraft_registration TEXT NOT NULL,
    aircraft_model TEXT,
    hangar_airport_icao TEXT NOT NULL,        -- SVCS, SVMI, SVFM, etc.
    hangar_location_notes TEXT,
    has_logbooks_available BOOLEAN DEFAULT TRUE,
    seller_contact_info TEXT,
    preferred_inspection_date DATE,
    inspection_scope TEXT DEFAULT 'full_ppi', -- 'full_ppi', 'legal_only', 'physical_only'
    status TEXT DEFAULT 'pending',            -- 'pending', 'confirmed', 'in_progress', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ÍNDICES DE RENDIMIENTO Y BÚSQUEDA RÁPIDA
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_aircraft_status ON aircraft(status);
CREATE INDEX IF NOT EXISTS idx_aircraft_owner ON aircraft(owner_id);
CREATE INDEX IF NOT EXISTS idx_aircraft_is_for_sale ON aircraft(is_for_sale);
CREATE INDEX IF NOT EXISTS idx_aircraft_is_under_management ON aircraft(is_under_management);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_due ON compliance_alerts(due_date, resolved);
CREATE INDEX IF NOT EXISTS idx_buyer_leads_categories ON buyer_leads USING GIN (preferred_categories);
CREATE INDEX IF NOT EXISTS idx_buyer_leads_budget ON buyer_leads (budget_range);
CREATE INDEX IF NOT EXISTS idx_buyer_leads_timeline ON buyer_leads (timeline);

-- ====================================================================
-- POLÍTICAS DE SEGURIDAD A NIVEL DE FILA (ROW LEVEL SECURITY - RLS)
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE aircraft_technical_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE aircraft_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE management_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;

-- 1. Políticas para Profiles:
CREATE POLICY "Usuarios pueden ver su propio perfil" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- 2. Políticas para Aircraft:
CREATE POLICY "Catálogo público visible para todos" 
ON aircraft FOR SELECT 
USING (is_for_sale = TRUE AND status = 'published');

CREATE POLICY "Propietarios ven sus propias aeronaves" 
ON aircraft FOR SELECT 
USING (auth.uid() = owner_id);

-- 3. Políticas para Documentos:
CREATE POLICY "Propietario accede a documentos de su aeronave" 
ON aircraft_documents FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM aircraft 
        WHERE aircraft.id = aircraft_documents.aircraft_id 
        AND aircraft.owner_id = auth.uid()
    )
);

-- 4. Políticas para Informes de Gestión:
CREATE POLICY "Propietario accede a informes de su aeronave" 
ON management_reports FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM aircraft 
        WHERE aircraft.id = management_reports.aircraft_id 
        AND aircraft.owner_id = auth.uid()
    )
);

-- 5. Políticas para Alertas:
CREATE POLICY "Propietario ve alertas de su aeronave" 
ON compliance_alerts FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM aircraft 
        WHERE aircraft.id = compliance_alerts.aircraft_id 
        AND aircraft.owner_id = auth.uid()
    )
);
