'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plane, 
  ShieldCheck, 
  Scale, 
  Wrench, 
  MapPin, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Award, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  Search
} from 'lucide-react';
import { AircraftCard } from '@/components/AircraftCard';
import { AircraftDetailModal } from '@/components/AircraftDetailModal';
import { CostCalculator } from '@/components/CostCalculator';
import { OffMarketAlerts } from '@/components/OffMarketAlerts';
import { INITIAL_AIRCRAFT } from '@/lib/data-store';
import { Aircraft } from '@/lib/types';
import { buildWhatsAppLink } from '@/lib/utils';

export default function HomePage() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const featuredAircraft = INITIAL_AIRCRAFT.slice(0, 3);

  const whatsappHeroUrl = buildWhatsAppLink(
    'Hola Cap. Abg. Nelson, requiero asesoría legal aeronáutica o peritaje de una aeronave.'
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Detail Modal */}
      <AircraftDetailModal
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
      />

      {/* Hero Section: Pilot-Lawyer High-Impact Positioning */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#070b16] bg-radar-grid overflow-hidden border-b border-slate-800/80">
        
        {/* Ambient lighting glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-sky-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          
          {/* Pilot-Lawyer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
            <Plane className="w-3.5 h-3.5 transform -rotate-45 text-amber-400" />
            <span>Abogado Mercantil & Aeronáutico • Piloto Comercial Activo</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Inspección técnica al mando de un piloto +{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              blindaje legal mercantil y aeronáutico
            </span>
          </h1>

          {/* Subtitle / Unique Value Proposition */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Sin intermediarios ni secretarías: un piloto al mando que entiende la mecánica, vuela el avión y redacta el contrato. Operaciones en <strong>Caracas (SVCS Charallave, SVMI Maiquetía, SVFM La Carlota)</strong> con alcance multijurisdicción <strong>YV (INAC) y N-Number (FAA)</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inspeccion"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition shadow-xl flex items-center justify-center gap-2 group"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Agendar Inspección PPI in situ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/brokerage"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Explorar Aeronaves en Venta</span>
            </Link>

            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Credibility / Authority Badges Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-800/80 text-left">
            <div className="bg-[#0b1426]/70 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-black text-amber-400 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Sin Intermediarios</div>
              <p className="text-[11px] text-slate-400 mt-1">Revisión física, boroscopia y redacción jurídica directa.</p>
            </div>

            <div className="bg-[#0b1426]/70 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-black text-sky-400 font-mono">INAC & FAA</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Multijurisdicción</div>
              <p className="text-[11px] text-slate-400 mt-1">Matrículas YV venezolanas y November (N) americanas.</p>
            </div>

            <div className="bg-[#0b1426]/70 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-black text-emerald-400 font-mono">PPI Turn-Key</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Pre-Purchase Audit</div>
              <p className="text-[11px] text-slate-400 mt-1">Prueba de compresión, vuelo de chequeo y Clear Title.</p>
            </div>

            <div className="bg-[#0b1426]/70 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-black text-purple-400 font-mono">Caracas Hub</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">SVCS • SVMI • SVFM</div>
              <p className="text-[11px] text-slate-400 mt-1">Presencia constante en Charallave, Maiquetía y La Carlota.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section: Trámites, Peritaje, Brokerage, Administración */}
      <section className="py-20 bg-[#080d1a] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              Soluciones Integrales
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Los 4 Pilares del Servicio Aeronáutico
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Combinamos el rigor del derecho mercantil y aeronáutico con la experiencia práctica en la cabina de mando.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1: Peritaje & PPI */}
            <div className="bg-[#0b1426] border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Inspección Pre-Compra (PPI) in situ
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspección técnica directa en hangar: revisión de célula, boroscopia de motores, prueba en tierra (run-up), vuelo de prueba y verificación de títulos libres de gravámenes ante el INAC y FAA.
                </p>
              </div>
              <Link
                href="/inspeccion"
                className="mt-6 text-xs text-amber-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Solicitar Peritaje en Hangar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pilar 2: Trámites ante el INAC */}
            <div className="bg-[#0b1426] border border-slate-800 hover:border-sky-500/40 p-6 rounded-2xl transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-105 transition">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Gestoría Jurídica ante el INAC
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Traspasos de aeronaves, reserva y cambio de matrículas YV/YV-E, permisos de sobrevuelo y aterrizaje nacional e internacional, y renovación de Certificados de Aeronavegabilidad.
                </p>
              </div>
              <a
                href={buildWhatsAppLink('Hola Cap. Abg. Nelson, requiero gestionar trámites ante el INAC.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs text-sky-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Consultar Trámites INAC</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pilar 3: Brokerage & Mandatos */}
            <div className="bg-[#0b1426] border border-slate-800 hover:border-emerald-500/40 p-6 rounded-2xl transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Brokerage & Compraventa Blindada
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Búsqueda calificada de aeronaves en venta y colocación de inventario exclusivo. Redacción de contratos de opción de compraventa mercantil, retención en escrow y cierre sin riesgos.
                </p>
              </div>
              <Link
                href="/brokerage"
                className="mt-6 text-xs text-emerald-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Ver Catálogo de Aeronaves</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pilar 4: Administración Integral */}
            <div className="bg-[#0b1426] border border-slate-800 hover:border-purple-500/40 p-6 rounded-2xl transition duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-105 transition">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Administración Aeronáutica Turn-Key
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Por una tarifa mensual nos encargamos de que su aeronave se mantenga en condiciones óptimas: control de horas, seguros de casco y RC, mantenimientos de 100 horas y reportes mensuales.
                </p>
              </div>
              <Link
                href="/calculadora"
                className="mt-6 text-xs text-purple-400 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Calcular Costo de Gestión</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Aircraft Catalog Section */}
      <section className="py-20 bg-[#070b16] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Inventario Verificado
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Aeronaves Disponibles en Brokerage
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Fichas técnicas auditadas con TTAF real, bitácoras continuas y estatus registral al día.
              </p>
            </div>

            <Link
              href="/brokerage"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 self-start md:self-auto"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAircraft.map((ac) => (
              <AircraftCard
                key={ac.id}
                aircraft={ac}
                onOpenDetails={(item) => setSelectedAircraft(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="py-20 bg-[#080d1a] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Transparencia Operativa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Cuánto cuesta mantener su aeronave?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pruebe nuestra calculadora interactiva y proyecte sus gastos mensuales antes de comprar o cambiar de modelo.
            </p>
          </div>

          <CostCalculator />
        </div>
      </section>

      {/* Off-Market Alerts & Mandate Section (From PDF Page 7-12) */}
      <OffMarketAlerts />

      {/* Pilot-Lawyer In Situ Authority Section */}
      <section className="py-20 bg-[#050a14] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#091122] border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold tracking-wider uppercase">
                  <Award className="w-3.5 h-3.5" />
                  <span>El Factor Diferenciador</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Por qué contar con un Abogado que también es Piloto al Mando
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  En el sector aeronáutico privado venezolano e internacional, la mayoría de los problemas de compraventa y retención de aeronaves ocurren porque los gestores no conocen la mecánica del avión, o los mecánicos no comprenden las consecuencias jurídicas de una bitácora incompleta o una prenda mercantil no liberada.
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Revisión física directa en el hangar antes de que usted transfiera un anticipo.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Vuelo de prueba operacional para comprobar parámetros de presurización y aviónica en aire.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Blindaje contractual con estipulaciones claras sobre vicios ocultos y escrow seguro.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href="/inspeccion"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition shadow-lg flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Agendar Inspección en Hangar</span>
                  </Link>

                  <Link
                    href="/portal"
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wide border border-slate-700 transition flex items-center gap-2"
                  >
                    <span>Ingresar al Portal Propietario</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-sm bg-[#060b14] border border-amber-500/40 p-6 rounded-2xl shadow-xl text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/30 to-sky-600/30 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
                    <Plane className="w-10 h-10 transform -rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cap. Abg. Nelson R.</h3>
                    <p className="text-xs text-amber-400 font-medium">Abogado Aeronáutico & Mercantil (29 años)</p>
                    <p className="text-[11px] text-slate-400 mt-1">Piloto Comercial CPL con habilitación Multimotor e IFR</p>
                  </div>
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-tight">
                    &quot;La seguridad jurídica en la aviación no se negocia desde un escritorio: se comprueba en el hangar y se valida en vuelo.&quot;
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
