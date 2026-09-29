export type UserRole = 'admin_lawyer' | 'aircraft_owner' | 'prospective_buyer';

export type AircraftStatus = 'draft' | 'published' | 'under_contract' | 'sold' | 'private_management';

export type AviationAuthority = 'INAC' | 'FAA' | 'OTHER';

export type DocumentType = 
  | 'airworthiness_cert' 
  | 'insurance_policy' 
  | 'title_deed' 
  | 'logbook_scan' 
  | 'ppi_report';

export type AlertType = 'regulatory' | 'insurance' | 'maintenance_100h' | 'service_bulletin';

export interface EngineDetail {
  position: 'L' | 'R' | 'Single' | '1' | '2' | '3' | '4';
  model: string;
  smoh_hours: number;
  tbo: number;
}

export interface PropellerDetail {
  position: 'L' | 'R' | 'Single';
  spoh_hours: number;
  tbo_hours?: number;
}

export interface AircraftTechnicalSpecs {
  aircraft_id?: string;
  airframe_tt_hours: number;
  engine_details: EngineDetail[];
  propeller_details?: PropellerDetail[];
  avionics_features: string[];
  cabin_configuration?: string;
  logbooks_complete: boolean;
  damage_history: boolean;
  damage_history_notes?: string;
  legal_clearance_title: boolean;
}

export interface Aircraft {
  id: string;
  owner_id?: string | null;
  registration_mark: string; // ej. YV-3450, N-892CA
  serial_number: string;
  authority: AviationAuthority;
  make: string; // ej. Beechcraft, Cessna, Piper
  model: string; // ej. King Air B200, Citation CJ3
  manufacture_year: number;
  home_base_icao: string; // SVCS, SVMI, SVFM
  status: AircraftStatus;
  price_usd?: number | null;
  is_for_sale: boolean;
  is_under_management: boolean;
  featured_image_url?: string;
  gallery_image_urls?: string[];
  description_notes?: string;
  technical_specs?: AircraftTechnicalSpecs;
  created_at?: string;
  updated_at?: string;
}

export interface AircraftDocument {
  id: string;
  aircraft_id: string;
  document_name: string;
  document_type: DocumentType;
  storage_path: string;
  expiration_date?: string;
  file_size_bytes?: number;
  mime_type?: string;
  uploaded_at: string;
}

export interface ManagementCostBreakdown {
  fuel: number;
  hangar: number;
  crew: number;
  maintenance: number;
  insurance?: number;
  admin_fees?: number;
}

export interface ManagementReport {
  id: string;
  aircraft_id: string;
  report_period_month: number;
  report_period_year: number;
  summary_notes: string;
  pdf_attachment_path: string;
  total_operating_cost_usd?: number;
  flight_hours_period?: number;
  cost_breakdown?: ManagementCostBreakdown;
  created_at: string;
}

export interface ComplianceAlert {
  id: string;
  aircraft_id: string;
  title: string;
  due_date: string;
  alert_type: AlertType;
  severity: 'critical' | 'warning' | 'info';
  resolved: boolean;
  created_at: string;
}

export interface BuyerLead {
  id: string;
  full_name: string;
  email: string;
  phone_whatsapp?: string;
  preferred_categories: string[];
  budget_range: string;
  operation_profile: string;
  timeline: string;
  source_tag: string;
  is_active_subscriber: boolean;
  created_at: string;
}

export interface InspectionRequest {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  aircraft_registration: string;
  aircraft_model?: string;
  hangar_airport_icao: string;
  hangar_location_notes?: string;
  has_logbooks_available: boolean;
  seller_contact_info?: string;
  preferred_inspection_date?: string;
  inspection_scope: 'full_ppi' | 'legal_only' | 'physical_only';
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
  created_at: string;
}

export interface AircraftListingDraft {
  make: string;
  model: string;
  year: number;
  registration: string;
  serial_number?: string;
  airframe_total_time_hours: number;
  engine_model?: string;
  engine_smoh?: number;
  avionics_summary: string[];
  home_base?: string;
  price_usd?: number;
  notes?: string;
}

export interface PpiReport {
  id: string;
  report_number: string;
  date: string;
  inspector_name: string;
  inspector_credentials: string; // "Abogado Aeronáutico (INAC/Colegio de Abogados) & Piloto Comercial CPL"
  aircraft_registration: string;
  serial_number: string;
  aircraft_make_model: string;
  location: string;
  physical_inspection: {
    airframe_condition: 'Excelente' | 'Aceptable' | 'Requiere Atención' | 'No Conforme';
    corrosion_findings: string;
    landing_gear_tires: string;
    control_surfaces: string;
  };
  powerplant_inspection: {
    engine_compressions: string;
    borescope_summary: string;
    oil_leakage: string;
    propeller_condition: string;
  };
  operational_runup_flight: {
    ground_runup: string;
    avionics_systems_check: string;
    test_flight_conducted: boolean;
    test_flight_observations?: string;
  };
  legal_regulatory_review: {
    inac_registration_status: 'Vigente' | 'En Proceso' | 'Irregular';
    faa_deregistration_status?: 'N/A' | 'Conforme' | 'Pendiente';
    title_search_lien_free: boolean; // Clear title
    national_registry_record: string;
    airworthiness_directive_status: string;
  };
  final_legal_technical_verdict: 'Aeronave Apta para Adquisición' | 'Apta con Observaciones Subsanables' | 'Riesgo Crítico / No Recomendada';
  confidential_legal_opinion: string;
}
