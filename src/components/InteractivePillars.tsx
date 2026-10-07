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
  Sparkles,
  Lock,
  Clock,
  Activity,
  FileCheck,
  AlertTriangle,
  BadgeCheck,
  ChevronRight,
  TrendingDown,
  FileText,
  Radio,
  Sliders,
  DollarSign
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

interface Pillar {
  id: string;
  number: string;
  title: string;
  shortSubtitle: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  badge: string;
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
  highlightPoints: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 'ppi',
    number: '01',
    title: 'Inspección Pre-Compra (PPI) in situ',
    shortSubtitle: 'Peritaje Técnico & Boroscopia en Hangar',
    tagline: 'Inspección técnica al mando de un piloto con ojos mecánicos y firma legal colegiada.',
    icon: ShieldCheck,
    accentColor: 'text-blue-400',
    glowColor: 'from-blue-600/30 to-sky-500/10',
    badge: 'Pilar 01 • Peritaje Técnico',
    ctaText: 'Agendar Inspección PPI en Hangar',
    ctaHref: '/inspeccion',
    highlightPoints: [
      'Boroscopia en caliente en turbinas PT6A / TSIO / Continental',
      'Medición de corrosión ultrasónica en largueros y tren',
      'Vuelo de prueba al mando evaluando presurización e IFR',
      'Auditoría documental: Clear Title y ADs ante INAC & FAA'
    ]
  },
  {
    id: 'inac',
    number: '02',
    title: 'Gestoría Jurídica ante el INAC',
    shortSubtitle: 'Blindaje Registral & Mercantil en Venezuela',
    tagline: 'Traspasos, reserva de matrículas YV y certificación sin trabas burocráticas ni riesgos.',
    icon: Scale,
    accentColor: 'text-sky-400',
    glowColor: 'from-sky-600/30 to-blue-500/10',
    badge: 'Pilar 02 • Blindaje Jurídico',
    ctaText: 'Consultar Trámites INAC por WhatsApp',
    ctaHref: buildWhatsAppLink('Hola equipo de AeroLex Global, requiero gestionar trámites ante el INAC.'),
    isExternal: true,
    highlightPoints: [
      'Contratos de compraventa mercantil protocolizados en Notaría',
      'Inscripción de hipotecas aeronáuticas y levantamiento de gravámenes',
      'Permisos de sobrevuelo y aterrizaje nacional e internacional (Ferry)',
      'Renovación expedita de Certificado de Aeronavegabilidad'
    ]
  },
  {
    id: 'brokerage',
    number: '03',
    title: 'Brokerage & Compraventa Blindada',
    shortSubtitle: 'Adquisición Off-Market & Fondos en Escrow',
    tagline: 'Transacciones donde su patrimonio nunca queda expuesto al cierre.',
    icon: Plane,
    accentColor: 'text-indigo-400',
    glowColor: 'from-indigo-600/30 to-blue-500/10',
    badge: 'Pilar 03 • Brokerage Blindado',
    ctaText: 'Explorar Catálogo de Aeronaves',
    ctaHref: '/brokerage',
    highlightPoints: [
      'Acceso exclusivo a inventario privado off-market confidencial',
      'Contratos de opción condicionados a resultado satisfactorio del PPI',
      'Custodia del depósito de arras en cuentas Escrow (EE.UU. / Suiza)',
      'Cierre formal simultáneo: fondos solo contra bitácoras originales'
    ]
  },
  {
    id: 'management',
    number: '04',
    title: 'Administración Aeronáutica Turn-Key',
    shortSubtitle: 'Operación, Seguros & Mantenimiento Llave en Mano',
    tagline: 'Usted disfruta volar; nosotros blindamos la disponibilidad y los costos operativos.',
    icon: Wrench,
    accentColor: 'text-emerald-400',
    glowColor: 'from-emerald-600/30 to-teal-500/10',
    badge: 'Pilar 04 • Gestión Integral',
    ctaText: 'Calcular Costo con la Calculadora',
    ctaHref: '/calculadora',
    highlightPoints: [
      'Monitoreo continuo de horas de célula (TTAF), motores y hélices',
      'Auditoría y renovación de pólizas de Casco y Responsabilidad Civil',
      'Fiscalización técnica en talleres certificados OMAC en SVCS / SVMI',
      'Ahorro promedio del ~14% en combustible y tasas operativas'
    ]
  }
];

