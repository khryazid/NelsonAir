'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  Plane,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Sparkles,
  Lock,
  Clock,
  Activity,
  AlertTriangle,
  BadgeCheck,
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

interface PillarData {
  id: string;
  badge: string;
  title: string;
  shortDesc: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  color: {
    bg: string;
    border: string;
    text: string;
    lightBg: string;
    badgeBg: string;
    ring: string;
    gradient: string;
  };
  cta: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
  features: string[];
  interactiveDemo: {
    title: string;
    subtitle: string;
    metrics: { label: string; value: string; detail: string }[];
    stepsOrItems: {
      phase: string;
      title: string;
      description: string;
      status: string;
    }[];
    verdict: string;
  };
}

const PILLARS: PillarData[] = [
  {
    id: 'ppi',
    badge: 'Pilar 01 • Peritaje Técnico',
    title: 'Inspección Pre-Compra (PPI) in situ',
    shortDesc:
      'Revisión física exhaustiva en hangar: célula, boroscopia, run-up de motores, prueba en vuelo al mando y auditoría documental registral.',
    tagline: 'Peritaje al mando de un piloto con ojos técnicos y firma legal colegiada',
    icon: ShieldCheck,
    color: {
      bg: 'bg-blue-600',
      border: 'border-blue-500',
      text: 'text-blue-700',
      lightBg: 'bg-blue-50',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      ring: 'ring-blue-500/20',
      gradient: 'from-blue-600 to-sky-600',
    },
    cta: {
      text: 'Agendar Inspección PPI en Hangar',
      href: '/inspeccion',
    },
    features: [
      'Boroscopia digital de motores (PT6A, TSIO, Continental, Williams)',
      'Medición de corrosión ultrasónica en largueros principales',
      'Vuelo de prueba al mando evaluando presurización, autopiloto y climb rate',
      'Auditoría registral completa de títulos, prendas y ADs vigentes ante INAC & FAA',
    ],
    interactiveDemo: {
      title: 'Simulador de Auditoría Pericial PPI',
      subtitle: 'Protocolo de 4 Fases ejecutado in situ en hangares de Caracas (SVCS, SVMI, SVFM)',
      metrics: [
        { label: 'Puntos Verificados', value: '48 Ítems', detail: 'Checklist exhaustivo de célula y aviónica' },
        { label: 'Tiempo de Ejecución', value: '24-48 hrs', detail: 'Dictamen preliminar el mismo día' },
        { label: 'Riesgo Mitigado', value: '100% Blindado', detail: 'Sin compras a ciegas ni vicios ocultos' },
      ],
      stepsOrItems: [
        {
          phase: 'Fase 1',
          title: 'Célula & Estructura',
          description: 'Inspección boroscópica en bahías de tren, inspección de remaches, largueros y control de corrosión oculta.',
          status: 'Aprobado • Sin Daños',
        },
        {
          phase: 'Fase 2',
          title: 'Planta Motriz & Run-Up',
          description: 'Prueba de compresión diferencial en frío y caliente. Parámetros ITT de turbina, corte de magnetos y filtro SOAP.',
          status: 'En Tolerancia Fabricante',
        },
        {
          phase: 'Fase 3',
          title: 'Vuelo de Prueba Funcional',
          description: 'Comportamiento en crucero: tasa de ascenso, pruebas de autopiloto, presurización diferencial y aviónica IFR Garmin.',
          status: 'Parámetros Nominales',
        },
        {
          phase: 'Fase 4',
          title: 'Auditoría Registral INAC/FAA',
          description: 'Cotejo de bitácoras originales con el Registro Aeronáutico. Certificación de título libre de gravámenes (Clear Title).',
          status: 'Título Libre de Gravamen',
        },
      ],
      verdict: 'Apto para Adquisición con Dictamen Legal y Técnico Vinculante',
    },
  },
  {
    id: 'inac',
    badge: 'Pilar 02 • Blindaje Legal',
    title: 'Gestoría Jurídica ante el INAC',
    shortDesc:
      'Traspasos de aeronaves, asignación y cambio de matrículas YV/YV-E, permisos de sobrevuelo y renovación de Certificados de Aeronavegabilidad.',
    tagline: 'Solvencia ante el Registro Aeronáutico Nacional sin trabas burocráticas',
    icon: Scale,
    color: {
      bg: 'bg-sky-600',
      border: 'border-sky-500',
      text: 'text-sky-700',
      lightBg: 'bg-sky-50',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      ring: 'ring-sky-500/20',
      gradient: 'from-sky-600 to-cyan-600',
    },
    cta: {
      text: 'Consultar Trámites INAC por WhatsApp',
      href: buildWhatsAppLink('Hola equipo de AeroLex Global, requiero gestionar trámites ante el INAC.'),
      isExternal: true,
    },
    features: [
      'Redacción y visado de contratos mercantiles de compraventa protocolizados',
      'Inscripción de hipotecas aeronáuticas, prendas y levantamiento de gravámenes',
      'Permisos de sobrevuelo y aterrizaje nacional e internacional (vuelos ferry)',
      'Tramitación expedita de Certificado de Aeronavegabilidad ordinario y de exportación',
    ],
    interactiveDemo: {
      title: 'Flujo Expedito de Regularización Registral',
      subtitle: 'Ruta legal segura para garantizar la propiedad irrevocable de la aeronave',
      metrics: [
        { label: 'Eficacia Registral', value: '100% Legal', detail: 'Cumplimiento RAV 45, RAV 47 y Código de Comercio' },
        { label: 'Jurisdicciones', value: 'INAC & FAA', detail: 'Manejo dual de matrículas YV y N-Number' },
        { label: 'Respaldo', value: 'Notarial & RAN', detail: 'Protocolización con firma de abogado colegiado' },
      ],
      stepsOrItems: [
        {
          phase: 'Etapa 1',
          title: 'Auditoría Registral Previa',
          description: 'Verificación del historial de dominio en el Registro Aeronáutico Nacional (RAN) para descartar medidas cautelares.',
          status: 'Libre de Medidas Cautelares',
        },
        {
          phase: 'Etapa 2',
          title: 'Documento Mercantil Notariado',
          description: 'Redacción de contrato de opción o compraventa con cláusulas de protección patrimonial y resolución de disputas.',
          status: 'Visado por Especialista',
        },
        {
          phase: 'Etapa 3',
          title: 'Inscripción en el INAC',
          description: 'Ingreso del expediente ante la Dirección de Registro Aeronáutico para la emisión de la Cédula de Matrícula.',
          status: 'Trámite Prioritario',
        },
        {
          phase: 'Etapa 4',
          title: 'Aeronavegabilidad & Permisos',
          description: 'Gestión técnica y jurídica del Certificado de Aeronavegabilidad y asignación de códigos transponder asignados.',
          status: 'Aeronave Lista para Operar',
        },
      ],
      verdict: 'Protección Jurídica Total: Ninguna transacción se cierra sin Clear Title confirmado',
    },
  },
  {
    id: 'brokerage',
    badge: 'Pilar 03 • Transacciones Seguras',
    title: 'Brokerage & Compraventa Blindada',
    shortDesc:
      'Búsqueda calificada off-market, colocación de inventario exclusivo, contratos con cláusula de escape y depósito protegido en cuenta Escrow.',
    tagline: 'Transacciones de alto patrimonio donde su dinero y su inversión nunca quedan expuestos',
    icon: Plane,
    color: {
      bg: 'bg-indigo-600',
      border: 'border-indigo-500',
      text: 'text-indigo-700',
      lightBg: 'bg-indigo-50',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      ring: 'ring-indigo-500/20',
      gradient: 'from-indigo-600 to-blue-700',
    },
    cta: {
      text: 'Explorar Catálogo de Aeronaves',
      href: '/brokerage',
    },
    features: [
      'Acceso exclusivo a inventario privado off-market no visible en portales públicos',
      'Estructuración de contratos de opción de compraventa condicionados a resultado satisfactorio del PPI',
      'Custodia segura del depósito de arras en cuentas Escrow (EE.UU. / Panamá / Suiza)',
      'Supervisión y cierre formal simultáneo: desembolso solo contra entrega de bitácoras originales',
    ],
    interactiveDemo: {
      title: 'Comparativa de Seguridad: Compra Tradicional vs AeroLex Global',
      subtitle: 'Cómo transformamos una compra de alto riesgo en un proceso transparente y sin sorpresas',
      metrics: [
        { label: 'Tasa de Éxito', value: '100% Cierres Limpios', detail: 'Sin disputas post-venta ni reclamos judiciales' },
        { label: 'Protección de Fondo', value: 'Escrow Garantizado', detail: 'Depósito resguardado hasta conformidad del PPI' },
        { label: 'Ahorro en Negociación', value: '8% - 15%', detail: 'Ajuste de precio basado en hallazgos del peritaje' },
      ],
      stepsOrItems: [
        {
          phase: 'Paso 1',
          title: 'Mandato de Búsqueda Calificado',
          description: 'Filtramos cientos de aeronaves descartando aquellas con historial de daños mayores o litigios sucesorales.',
          status: 'Filtro Confidencial',
        },
        {
          phase: 'Paso 2',
          title: 'Carta de Intención (LOI) & Escrow',
          description: 'Fijamos precio y condiciones. El depósito de garantía se deposita en cuenta fideicomiso protegida, nunca en manos del vendedor.',
          status: 'Fondos Protegidos',
        },
        {
          phase: 'Paso 3',
          title: 'Peritaje PPI Condicionante',
          description: 'Si el avión no aprueba la boroscopia o la auditoría de ADs, el comprador puede rescindir el contrato y recuperar el 100% del depósito.',
          status: 'Cláusula de Salida Segura',
        },
        {
          phase: 'Paso 4',
          title: 'Closing Day & Entrega de Activo',
          description: 'Simultáneamente se protocoliza el traspaso notarial, se liberan los fondos y se reciben bitácoras selladas y llaves.',
          status: 'Propiedad Transferida',
        },
      ],
      verdict: 'Adquisición Transparente: Cero incertidumbre, cero intermediarios especulativos',
    },
  },
  {
    id: 'management',
    badge: 'Pilar 04 • Operación Turn-Key',
    title: 'Administración Aeronáutica Turn-Key',
    shortDesc:
      'Gestión integral llave en mano: control de horas, seguros de casco y RC, mantenimientos de 100 horas y reportes mensuales de gestión de costos.',
    tagline: 'Usted disfruta volar; nosotros blindamos la operatividad, el mantenimiento y los costos',
    icon: Wrench,
    color: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-500',
      text: 'text-emerald-700',
      lightBg: 'bg-emerald-50',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      ring: 'ring-emerald-500/20',
      gradient: 'from-emerald-600 to-teal-600',
    },
    cta: {
      text: 'Calcular Presupuesto con la Calculadora',
      href: '/calculadora',
    },
    features: [
      'Monitoreo continuo de horas de célula (TTAF), motores (SMOH) y hélices (SPOH)',
      'Auditoría y renovación oportuna de pólizas de Casco y Responsabilidad Civil aérea',
      'Supervisión técnica de inspecciones periódicas de 50h, 100h y anual en talleres certificados OMAC',
      'Acceso al Portal Privado del Propietario con bóveda documental y reportes de gastos',
    ],
    interactiveDemo: {
      title: 'Panel Operativo de Gestión Integral de Aeronaves',
      subtitle: 'Simulación del monitoreo continuo para aeronaves basadas en Caracas y el Caribe',
      metrics: [
        { label: 'Disponibilidad de Vuelo', value: '99.2%', detail: 'Aeronave siempre con certificaciones al día' },
        { label: 'Ahorro Operativo', value: '~14% Anual', detail: 'Convenios de combustible y hangaraje en SVCS/SVMI' },
        { label: 'Bóveda Segura', value: '24/7 Digital', detail: 'Títulos, pólizas y bitácoras en la nube cifrada' },
      ],
      stepsOrItems: [
        {
          phase: 'Módulo 1',
          title: 'Control de Horómetro & Componentes',
          description: 'Registro digital de horas de vuelo y seguimiento de partes con vida límite (TBO de motores, tren y hélices).',
          status: 'Semáforo en Verde (Al Día)',
        },
        {
          phase: 'Módulo 2',
          title: 'Blindaje de Seguros & Coberturas',
          description: 'Negociación de pólizas de casco aéreo con aseguradoras de primer nivel para cobertura nacional e internacional.',
          status: 'Póliza Activa sin Brechas',
        },
        {
          phase: 'Módulo 3',
          title: 'Coordinación con Talleres OMAC',
          description: 'Fiscalización de facturación y supervisión de mano de obra en talleres mecánicos autorizados por el INAC.',
          status: 'Auditoría de Costos Aprobada',
        },
        {
          phase: 'Módulo 4',
          title: 'Reporte Financiero Mensual',
          description: 'Estado de cuenta consolidado con desglose de combustible, tasas aeroportuarias, hangaraje y fondo de reserva de overhaul.',
          status: 'Transparencia Contable Total',
        },
      ],
      verdict: 'Eficiencia Máxima: Su aeronave conserva su valor de reventa en el mercado internacional',
    },
  },
];

