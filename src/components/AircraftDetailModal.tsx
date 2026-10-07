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
  MessageSquare, 
  Printer
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
    `Hola equipo de AeroLex Global, requiero el dossier jurídico y técnico completo de la aeronave ${aircraft.make} ${aircraft.model} (${aircraft.registration_mark}).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-black text-xs tracking-wider shadow-xs">
              {aircraft.registration_mark}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                {aircraft.manufacture_year} {aircraft.make} {aircraft.model}
              </h2>
              <p className="text-xs text-slate-500">
                Ficha Técnica Aeronáutica Oficial • Estatus {aircraft.authority}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 text-xs hidden sm:flex items-center gap-1.5 transition"
              title="Imprimir Ficha"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200 relative">
              <img
                src={aircraft.featured_image_url}
                alt={`${aircraft.make} ${aircraft.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-300" />
                <span>Base OACI: {aircraft.home_base_icao} (Venezuela)</span>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Precio de Venta Solicitado:</div>
                <div className="text-3xl font-black text-blue-900 tracking-tight">
                  {formatCurrency(aircraft.price_usd)}
                </div>
                <div className="text-[12px] text-slate-600 space-y-1.5 pt-3 border-t border-blue-200/60">
                  <div className="flex justify-between">
                    <span>Número de Serie (MSN):</span>
                    <span className="font-mono font-bold text-slate-900">{aircraft.serial_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Año de Fabricación:</span>
                    <span className="font-bold text-slate-900">{aircraft.manufacture_year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autoridad de Registro:</span>
                    <span className="text-blue-700 font-extrabold">{aircraft.authority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estatus Legal de Título:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Libre de Gravamen
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Blindaje Legal & Peritaje Pre-Compra
                </div>
                Todas nuestras aeronaves en brokerage son inspeccionadas físicamente en hangar y verificadas ante los registros públicos antes de estructurar el contrato de compraventa.
              </div>
            </div>
          </div>

          {/* Description */}
          {aircraft.description_notes && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Resumen Operativo & Estado General
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {aircraft.description_notes}
              </p>
            </div>
          )}

          {/* Detailed Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Times & Engines */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Tiempos, Motores & Célula</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Total Time Airframe (TTAF):</span>
                  <span className="font-bold text-slate-900">
                    {specs ? formatHours(specs.airframe_tt_hours) : 'N/D'}
                  </span>
                </div>

                {specs?.engine_details?.map((eng, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Planta Motriz ({eng.position})</span>
                      <span className="text-blue-700">{eng.model}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Horas SMOH:</span>
                      <span className="text-slate-900 font-mono font-semibold">{eng.smoh_hours} hrs</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>TBO Recomendado:</span>
                      <span className="text-slate-800 font-mono">{eng.tbo} hrs</span>
                    </div>
                  </div>
                ))}

                {specs?.propeller_details && specs.propeller_details.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block">Hélices (SPOH):</span>
                    {specs.propeller_details.map((prop, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-700">
                        <span>Posición {prop.position}:</span>
                        <span className="font-mono font-bold text-slate-900">{prop.spoh_hours} hrs SPOH</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Avionics & Cabin */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Suite de Aviónica & Configuración</span>
              </h4>

              <div>
                <span className="text-slate-500 text-xs block mb-2 font-medium">Equipamiento Instalado:</span>
                <ul className="space-y-1.5">
                  {specs?.avionics_features?.map((feature, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {specs?.cabin_configuration && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-slate-500 text-xs block mb-1 font-medium">Configuración de Cabina:</span>
                  <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {specs.cabin_configuration}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Bitácoras continuas desde fábrica: <strong className="text-slate-900">{specs?.logbooks_complete ? 'SÍ' : 'PARCIAL'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Historial de daños mayores (NDH): <strong className="text-slate-900">{specs?.damage_history ? 'Registra daños' : 'No Damage History (NDH)'}</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            ¿Requiere peritaje in situ antes de formalizar la oferta?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/inspeccion?reg=${aircraft.registration_mark}`}
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección PPI in situ</span>
            </Link>

            <a
              href={whatsappInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
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
