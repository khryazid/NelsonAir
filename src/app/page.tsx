'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plane, 
  ShieldCheck, 
  Scale, 
  Wrench, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Award, 
  ChevronRight,
  Sparkles
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
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Detail Modal */}
      <AircraftDetailModal
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
      />

      {/* Hero Section: Luminous Aviation White & Sky Blue */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-blue-50/60 via-white to-slate-50 bg-radar-grid overflow-hidden border-b border-slate-200/80">
        
        {/* Soft atmospheric blue glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-200/40 via-sky-100/50 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          
          {/* Pilot-Lawyer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-xs">
            <Plane className="w-3.5 h-3.5 transform -rotate-45 text-blue-600" />
            <span>Abogado Mercantil & Aeronáutico • Piloto Comercial Activo</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            Inspección técnica al mando de un piloto +{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600">
              blindaje legal mercantil y aeronáutico
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Sin intermediarios ni secretarías: un piloto al mando que entiende la mecánica, vuela el avión y redacta el contrato. Operaciones en <strong>Caracas (SVCS Charallave, SVMI Maiquetía, SVFM La Carlota)</strong> con alcance multijurisdicción <strong>YV (INAC) y N-Number (FAA)</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/inspeccion"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Agendar Inspección PPI in situ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/brokerage"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition flex items-center justify-center gap-2"
            >
              <Plane className="w-4 h-4 text-blue-600" />
              <span>Explorar Catálogo de Aeronaves</span>
            </Link>

            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Credibility / Authority Badges Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-slate-200 text-left">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div className="text-2xl font-black text-blue-700 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Sin Intermediarios</div>
              <p className="text-[11px] text-slate-500 mt-1">Revisión física, boroscopia y redacción jurídica directa.</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div className="text-2xl font-black text-sky-600 font-mono">INAC & FAA</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Multijurisdicción</div>
              <p className="text-[11px] text-slate-500 mt-1">Matrículas YV venezolanas y November (N) americanas.</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div className="text-2xl font-black text-emerald-600 font-mono">PPI Turn-Key</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">Pre-Purchase Audit</div>
              <p className="text-[11px] text-slate-500 mt-1">Prueba de compresión, vuelo de chequeo y Clear Title.</p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <div className="text-2xl font-black text-indigo-600 font-mono">Caracas Hub</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">SVCS • SVMI • SVFM</div>
              <p className="text-[11px] text-slate-500 mt-1">Presencia constante en Charallave, Maiquetía y La Carlota.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section: Trámites, Peritaje, Brokerage, Administración */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
              Soluciones Integrales
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Los 4 Pilares del Servicio Aeronáutico
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Combinamos el rigor del derecho mercantil y aeronáutico con la experiencia práctica en la cabina de mando.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1: Peritaje & PPI */}
            <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl transition duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Inspección Pre-Compra (PPI) in situ
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Inspección técnica directa en hangar: revisión de célula, boroscopia de motores, prueba en tierra (run-up), vuelo de prueba y verificación de títulos libres de gravámenes ante el INAC y FAA.
                </p>
              </div>
              <Link
                href="/inspeccion"
                className="mt-6 text-xs text-blue-700 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Solicitar Peritaje en Hangar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pilar 2: Trámites ante el INAC */}
            <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl transition duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-5 group-hover:scale-105 transition">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Gestoría Jurídica ante el INAC
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Traspasos de aeronaves, reserva y cambio de matrículas YV/YV-E, permisos de sobrevuelo y aterrizaje nacional e internacional, y renovación de Certificados de Aeronavegabilidad.
                </p>
              </div>
              <a
                href={buildWhatsAppLink('Hola Cap. Abg. Nelson, requiero gestionar trámites ante el INAC.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs text-sky-700 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Consultar Trámites INAC</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pilar 3: Brokerage & Mandatos */}
            <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl transition duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-105 transition">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Brokerage & Compraventa Blindada
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Búsqueda calificada de aeronaves en venta y colocación de inventario exclusivo. Redacción de contratos de opción de compraventa mercantil, retención en escrow y cierre sin riesgos.
                </p>
              </div>
              <Link
                href="/brokerage"
                className="mt-6 text-xs text-indigo-700 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Ver Catálogo de Aeronaves</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pilar 4: Administración Integral */}
            <div className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl transition duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-5 group-hover:scale-105 transition">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Administración Aeronáutica Turn-Key
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Por una tarifa mensual nos encargamos de que su aeronave se mantenga en condiciones óptimas: control de horas, seguros de casco y RC, mantenimientos de 100 horas y reportes mensuales.
                </p>
              </div>
              <Link
                href="/calculadora"
                className="mt-6 text-xs text-cyan-700 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Calcular Costo de Gestión</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Aircraft Catalog Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                Inventario Verificado
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Aeronaves Disponibles en Brokerage
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fichas técnicas auditadas con TTAF real, bitácoras continuas y estatus registral al día.
              </p>
            </div>

            <Link
              href="/brokerage"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 self-start md:self-auto transition"
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
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
              Transparencia Operativa
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ¿Cuánto cuesta mantener su aeronave?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pruebe nuestra calculadora interactiva y proyecte sus gastos mensuales antes de comprar o cambiar de modelo.
            </p>
          </div>

          <CostCalculator />
        </div>
      </section>

      {/* Off-Market Alerts & Mandate Section */}
      <OffMarketAlerts />

      {/* Pilot-Lawyer In Situ Authority Section */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs font-bold tracking-wider uppercase">
                  <Award className="w-3.5 h-3.5" />
                  <span>El Factor Diferenciador</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  Por qué contar con un Abogado que también es Piloto al Mando
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  En el sector aeronáutico privado venezolano e internacional, la mayoría de los problemas de compraventa y retención de aeronaves ocurren porque los gestores no conocen la mecánica del avión, o los mecánicos no comprenden las consecuencias jurídicas de una bitácora incompleta o una prenda mercantil no liberada.
                </p>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>Revisión física directa en el hangar antes de que usted transfiera un anticipo.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>Vuelo de prueba operacional para comprobar parámetros de presurización y aviónica en aire.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>Blindaje contractual con estipulaciones claras sobre vicios ocultos y escrow seguro.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href="/inspeccion"
                    className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs tracking-wide transition shadow-md flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Agendar Inspección en Hangar</span>
                  </Link>

                  <Link
                    href="/portal"
                    className="px-6 py-3 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-bold text-xs tracking-wide border border-white/20 transition flex items-center gap-2"
                  >
                    <span>Ingresar al Portal Propietario</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl text-center space-y-4 text-white">
                  <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white mx-auto">
                    <Plane className="w-10 h-10 transform -rotate-45" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Cap. Abg. Nelson R.</h3>
                    <p className="text-xs text-sky-200 font-semibold">Abogado Aeronáutico & Mercantil (29 años)</p>
                    <p className="text-[11px] text-slate-300 mt-1">Piloto Comercial CPL con habilitación Multimotor e IFR</p>
                  </div>
                  <div className="p-3.5 bg-black/20 rounded-2xl border border-white/10 text-[11px] text-slate-200 leading-tight">
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
