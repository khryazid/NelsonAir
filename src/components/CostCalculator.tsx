'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Fuel, 
  Warehouse, 
  UserCheck, 
  ShieldAlert, 
  Wrench, 
  ChevronRight, 
  Download, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { formatCurrency, buildWhatsAppLink } from '@/lib/utils';

type AircraftCategory = 'single_piston' | 'twin_piston' | 'turboprop' | 'light_jet' | 'midsize_jet';
type CrewType = 'owner_pilot' | 'single_captain' | 'dual_crew';

interface CategoryPreset {
  name: string;
  example: string;
  defaultFuelPerHourGal: number;
  fuelCostPerGalUsd: number; // Avgas vs Jet A-1
  tboReservePerHourUsd: number;
  baseHangarUsd: number;
  baseInsuranceAnnualUsd: number;
  adminFeeMonthlyUsd: number;
}

const CATEGORY_PRESETS: Record<AircraftCategory, CategoryPreset> = {
  single_piston: {
    name: 'Monomotor Pistón',
    example: 'Cessna 206H / Cirrus SR22',
    defaultFuelPerHourGal: 15,
    fuelCostPerGalUsd: 7.5, // 100LL Avgas
    tboReservePerHourUsd: 35,
    baseHangarUsd: 600,
    baseInsuranceAnnualUsd: 4800,
    adminFeeMonthlyUsd: 450
  },
  twin_piston: {
    name: 'Bimotor Pistón',
    example: 'Beechcraft Baron 58 / Seneca V',
    defaultFuelPerHourGal: 32,
    fuelCostPerGalUsd: 7.5,
    tboReservePerHourUsd: 75,
    baseHangarUsd: 950,
    baseInsuranceAnnualUsd: 7200,
    adminFeeMonthlyUsd: 650
  },
  turboprop: {
    name: 'Turbohélice Ejecutivo',
    example: 'Beechcraft King Air B200 / Caravan',
    defaultFuelPerHourGal: 90,
    fuelCostPerGalUsd: 4.8, // Jet A-1
    tboReservePerHourUsd: 180,
    baseHangarUsd: 1800,
    baseInsuranceAnnualUsd: 14000,
    adminFeeMonthlyUsd: 1200
  },
  light_jet: {
    name: 'Light Jet',
    example: 'Cessna Citation CJ3 / Phenom 100',
    defaultFuelPerHourGal: 140,
    fuelCostPerGalUsd: 4.8,
    tboReservePerHourUsd: 320,
    baseHangarUsd: 2600,
    baseInsuranceAnnualUsd: 22000,
    adminFeeMonthlyUsd: 1800
  },
  midsize_jet: {
    name: 'Midsize Jet',
    example: 'Hawker 800XP / Learjet 60',
    defaultFuelPerHourGal: 220,
    fuelCostPerGalUsd: 4.8,
    tboReservePerHourUsd: 480,
    baseHangarUsd: 3400,
    baseInsuranceAnnualUsd: 35000,
    adminFeeMonthlyUsd: 2500
  }
};

