import { 
  Aircraft, 
  ComplianceAlert, 
  AircraftDocument, 
  ManagementReport, 
  BuyerLead, 
  InspectionRequest,
  PpiReport 
} from './types';

// High-fidelity seed aircraft
export const INITIAL_AIRCRAFT: Aircraft[] = [
  {
    id: 'ac-kingair-b200',
    registration_mark: 'YV-3450',
    serial_number: 'BB-1688',
    authority: 'INAC',
    make: 'Beechcraft',
    model: 'King Air B200',
    manufacture_year: 2002,
    home_base_icao: 'SVCS', // Charallave
    status: 'published',
    price_usd: 1850000,
    is_for_sale: true,
    is_under_management: true,
    featured_image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80'
    ],
    description_notes: 'Excelente estado de conservación. Operada bajo estricto programa de mantenimiento en hangar privado en SVCS (Charallave). Pintura y tapicería ejecutiva en cuero beige renovadas en 2021. Bitácoras completas y continuas desde fábrica.',
    technical_specs: {
      airframe_tt_hours: 4210.5,
      engine_details: [
        { position: 'L', model: 'Pratt & Whitney PT6A-42', smoh_hours: 820.0, tbo: 3600 },
        { position: 'R', model: 'Pratt & Whitney PT6A-42', smoh_hours: 820.0, tbo: 3600 }
      ],
      propeller_details: [
        { position: 'L', spoh_hours: 190.0, tbo_hours: 3000 },
        { position: 'R', spoh_hours: 190.0, tbo_hours: 3000 }
      ],
      avionics_features: [
        'Garmin G1000 NXi Integrated Flight Deck',
        'Dual GIA 63W WAAS GPS/NAV/COM',
        'Garmin GWX 70 Digital Color Radar',
        'Garmin GTX 345R ADS-B In/Out Transponder',
        'Garmin GFC 700 Digital Autopilot'
      ],
      cabin_configuration: 'Configuración VIP ejecutiva 6 plazas + 2 tripulantes, mesitas de cortesía en madera nogal pulida, bar refrescos y baño químico trasero.',
      logbooks_complete: true,
      damage_history: false,
      legal_clearance_title: true
    }
  },
  {
    id: 'ac-citation-cj3',
    registration_mark: 'N-892CA',
    serial_number: '525B-0142',
    authority: 'FAA',
    make: 'Cessna',
    model: 'Citation CJ3',
    manufacture_year: 2008,
    home_base_icao: 'SVMI', // Maiquetía
    status: 'published',
    price_usd: 3790000,
    is_for_sale: true,
    is_under_management: true,
    featured_image_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?auto=format&fit=crop&w=1200&q=80'
    ],
    description_notes: 'Aeronave matrícula November (FAA) con base en SVMI. Ideal para misiones corporativas transcaribeñas sin escalas (Caracas - Miami / Santo Domingo / Panamá). TAP Elite Engine Program.',
    technical_specs: {
      airframe_tt_hours: 3450.5,
      engine_details: [
        { position: '1', model: 'Williams FJ44-3A', smoh_hours: 1100.0, tbo: 4000 },
        { position: '2', model: 'Williams FJ44-3A', smoh_hours: 1100.0, tbo: 4000 }
      ],
      avionics_features: [
        'Rockwell Collins Pro Line 21',
        'Dual FMS-3000 con WAAS/LPV',
        'TCAS II Traffic Collision Avoidance',
        'Mark VIII EGPWS Terrain Awareness',
        'Dual Collins TDR-94D Mode S Transponders (ADS-B Out)'
      ],
      cabin_configuration: 'Cabina ejecutiva para 7 pasajeros, asientos en piel marfil, tomas USB de 110V, lavabo privado certificado para despegue.',
      logbooks_complete: true,
      damage_history: false,
      legal_clearance_title: true
    }
  },
  {
    id: 'ac-cessna-206h',
    registration_mark: 'YV-1892',
    serial_number: 'U206-08210',
    authority: 'INAC',
    make: 'Cessna',
    model: 'Stationair 206H',
    manufacture_year: 2005,
    home_base_icao: 'SVFM', // La Carlota
    status: 'published',
    price_usd: 395000,
    is_for_sale: true,
    is_under_management: false,
    featured_image_url: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f1?auto=format&fit=crop&w=1200&q=80',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f1?auto=format&fit=crop&w=1200&q=80'
    ],
    description_notes: 'La mejor aeronave utilitaria de pistón para Venezuela. Tren de aterrizaje robusto para pistas no pavimentadas (fincas en Barinas, Guárico, Canaima). Carga útil excepcional.',
    technical_specs: {
      airframe_tt_hours: 2180.0,
      engine_details: [
        { position: 'Single', model: 'Lycoming IO-540-AC1A5 (300 HP)', smoh_hours: 340.0, tbo: 2000 }
      ],
      propeller_details: [
        { position: 'Single', spoh_hours: 140.0, tbo_hours: 2000 }
      ],
      avionics_features: [
        'Garmin G1000 Suite con Synthetic Vision',
        'Garmin GFC 700 Autopilot',
        'Garmin GTX 33ES ADS-B Transponder',
        'Stormscope WX-500'
      ],
      cabin_configuration: '6 asientos utilitarios de fácil remoción para carga liviana o evacuación aeromédica.',
      logbooks_complete: true,
      damage_history: false,
      legal_clearance_title: true
    }
  },
  {
    id: 'ac-cheyenne-iii',
    registration_mark: 'YV-2210',
    serial_number: 'PA42-800201',
    authority: 'INAC',
    make: 'Piper',
    model: 'Cheyenne III PA-42',
    manufacture_year: 1982,
    home_base_icao: 'SVCS',
    status: 'under_contract',
    price_usd: 620000,
    is_for_sale: true,
    is_under_management: true,
    featured_image_url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
    gallery_image_urls: [
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80'
    ],
    description_notes: 'Bimotor turbohélice de alto desempeño. Motores PT6A-41 con excelente remanente de horas. Bajo proceso de inspección pre-compra (PPI) y cierre contractual.',
    technical_specs: {
      airframe_tt_hours: 6850.0,
      engine_details: [
        { position: 'L', model: 'PT6A-41', smoh_hours: 1450.0, tbo: 3600 },
        { position: 'R', model: 'PT6A-41', smoh_hours: 1450.0, tbo: 3600 }
      ],
      propeller_details: [
        { position: 'L', spoh_hours: 420.0, tbo_hours: 3000 },
        { position: 'R', spoh_hours: 420.0, tbo_hours: 3000 }
      ],
      avionics_features: [
        'Garmin GTN 750 Touchscreen Nav/Com',
        'Dual Garmin G5 EFIS Displays',
        'Bendix King RDR-160 Color Radar'
      ],
      cabin_configuration: '8 asientos en cabina presurizada, interior renovado.',
      logbooks_complete: true,
      damage_history: false,
      legal_clearance_title: true
    }
  }
];

