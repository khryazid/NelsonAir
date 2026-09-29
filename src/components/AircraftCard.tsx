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
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            Disponible
          </span>
        );
      case 'under_contract':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            En Peritaje / Contrato
          </span>
        );
      case 'sold':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
            Vendida
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            Borrador
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 shadow-xs flex flex-col group">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={aircraft.featured_image_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'}
          alt={`${aircraft.make} ${aircraft.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-slate-900/85 text-white backdrop-blur-xs">
              {aircraft.authority}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wider bg-blue-600 text-white shadow-xs">
              {aircraft.registration_mark}
            </span>
          </div>
          <div>{statusBadge()}</div>
        </div>

        {/* Airport base pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
          <MapPin className="w-3.5 h-3.5 text-sky-300" />
          <span>Base {aircraft.home_base_icao}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Year */}
          <div className="flex items-baseline justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
              {aircraft.manufacture_year} {aircraft.make} {aircraft.model}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            Serial N° (MSN): {aircraft.serial_number}
          </p>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Horas Célula (TTAF)</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {specs ? formatHours(specs.airframe_tt_hours) : 'N/D'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Motor SMOH</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                {specs?.engine_details?.[0] ? `${specs.engine_details[0].smoh_hours} hrs` : 'N/D'}
              </span>
            </div>

            <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                {specs?.logbooks_complete ? 'Bitácoras continuas al día' : 'Bitácoras parciales'}
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Título Limpio
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xs text-slate-500 font-medium">Precio de Venta:</span>
            <span className="text-xl font-black text-blue-900 tracking-tight">
              {formatCurrency(aircraft.price_usd)}
            </span>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenDetails(aircraft)}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <span>Ficha Técnica</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            <Link
              href={`/inspeccion?reg=${aircraft.registration_mark}`}
              className="w-full py-2 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Solicitar PPI</span>
            </Link>
          </div>

          <a
            href={whatsappInquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
