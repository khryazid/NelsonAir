'use client';

import React from 'react';
import { Compass, Lock, ShieldCheck, CheckCircle2, Plane, Sparkles } from 'lucide-react';
import { OffMarketAlerts } from '@/components/OffMarketAlerts';

export default function OffMarketPage() {
  return (
    <div className="bg-[#070b16] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Mercado Cerrado & Búsqueda Confidencial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Adquisiciones & Oportunidades Off-Market
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Las mejores oportunidades aeronáuticas rara vez se publican en portales públicos. Acceda a inventarios cerrados en hangares privados de Venezuela, el Caribe y EE.UU., o encomiende un mandato de búsqueda exclusivo.
          </p>
        </div>

        {/* The Off-Market Alerts Form */}
        <OffMarketAlerts />

        {/* Why Off-Market Matters for High-Ticket Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#0b1426] border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Discreción y Confidencialidad Absoluta</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Muchos propietarios corporativos y familias prefieren transar sus aeronaves sin exponer matrículas ni datos en internet para preservar su privacidad y seguridad patrimonial.
            </p>
          </div>

          <div className="bg-[#0b1426] border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Filtrado Técnico Riguroso</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sólo le presentamos aeronaves que cumplen con sus parámetros de pista (STOL vs pavimento IFR), tiempos de motor remanentes y estatus registral limpio. No le hacemos perder tiempo.
            </p>
          </div>

          <div className="bg-[#0b1426] border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Mandato de Representación Exclusiva</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              El abogado-piloto negocia directamente con el vendedor o broker internacional, defendiendo sus intereses legales y técnicos, verificando el título de propiedad antes del traspaso.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