// Seed compliance alerts for owner portal
export const INITIAL_COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'alert-1',
    aircraft_id: 'ac-kingair-b200',
    title: 'Vencimiento de Póliza de Casco y Responsabilidad Civil (RC)',
    due_date: '2026-10-15',
    alert_type: 'insurance',
    severity: 'warning',
    resolved: false,
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 'alert-2',
    aircraft_id: 'ac-kingair-b200',
    title: 'Renovación de Certificado de Aeronavegabilidad INAC',
    due_date: '2026-11-20',
    alert_type: 'regulatory',
    severity: 'info',
    resolved: false,
    created_at: '2026-09-10T12:00:00Z'
  },
  {
    id: 'alert-3',
    aircraft_id: 'ac-kingair-b200',
    title: 'Inspección Periódica Fase 1 & 2 (200 Horas / 24 Meses)',
    due_date: '2026-10-05',
    alert_type: 'maintenance_100h',
    severity: 'critical',
    resolved: false,
    created_at: '2026-09-15T08:30:00Z'
  },
  {
    id: 'alert-4',
    aircraft_id: 'ac-citation-cj3',
    title: 'Actualización Base de Datos de Navegación FMS Jeppesen Airac 2610',
    due_date: '2026-10-08',
    alert_type: 'regulatory',
    severity: 'info',
    resolved: false,
    created_at: '2026-09-20T14:00:00Z'
  }
];