export function InteractivePillars() {
  const [activePillarId, setActivePillarId] = useState<string>('ppi');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];
  const ActiveIcon = activePillar.icon;

  // Intersection observer for subtle entry animations when scrolling into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset active step when changing pillar
  useEffect(() => {
    setActiveStepIndex(0);
  }, [activePillarId]);

  return (
    <section
      id="soluciones-aeronauticas"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 relative overflow-hidden"
    >
      {/* Decorative radar background rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-blue-100/60 rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] border border-blue-100/40 rounded-full pointer-events-none -z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-blue-200/30 rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Soluciones Integrales AeroLex Global</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Los 4 Pilares del Servicio Aeronáutico
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Combinamos el rigor del <strong>derecho mercantil y aeronáutico</strong> con la experiencia práctica en la <strong>cabina de mando</strong>. Selecciona cualquiera de los pilares para explorar su protocolo en vivo.
          </p>

          {/* Micro indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Haz clic en un pilar para ver el desglose técnico y legal</span>
          </div>
        </div>

        {/* 4 Interactive Pillar Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === activePillarId;

            return (
              <button
                key={pillar.id}
                id={`pillar-card-${pillar.id}`}
                onClick={() => setActivePillarId(pillar.id)}
                className={`relative text-left p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between group cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20 -translate-y-1'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Active indicator bar on top */}
                {isSelected && (
                  <div
                    className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r ${pillar.color.gradient}`}
                  />
                )}

                <div>
                  {/* Icon & Pillar Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${
                        isSelected
                          ? `${pillar.color.bg} text-white`
                          : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border transition-colors ${
                        isSelected
                          ? pillar.color.badgeBg
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      Pilar 0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base font-bold mb-2 transition-colors ${
                      isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                    }`}
                  >
                    {pillar.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.shortDesc}
                  </p>
                </div>

                {/* Bottom Action Hint */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span
                    className={`transition-colors ${
                      isSelected ? pillar.color.text : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    {isSelected ? 'Explorando protocolo' : 'Explorar detalles'}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? `${pillar.color.bg} text-white`
                        : 'bg-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Cockpit (Explorador Interactivo del Pilar Seleccionado) */}
        <div
          id={`pillar-detail-view-${activePillar.id}`}
          className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-98"
        >
          {/* Subtle colored ambient corner glow */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${activePillar.color.gradient} opacity-5 blur-3xl pointer-events-none rounded-full`}
          />

          {/* Top Header of the Cockpit */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-slate-100 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${activePillar.color.badgeBg}`}>
                  {activePillar.badge}
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Protocolo Oficial AeroLex Global
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <span>{activePillar.title}</span>
              </h3>

              <p className="text-sm text-slate-600 font-medium max-w-2xl">
                {activePillar.tagline}
              </p>
            </div>

            {/* Direct CTA Button */}
            <div className="shrink-0">
              <Link
                href={activePillar.cta.href}
                target={activePillar.cta.isExternal ? '_blank' : undefined}
                rel={activePillar.cta.isExternal ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${activePillar.color.bg} hover:brightness-110 shadow-blue-500/20`}
              >
                <span>{activePillar.cta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            {activePillar.interactiveDemo.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {metric.label}
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Main Interactive Stage: 2-Columns (Steps Breakdown + Value Checklist) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            {/* Left: Interactive Step-by-Step Simulator */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Fases del Protocolo (Haz clic en cada fase para ver el detalle)</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-semibold">
                  Fase {activeStepIndex + 1} de {activePillar.interactiveDemo.stepsOrItems.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {activePillar.interactiveDemo.stepsOrItems.map((step, idx) => {
                  const isStepActive = idx === activeStepIndex;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isStepActive
                          ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-400/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                              isStepActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {step.phase}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {step.title}
                          </span>
                        </div>

                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{step.status}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed pl-1">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Verdict Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Dictamen Final del Pilar
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {activePillar.interactiveDemo.verdict}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Features & Legal Guarantees */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantías y Alcance del Servicio</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-900">
                  ¿Qué incluye exactamente esta solución?
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Protegemos su patrimonio con estándares aeronáuticos auditables:
                </p>
              </div>

              <ul className="space-y-3.5">
                {activePillar.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Aviation Authority Callout */}
              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cobertura en Hangares:</span>
                </div>
                <p>
                  SVCS (Charallave), SVMI (Maiquetía), SVFM (La Carlota), Valencia (SVVA) y operaciones en el Caribe / EE. UU.
                </p>
              </div>

              {/* Quick direct link */}
              <div className="pt-2">
                <Link
                  href={activePillar.cta.href}
                  target={activePillar.cta.isExternal ? '_blank' : undefined}
                  rel={activePillar.cta.isExternal ? 'noopener noreferrer' : undefined}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs"
                >
                  <span>{activePillar.cta.text}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