export function InteractivePillars() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apple-style scroll listening
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Scrolled amount within container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setScrollProgress(progress);

      // Determine which pillar is active based on progress (0..1 split in 4 zones)
      // 0..0.25 -> 0, 0.25..0.50 -> 1, 0.50..0.75 -> 2, 0.75..1 -> 3
      const index = Math.min(3, Math.floor(progress * 4));
      setActivePillarIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPillar = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    // Center of that pillar's scroll bracket
    const targetOffset = (index / 3.6) * totalScrollable;
    window.scrollTo({
      top: sectionTop + targetOffset,
      behavior: 'smooth'
    });
  };

  const activePillar = PILLARS[activePillarIndex];

  return (
    <div
      id="soluciones-aeronauticas"
      ref={containerRef}
      className="relative bg-[#060c18] text-white"
      style={{ height: '360vh' }} // Apple-style extended scroll runway
    >
      {/* Sticky Cinematic Viewport (Stays locked on screen as user scrolls) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12 py-8 z-10">
        
        {/* Subtle Ambient Background Radars & Lights */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-radial from-blue-900/20 via-sky-900/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          {/* Subtle radar rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-blue-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-blue-500/5 rounded-full" />
        </div>

        {/* Top Header & Scroll Guided Progress Bar */}
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explorador Interactivo Guiado</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Los 4 Pilares del Servicio Aeronáutico</span>
              </h2>
            </div>

            {/* Apple-style Scroll Progress Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Desplázate para avanzar
                </div>
                <div className="text-xs font-mono font-bold text-sky-400">
                  Pilar {activePillar.number} / 04 • {Math.round(scrollProgress * 100)}% Completado
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <Activity className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Main Split Cockpit: Left Interactive Stepper + Right Cinematic Stage */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-2">
          
          {/* Left Column: 4 Pillar Steps with Scroll-Linked Tracking */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Scroll continuo o clic para saltar al pilar:</span>
            </div>

            <div className="space-y-2.5 relative">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isActive = idx === activePillarIndex;

                return (
                  <div
                    key={pillar.id}
                    id={`apple-pillar-step-${pillar.id}`}
                    onClick={() => scrollToPillar(idx)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.02] border-blue-400/80 shadow-[0_0_25px_rgba(37,99,235,0.25)] scale-[1.02]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 opacity-55 hover:opacity-90'
                    }`}
                  >
                    {/* Active vertical accent bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-sky-400 shadow-[0_0_10px_#38bdf8]" />
                    )}

                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                            : 'bg-white/10 text-slate-400 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider font-mono ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>
                            PILAR {pillar.number}
                          </span>
                          {isActive && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                              Activo en Pantalla
                            </span>
                          )}
                        </div>

                        <h3 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {pillar.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {pillar.shortSubtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Apple-Style Cinematic Animated Stage */}
          <div className="lg:col-span-7">
            <div className="relative bg-gradient-to-b from-white/[0.07] via-white/[0.04] to-black/40 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Dynamic Animated Ambient Glow behind current card */}
              <div
                className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${activePillar.glowColor} rounded-full blur-3xl pointer-events-none transition-all duration-700`}
              />

              {/* Stage Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-mono text-xs font-black">
                      {activePillar.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {activePillar.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    AeroLex Protocol v2.6
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {activePillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 font-medium leading-relaxed">
                    {activePillar.tagline}
                  </p>
                </div>
              </div>

              {/* Center Morphing Graphic: Tailored Visual Simulation for Each Pillar */}
              <div className="my-6">
                
                {/* Pillar 01 Visual: Radar Diagnostic Scanner */}
                {activePillarIndex === 0 && (
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Telemetría & Auditoría PPI in situ
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">48/48 PUNTOS APROBADOS</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Boroscopia Motores</div>
                        <div className="text-sm font-bold text-white mt-0.5">Turbinas PT6A / TSIO</div>
                        <div className="text-[10px] text-emerald-400 font-semibold mt-1">Sin desprendimiento térmico</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Medición Ultrasónica</div>
                        <div className="text-sm font-bold text-white mt-0.5">Largueros & Célula</div>
                        <div className="text-[10px] text-emerald-400 font-semibold mt-1">100% Espesor Nominal</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Vuelo de Prueba al Mando</div>
                        <div className="text-sm font-bold text-white mt-0.5">Test IFR & Presurización</div>
                        <div className="text-[10px] text-sky-400 font-semibold mt-1">Piloto Comercial CPL</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Auditoría Registral</div>
                        <div className="text-sm font-bold text-white mt-0.5">Clear Title Certificado</div>
                        <div className="text-[10px] text-emerald-400 font-semibold mt-1">Sin embargos ni prendas</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pillar 02 Visual: Official INAC Legal Document Workflow */}
                {activePillarIndex === 1 && (
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in zoom-in-95 duration-400">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-sky-400" />
                        Ruta Registral INAC (RAV 45 & RAV 47)
                      </span>
                      <span className="font-mono text-sky-400 font-bold">REGULARIZACIÓN TOTAL</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { step: '01', label: 'Protocolización Notarial', detail: 'Contrato de compraventa mercantil redactado y visado' },
                        { step: '02', label: 'Inscripción en el RAN', detail: 'Ingreso ante el Registro Aeronáutico Nacional con solvencia' },
                        { step: '03', label: 'Cédula de Matrícula YV', detail: 'Asignación oficial, cambio de titularidad e historial limpio' },
                        { step: '04', label: 'Certificado de Aeronavegabilidad', detail: 'Emisión y renovación legal para vuelo inmediato' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                          <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center shrink-0">
                            {item.step}
                          </span>
                          <div className="flex-1">
                            <span className="font-bold text-white">{item.label}</span>
                            <span className="text-slate-400 text-[11px] block">{item.detail}</span>
                          </div>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pillar 03 Visual: Escrow Vault & Secure Closing Shield */}
                {activePillarIndex === 2 && (
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Lock className="w-4 h-4 text-indigo-400" />
                        Arquitectura de Cierre con Escrow
                      </span>
                      <span className="font-mono text-indigo-400 font-bold">FONDOS PROTEGIDOS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20">
                        <div className="text-[10px] text-red-400 font-bold uppercase">Compra Tradicional Común</div>
                        <ul className="mt-2 space-y-1.5 text-[11px] text-slate-300">
                          <li>❌ Entrega de dinero directo al vendedor</li>
                          <li>❌ Sin cláusula de escape si hay fallas</li>
                          <li>❌ Riesgo de embargos o gravámenes ocultos</li>
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <div className="text-[10px] text-emerald-400 font-bold uppercase">AeroLex Global Shield</div>
                        <ul className="mt-2 space-y-1.5 text-[11px] text-slate-200">
                          <li>✅ Depósito protegido en cuenta Escrow</li>
                          <li>✅ Salida 100% garantizada ante fallas de PPI</li>
                          <li>✅ Fondos liberados solo contra bitácoras y llaves</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pillar 04 Visual: Turn-Key Telemetry & Cost Dashboard */}
                {activePillarIndex === 3 && (
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in zoom-in-95 duration-400">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-emerald-400" />
                        Monitoreo de Aeronave en Tiempo Real
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">DISPONIBILIDAD 99.2%</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Horas de Célula</div>
                        <div className="text-base font-black text-white font-mono mt-0.5">3,420 TTAF</div>
                        <div className="text-[9px] text-emerald-400 font-bold">Al día</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Pólizas Casco & RC</div>
                        <div className="text-base font-black text-emerald-400 font-mono mt-0.5">ACTIVA</div>
                        <div className="text-[9px] text-slate-400">Sin brechas</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold">Ahorro Operativo</div>
                        <div className="text-base font-black text-sky-400 font-mono mt-0.5">~14%</div>
                        <div className="text-[9px] text-slate-400">Combustible SVCS</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 italic text-center">
                      &quot;Reportes mensuales consolidados con desglose exacto de combustible, hangaraje y fondo de reserva de overhaul.&quot;
                    </p>
                  </div>
                )}

              </div>

              {/* Stage Bottom Features & Action Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Solución integral respaldada con membrete legal colegiado</span>
                </div>

                <Link
                  href={activePillar.ctaHref}
                  target={activePillar.isExternal ? '_blank' : undefined}
                  rel={activePillar.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  <span>{activePillar.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom subtle scroll helper cue */}
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5 font-mono">
          <span>AeroLex Global • Soluciones Aeronáuticas</span>
          <div className="flex items-center gap-2 text-sky-400">
            <span className="animate-bounce">↓</span>
            <span>Continúa haciendo scroll hacia abajo</span>
          </div>
        </div>

      </div>
    </div>
  );
}
