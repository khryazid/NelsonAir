'use client';

import React from 'react';
import { Calculator, ShieldCheck, Plane, Sparkles } from 'lucide-react';
import { CostCalculator } from '@/components/CostCalculator';

export default function CalculadoraPage() {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Presupuesto Aeronáutico de Precisión</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Calculadora de Costos Operativos y Gestión de Aeronaves
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Tome decisiones financieras fundamentadas. Proyecte el costo real por hora de vuelo y el mantenimiento mensual según el régimen operacional de su avión en Venezuela y rutas internacionales.
          </p>
        </div>

        {/* The Calculator */}
        <CostCalculator />

        {/* Informative Guidance Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 text-xs shadow-xs">
            <h4 className="font-bold text-blue-700 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Reserva de Overhaul (TBO)</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              El tiempo entre revisiones mayores de motor (TBO) debe previsionarse con una reserva por cada hora de vuelo. En turbinas PT6A esto evita sorpresas presupuestarias de cientos de miles de dólares al alcanzar las 3.600 horas.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 text-xs shadow-xs">
            <h4 className="font-bold text-sky-700 flex items-center gap-1.5 text-sm">
              <Plane className="w-4 h-4" />
              <span>Hangaraje & Tasas Aeroportuarias</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Los costos varían significativamente según la base: SVCS (Charallave) ofrece hangares privados con servicio integral, mientras que SVMI (Maiquetía) maneja tarifas internacionales y SVFM (La Carlota) cuenta con restricciones operativas militares.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 text-xs shadow-xs">
            <h4 className="font-bold text-emerald-700 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Gestión Turn-Key Integral</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Nuestro servicio de administración asume la supervisión jurídica y técnica: vencimientos INAC, pólizas de seguro de casco y RC, monitoreo de boletines de servicio (SBs) y directivas (ADs), liberando al propietario de toda carga burocrática.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