// Seed documents in private vault
export const INITIAL_DOCUMENTS: AircraftDocument[] = [
  {
    id: 'doc-1',
    aircraft_id: 'ac-kingair-b200',
    document_name: 'Certificado de Aeronavegabilidad INAC N° ARW-2025-0412.pdf',
    document_type: 'airworthiness_cert',
    storage_path: '/vault/ac-kingair-b200/arw_cert.pdf',
    expiration_date: '2026-11-20',
    file_size_bytes: 2450000,
    mime_type: 'application/pdf',
    uploaded_at: '2025-11-20T10:00:00Z'
  },
  {
    id: 'doc-2',
    aircraft_id: 'ac-kingair-b200',
    document_name: 'Póliza de Seguros Aeronáuticos Seguros Caracas N° CASCO-88912.pdf',
    document_type: 'insurance_policy',
    storage_path: '/vault/ac-kingair-b200/seguro_casco.pdf',
    expiration_date: '2026-10-15',
    file_size_bytes: 3890000,
    mime_type: 'application/pdf',
    uploaded_at: '2025-10-15T15:30:00Z'
  },
  {
    id: 'doc-3',
    aircraft_id: 'ac-kingair-b200',
    document_name: 'Título de Propiedad & Registro Subalterno Aeronáutico.pdf',
    document_type: 'title_deed',
    storage_path: '/vault/ac-kingair-b200/titulo_propiedad.pdf',
    file_size_bytes: 5200000,
    mime_type: 'application/pdf',
    uploaded_at: '2022-03-14T09:00:00Z'
  },
  {
    id: 'doc-4',
    aircraft_id: 'ac-kingair-b200',
    document_name: 'Bitácora Digitalizada Motor L & R (Logbooks 2021-2026).pdf',
    document_type: 'logbook_scan',
    storage_path: '/vault/ac-kingair-b200/logbooks_motores.pdf',
    file_size_bytes: 18400000,
    mime_type: 'application/pdf',
    uploaded_at: '2026-08-01T11:20:00Z'
  },
  {
    id: 'doc-5',
    aircraft_id: 'ac-kingair-b200',
    document_name: 'Dictamen Pericial Pre-Compra PPI - Abg. Piloto Nelson.pdf',
    document_type: 'ppi_report',
    storage_path: '/vault/ac-kingair-b200/ppi_report_legal.pdf',
    file_size_bytes: 4100000,
    mime_type: 'application/pdf',
    uploaded_at: '2022-02-18T16:45:00Z'
  }
];