export function CostCalculator() {
  const [category, setCategory] = useState<AircraftCategory>('turboprop');
  const [monthlyHours, setMonthlyHours] = useState<number>(20);
  const [crewType, setCrewType] = useState<CrewType>('single_captain');
  const [baseAirport, setBaseAirport] = useState<string>('SVCS');

  const preset = CATEGORY_PRESETS[category];

  const airportMultiplier: Record<string, number> = {
    SVCS: 1.0,  // Charallave
    SVMI: 1.25, // Maiquetía
    SVFM: 1.15, // La Carlota
    SVVA: 0.90, // Valencia
    SVBM: 0.85  // Barquisimeto
  };

  const crewCostMonthly: Record<CrewType, number> = {
    owner_pilot: 0,
    single_captain: 2500,
    dual_crew: 4800
  };

  // Calculations
  const calculations = useMemo(() => {
    const monthlyFuelCost = monthlyHours * preset.defaultFuelPerHourGal * preset.fuelCostPerGalUsd;
    const monthlyOverhaulReserve = monthlyHours * preset.tboReservePerHourUsd;
    const hangarCost = preset.baseHangarUsd * (airportMultiplier[baseAirport] || 1.0);
    const monthlyInsurance = preset.baseInsuranceAnnualUsd / 12;
    const crewCost = crewCostMonthly[crewType];
    const managementFee = preset.adminFeeMonthlyUsd;

    const totalMonthly = monthlyFuelCost + monthlyOverhaulReserve + hangarCost + monthlyInsurance + crewCost + managementFee;
    const totalAnnual = totalMonthly * 12;
    const costPerHour = monthlyHours > 0 ? totalMonthly / monthlyHours : 0;

    return {
      monthlyFuelCost,
      monthlyOverhaulReserve,
      hangarCost,
      monthlyInsurance,
      crewCost,
      managementFee,
      totalMonthly,
      totalAnnual,
      costPerHour
    };
  }, [category, monthlyHours, crewType, baseAirport, preset]);

  const whatsappMessage = `Hola Cap. Abg. Nelson, utilicé la calculadora para un ${preset.name} (${preset.example}) con ${monthlyHours} horas/mes basado en ${baseAirport}. Mi costo mensual estimado es ${formatCurrency(calculations.totalMonthly)}. Me gustaría una propuesta formal de administración.`;
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Herramienta Interactiva</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Calculadora de Costos Operativos y Administración Aeronáutica
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Estime su presupuesto mensual real: combustible, hangaraje, reservas de motor TBO, tripulación y gestión técnica legal.
          </p>
        </div>

        <div className="text-right shrink-0 bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Estimado Mes</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {formatCurrency(calculations.totalMonthly)}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            {formatCurrency(calculations.costPerHour)} / hora de vuelo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              1. Seleccione la Categoría de Aeronave
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(CATEGORY_PRESETS) as AircraftCategory[]).map((catKey) => {
                const item = CATEGORY_PRESETS[catKey];
                const isSelected = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCategory(catKey)}
                    className={`p-3 rounded-xl text-left border transition text-xs ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-[#060b14] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.example}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Monthly Flight Hours Slider */}
          <div className="bg-[#070d18] p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                2. Horas Estimadas de Vuelo al Mes
              </label>
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 font-bold text-sm border border-amber-500/40">
                {monthlyHours} horas / mes
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={monthlyHours}
              onChange={(e) => setMonthlyHours(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5 hrs (Uso ligero)</span>
              <span>20 hrs (Corporativo promedio)</span>
              <span>60 hrs (Chárter activo)</span>
            </div>
          </div>

          {/* Hangar Base Airport */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                3. Base Operativa / Hangaraje
              </label>
              <select
                value={baseAirport}
                onChange={(e) => setBaseAirport(e.target.value)}
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="SVCS">SVCS - Charallave (Aeropuerto Caracas)</option>
                <option value="SVMI">SVMI - Maiquetía (Rampa General)</option>
                <option value="SVFM">SVFM - La Carlota (Caracas)</option>
                <option value="SVVA">SVVA - Valencia (Arturo Michelena)</option>
                <option value="SVBM">SVBM - Barquisimeto</option>
              </select>
            </div>

            {/* Crew Setup */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                4. Esquema de Tripulación
              </label>
              <select
                value={crewType}
                onChange={(e) => setCrewType(e.target.value as CrewType)}
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="owner_pilot">Dueño Vuela (Piloto Propietario)</option>
                <option value="single_captain">Capitán Asignado Dedicado</option>
                <option value="dual_crew">Tripulación Completa (Capitán + Copiloto IFR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Breakdown & Summary Column */}
        <div className="lg:col-span-5 bg-[#060b14] p-5 sm:p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Desglose Cuantitativo Mensual</span>
              <span className="text-amber-400 font-mono text-[11px]">USD / Mes</span>
            </h4>

            <div className="space-y-3.5 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Fuel className="w-4 h-4 text-sky-400" />
                  <span>Combustible ({preset.defaultFuelPerHourGal * monthlyHours} gal)</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(calculations.monthlyFuelCost)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Reserva Overhaul / TBO Motores</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(calculations.monthlyOverhaulReserve)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Warehouse className="w-4 h-4 text-emerald-400" />
                  <span>Hangaraje & Tasas Aeroportuarias</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(calculations.hangarCost)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                  <span>Seguro Casco y Responsabilidad Civil</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(calculations.monthlyInsurance)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>Tripulación Profesional</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(calculations.crewCost)}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Administración Técnica & Legal (Turn-Key)</span>
                </div>
                <span className="font-semibold text-amber-400">{formatCurrency(calculations.managementFee)}</span>
              </div>
            </div>

            {/* Annual Estimate */}
            <div className="mt-6 p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Proyección Presupuestaria Anual:</span>
              <span className="font-bold text-base text-amber-300">{formatCurrency(calculations.totalAnnual)}</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Propuesta de Gestión por WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
