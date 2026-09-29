'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, 
  Plane, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Printer, 
  Download
} from 'lucide-react';
import { Aircraft } from '@/lib/types';
import { formatCurrency, formatHours, buildWhatsAppLink } from '@/lib/utils';

interface AircraftDetailModalProps {
  aircraft: Aircraft | null;
  onClose: () => void;
}

export function AircraftDetailModal({ aircraft, onClose }: AircraftDetailModalProps) {
  if (!aircraft) return null;

  const specs = aircraft.technical_specs;

  const whatsappInquiry = buildWhatsAppLink(
    `Hola Cap. Abg. Nelson, requiero el dossier jurídico y técnico completo de la aeronave ${aircraft.make} ${aircraft.model} (${aircraft.registration_mark}).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c1527] border border-slate-700/80 rounded-2xl shadow-2xl text-white overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#080d1a]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-extrabold text-xs tracking-wider">
              {aircraft.registration_mark}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {aircraft.manufacture_year} {aircraft.make} {aircraft.model}
              </h2>
              <p className="text-xs text-slate-400">
                Ficha Técnica Aeronáutica Oficial • Estatus {aircraft.authority}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs hidden sm:flex items-center gap-1.5 transition"
              title="Imprimir Ficha"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 rounded-xl overflow-hidden aspect-[16/10] bg-slate-950 border border-slate-800 relative">
              <img
                src={aircraft.featured_image_url}
                alt={`${aircraft.make} ${aircraft.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Base OACI: {aircraft.home_base_icao} (Venezuela)</span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-4 rounded-xl bg-[#070d18] border border-slate-800 space-y-3">
                <div className="text-xs text-slate-400">Precio de Venta Solicitado:</div>
                <div className="text-3xl font-extrabold text-amber-400">
                  {formatCurrency(aircraft.price_usd)}
                </div>
                <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-850">
                  <div className="flex justify-between">
                    <span>Número de Serie (MSN):</span>
                    <span className="font-mono text-white">{aircraft.serial_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Año de Fabricación:</span>
                    <span className="text-white">{aircraft.manufacture_year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autoridad de Registro:</span>
                    <span className="text-white font-bold">{aircraft.authority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estatus Legal de Título:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Libre de Gravamen
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 text-xs text-amber-200/90 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Blindaje Legal & Peritaje Pre-Compra
                </div>
                Todas nuestras aeronaves en brokerage son inspeccionadas físicamente en hangar y verificadas ante los registros públicos antes de estructurar el contrato de compraventa.
              </div>
            </div>
          </div>

          {/* Description */}
          {aircraft.description_notes && (
            <div className="bg-[#070d18] p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Resumen Operativo & Estado General
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {aircraft.description_notes}
              </p>
            </div>
          )}

          {/* Detailed Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Times & Engines */}
            <div className="bg-[#070d18] p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Tiempos, Motores & Célula</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400">Total Time Airframe (TTAF):</span>
                  <span className="font-bold text-white">
                    {specs ? formatHours(specs.airframe_tt_hours) : 'N/D'}
                  </span>
                </div>

                {specs?.engine_details?.map((eng, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>Planta Motriz ({eng.position})</span>
                      <span className="text-amber-400">{eng.model}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Horas SMOH:</span>
                      <span className="text-white font-mono">{eng.smoh_hours} hrs</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>TBO Recomendado Fabricante:</span>
                      <span className="text-white font-mono">{eng.tbo} hrs</span>
                    </div>
                  </div>
                ))}

                {specs?.propeller_details && specs.propeller_details.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-slate-400 text-[11px] font-semibold block">Hélices (SPOH):</span>
                    {specs.propeller_details.map((prop, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-300">
                        <span>Posición {prop.position}:</span>
                        <span className="font-mono text-white">{prop.spoh_hours} hrs SPOH</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Avionics & Cabin */}
            <div className="bg-[#070d18] p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Suite de Aviónica & Configuración</span>
              </h4>

              <div>
                <span className="text-slate-400 text-xs block mb-2 font-medium">Equipamiento Instalado:</span>
                <ul className="space-y-1.5">
                  {specs?.avionics_features?.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {specs?.cabin_configuration && (
                <div className="pt-3 border-t border-slate-850">
                  <span className="text-slate-400 text-xs block mb-1 font-medium">Configuración de Cabina:</span>
                  <p className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    {specs.cabin_configuration}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-850 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Bitácoras completas desde origen: <strong className="text-white">{specs?.logbooks_complete ? 'SÍ' : 'PARCIAL'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Historial de daños mayores (NDH): <strong className="text-white">{specs?.damage_history ? 'Registra daños' : 'No Damage History (NDH)'}</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions Bar */}
        <div className="px-6 py-4 bg-[#080d1a] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            ¿Requiere verificar físicamente esta aeronave antes de ofertar?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/inspeccion?reg=${aircraft.registration_mark}`}
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección PPI in situ</span>
            </Link>

            <a
              href={whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