// Seed management reports
export const INITIAL_MANAGEMENT_REPORTS: ManagementReport[] = [
  {
    id: 'rep-2026-08',
    aircraft_id: 'ac-kingair-b200',
    report_period_month: 8,
    report_period_year: 2026,
    summary_notes: 'Operación mensual estable. Se volaron 18.4 horas en rutas Caracas - Porlamar y Caracas - Canaima. Mantenimiento preventivo de 50 horas ejecutado en taller certificado en Charallave. Sistemas al 100%.',
    pdf_attachment_path: '/reports/ac-kingair-b200/informe_mensual_agosto_2026.pdf',
    total_operating_cost_usd: 12450.0,
    flight_hours_period: 18.4,
    cost_breakdown: {
      fuel: 6200,
      hangar: 1800,
      crew: 2500,
      maintenance: 1450,
      insurance: 500
    },
    created_at: '2026-09-02T10:00:00Z'
  },
  {
    id: 'rep-2026-07',
    aircraft_id: 'ac-kingair-b200',
    report_period_month: 7,
    report_period_year: 2026,
    summary_notes: 'Se acumularon 22.1 horas de vuelo. Inspección de baterías y calibración de brújula magnética completadas. Consumo promedio de Jet A-1 dentro de los parámetros esperados (94 GPH).',
    pdf_attachment_path: '/reports/ac-kingair-b200/informe_mensual_julio_2026.pdf',
    total_operating_cost_usd: 14820.0,
    flight_hours_period: 22.1,
    cost_breakdown: {
      fuel: 7550,
      hangar: 1800,
      crew: 2800,
      maintenance: 2170,
      insurance: 500
    },
    created_at: '2026-08-03T11:00:00Z'
  }
];

// Seed buyer leads (Off-market)
export const INITIAL_BUYER_LEADS: BuyerLead[] = [
  {
    id: 'lead-1',
    full_name: 'Dr. Alejandro Morales (Grupo Agropecuario del Centro)',
    email: 'amorales@agrocentro.com.ve',
    phone_whatsapp: '+58 414 321 9988',
    preferred_categories: ['turboprop', 'piston'],
    budget_range: '750k_2m',
    operation_profile: 'unpaved_strips',
    timeline: 'immediate',
    source_tag: 'website_offmarket_form',
    is_active_subscriber: true,
    created_at: '2026-09-25T14:20:00Z'
  },
  {
    id: 'lead-2',
    full_name: 'Inversiones Marítimas & Mineras Orinoco',
    email: 'presidencia@inversionesorinoco.com',
    phone_whatsapp: '+58 412 876 5432',
    preferred_categories: ['light_jet', 'turboprop'],
    budget_range: 'over_2m',
    operation_profile: 'ifr_executive',
    timeline: '1_3_months',
    source_tag: 'website_offmarket_form',
    is_active_subscriber: true,
    created_at: '2026-09-28T09:15:00Z'
  },
  {
    id: 'lead-3',
    full_name: 'Cap. Roberto Henríquez (Operaciones Chárter del Caribe)',
    email: 'r.henriquez@caribbeancharters.aero',
    phone_whatsapp: '+1 305 441 8920',
    preferred_categories: ['light_jet'],
    budget_range: 'over_2m',
    operation_profile: 'commercial',
    timeline: 'immediate',
    source_tag: 'website_offmarket_form',
    is_active_subscriber: true,
    created_at: '2026-09-29T11:40:00Z'
  }
];

// Seed inspection requests (PPI)
export const INITIAL_INSPECTIONS: InspectionRequest[] = [
  {
    id: 'insp-1',
    client_name: 'Carlos Eduardo Mendoza',
    client_email: 'cmendoza@grupointl.com',
    client_phone: '+58 414 901 2233',
    aircraft_registration: 'YV-2849',
    aircraft_model: 'Beechcraft Baron 58 (1998)',
    hangar_airport_icao: 'SVCS (Charallave)',
    hangar_location_notes: 'Hangar N° 7 - Aerocentro Servicios',
    has_logbooks_available: true,
    seller_contact_info: 'Vendedor: Ing. Gustavo Briceño (+58 424 555 1234)',
    preferred_inspection_date: '2026-10-04',
    inspection_scope: 'full_ppi',
    status: 'confirmed',
    created_at: '2026-09-27T16:00:00Z'
  },
  {
    id: 'insp-2',
    client_name: 'Valeria Siqueira',
    client_email: 'vsiqueira@capitalpartners.ve',
    client_phone: '+58 412 111 8899',
    aircraft_registration: 'N-451JP',
    aircraft_model: 'Cirrus SR22 G6 (2020)',
    hangar_airport_icao: 'SVMI (Maiquetía)',
    hangar_location_notes: 'Rampa de Aviación General - Hangar Delta',
    has_logbooks_available: true,
    seller_contact_info: 'Broker en Miami / Representante local',
    preferred_inspection_date: '2026-10-09',
    inspection_scope: 'full_ppi',
    status: 'pending',
    created_at: '2026-09-29T08:10:00Z'
  }
];

