'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Plane, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  MessageSquare,
  Wrench,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Aircraft } from '@/lib/types';
import { formatCurrency, formatHours, buildWhatsAppLink } from '@/lib/utils';

interface AircraftCardProps {
  aircraft: Aircraft;
  onOpenDetails: (aircraft: Aircraft) => void;
}

export function AircraftCard({ aircraft, onOpenDetails }: AircraftCardProps) {
  const specs = aircraft.technical_specs;

  const whatsappInquiry = buildWhatsAppLink(
    `Hola Cap. Abg. Nelson, solicito información técnica y jurídica detallada sobre la aeronave ${aircraft.make} ${aircraft.model} matrícula ${aircraft.registration_mark}.`
  );

  const statusBadge = () => {
    switch (aircraft.status) {
      case 'published':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            Disponible
          </span>
        );
      case 'under_contract':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40">
            Bajo Contrato / En Peritaje
          </span>
        );
      case 'sold':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-700">
            Vendida
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-950 text-sky-300 border border-sky-800">
            Borrador
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0b1426] border border-slate-800/90 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col group">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={aircraft.featured_image_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'}
          alt={`${aircraft.make} ${aircraft.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-slate-950/80 text-white border border-slate-700 backdrop-blur-sm">
              {aircraft.authority}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-amber-500 text-slate-950 shadow-sm">
              {aircraft.registration_mark}
            </span>
          </div>
          <div>{statusBadge()}</div>
        </div>

        {/* Airport base pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>Base {aircraft.home_base_icao}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Year */}
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition tracking-tight">
              {aircraft.manufacture_year} {aircraft.make} {aircraft.model}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            Serial N° (MSN): {aircraft.serial_number}
          </p>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-[#060b14] border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Horas Célula (TTAF)</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {specs ? formatHours(specs.airframe_tt_hours) : 'N/D'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Motor SMOH</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                {specs?.engine_details?.[0] ? `${specs.engine_details[0].smoh_hours} hrs` : 'N/D'}
              </span>
            </div>

            <div className="col-span-2 pt-1 border-t border-slate-850 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                {specs?.logbooks_complete ? 'Bitácoras continuas al día' : 'Bitácoras parciales'}
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Título Limpio
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Precio de Venta:</span>
            <span className="text-xl font-extrabold text-amber-400 tracking-tight">
              {formatCurrency(aircraft.price_usd)}
            </span>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenDetails(aircraft)}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <span>Ficha Técnica</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            <Link
              href={`/inspeccion?reg=${aircraft.registration_mark}`}
              className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Solicitar PPI</span>
            </Link>
          </div>

          <a
            href={whatsappInquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