// Seed sample legal-technical PPI report for generator preview
export const SAMPLE_PPI_REPORT: PpiReport = {
  id: 'ppi-rep-2026-004',
  report_number: 'PPI-AERO-2026-0089',
  date: '2026-09-28',
  inspector_name: 'Cap. Abg. Nelson R. (Piloto Comercial CPL / Abg. Aeronáutico)',
  inspector_credentials: 'Abogado Especialista en Derecho Aeronáutico & Mercantil (INAC N° REG-8842) - Piloto Comercial Multimotor con Habilitación IFR',
  aircraft_registration: 'YV-3450',
  serial_number: 'BB-1688',
  aircraft_make_model: 'Beechcraft King Air B200 (2002)',
  location: 'Aeropuerto Internacional de Caracas Óscar Machado Zuloaga (SVCS / Charallave) - Hangar 4',
  physical_inspection: {
    airframe_condition: 'Excelente',
    corrosion_findings: 'Sin evidencias de corrosión en largueros, bahías de tren de aterrizaje ni empenaje. Célula íntegra.',
    landing_gear_tires: 'Neumáticos principales al 85% de vida útil. Líneas hidráulicas secas, sin fugas visibles.',
    control_surfaces: 'Bisagras, actuadores y timones de profundidad / alerones lubricados y sin holguras anormales.'
  },
  powerplant_inspection: {
    engine_compressions: 'Ambos motores PT6A-42 presentan parámetros de arranque ITT (680°C) muy por debajo del límite máximo.',
    borescope_summary: 'Inspección boroscópica en turbina compresora y cámara de combustión sin desprendimiento térmico de álabes.',
    oil_leakage: 'Estanco. Filtros de aceite limpios sin partículas ferrosas (Chipping plugs limpios).',
    propeller_condition: 'Palas Hartzell cuatripalas libres de muescas (nicks). Sellos de bujes secos.'
  },
  operational_runup_flight: {
    ground_runup: 'Prueba de aceleración nominal. Reversas simétricas. Generadores y baterías al 100%.',
    avionics_systems_check: 'Garmin G1000 NXi enganchó autopiloto GFC 700 en modo NAV y ALT HOLD sin desviaciones.',
    test_flight_conducted: true,
    test_flight_observations: 'Vuelo de prueba de 45 minutos (SVCS - Tuy - SVCS). Rango de crucero verificado: 275 KTAS a FL220. Presurización suave con diferencial de 6.0 PSI.'
  },
  legal_regulatory_review: {
    inac_registration_status: 'Vigente',
    faa_deregistration_status: 'Conforme',
    title_search_lien_free: true,
    national_registry_record: 'Expediente registral verificado ante la Dirección de Registro Aeronáutico Nacional (INAC). Folio N° 412. Sin prendas mercantiles ni embargos judiciales activos.',
    airworthiness_directive_status: 'Directivas de Aeronavegabilidad (ADs) del fabricante y la FAA al día al 100%. Registro de cumplimiento en bitácora foliada.'
  },
  final_legal_technical_verdict: 'Aeronave Apta para Adquisición',
  confidential_legal_opinion: 'Tras el exhaustivo peritaje físico, prueba de motor, boroscopia, vuelo de verificación y consulta al Registro Aeronáutico, dictamino que la aeronave YV-3450 se encuentra en condiciones óptimas para la compraventa. Se recomienda redactar el contrato con reserva de dominio bajo escrow y transferir la titularidad de inmediato ante el INAC.'
};
