'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Plane, 
  Search, 
  Compass, 
  X
} from 'lucide-react';
import { AircraftCard } from '@/components/AircraftCard';
import { AircraftDetailModal } from '@/components/AircraftDetailModal';
import { INITIAL_AIRCRAFT } from '@/lib/data-store';
import { Aircraft } from '@/lib/types';

export default function BrokeragePage() {
  const [aircraftList] = useState<Aircraft[]>(INITIAL_AIRCRAFT);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBase, setSelectedBase] = useState<string>('ALL');

  const filteredAircraft = useMemo(() => {
    return aircraftList.filter((ac) => {
      const matchesSearch =
        ac.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ac.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ac.registration_mark.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAuth =
        selectedAuthority === 'ALL' || ac.authority === selectedAuthority;

      const matchesBase =
        selectedBase === 'ALL' || ac.home_base_icao === selectedBase;

      let matchesCat = true;
      if (selectedCategory === 'turboprop') {
        matchesCat = ac.model.toLowerCase().includes('king air') || ac.model.toLowerCase().includes('cheyenne') || ac.model.toLowerCase().includes('caravan');
      } else if (selectedCategory === 'jet') {
        matchesCat = ac.model.toLowerCase().includes('citation') || ac.model.toLowerCase().includes('jet');
      } else if (selectedCategory === 'piston') {
        matchesCat = ac.model.toLowerCase().includes('206') || ac.model.toLowerCase().includes('baron') || ac.model.toLowerCase().includes('cirrus');
      }

      return matchesSearch && matchesAuth && matchesBase && matchesCat;
    });
  }, [aircraftList, searchTerm, selectedAuthority, selectedCategory, selectedBase]);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Detail Modal */}
      <AircraftDetailModal
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Plane className="w-3.5 h-3.5" />
              <span>Inventario Exclusivo & Auditado</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Catálogo de Brokerage Aeronáutico
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Aeronaves disponibles para compraventa inmediata con peritaje legal in situ, horas TTAF certificadas y títulos libres de gravámenes.
            </p>
          </div>

          <Link
            href="/off-market"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold transition shadow-xs self-start md:self-auto"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>¿Busca una aeronave específica? Mandato Off-Market</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por modelo o matrícula..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="ALL">Todas las Categorías</option>
                <option value="turboprop">Turbohélices (King Air, Cheyenne)</option>
                <option value="jet">Jets Ejecutivos (Citation, Phenom)</option>
                <option value="piston">Pistón Monomotor / Bimotor (C206, Baron)</option>
              </select>
            </div>

            {/* Authority Filter */}
            <div>
              <select
                value={selectedAuthority}
                onChange={(e) => setSelectedAuthority(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="ALL">Todas las Jurisdicciones</option>
                <option value="INAC">INAC (Matrículas YV Venezolanas)</option>
                <option value="FAA">FAA (Matrículas N-Number USA)</option>
              </select>
            </div>

            {/* Base Airport */}
            <div>
              <select
                value={selectedBase}
                onChange={(e) => setSelectedBase(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="ALL">Todas las Bases Operativas</option>
                <option value="SVCS">SVCS (Charallave / Caracas)</option>
                <option value="SVMI">SVMI (Maiquetía)</option>
                <option value="SVFM">SVFM (La Carlota)</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Mostrando <strong>{filteredAircraft.length}</strong> aeronave(s) disponible(s)</span>
            {(searchTerm || selectedAuthority !== 'ALL' || selectedCategory !== 'ALL' || selectedBase !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAuthority('ALL');
                  setSelectedCategory('ALL');
                  setSelectedBase('ALL');
                }}
                className="text-blue-700 hover:text-blue-800 font-bold"
              >
                Restablecer Filtros
              </button>
            )}
          </div>
        </div>

        {/* Aircraft Grid */}
        {filteredAircraft.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAircraft.map((ac) => (
              <AircraftCard
                key={ac.id}
                aircraft={ac}
                onOpenDetails={(item) => setSelectedAircraft(item)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
            <Plane className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron aeronaves con estos filtros</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Si la aeronave que busca no figura en el catálogo público, puede registrar un mandato confidencial de búsqueda off-market.
            </p>
            <Link
              href="/off-market"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
            >
              <Compass className="w-4 h-4" />
              <span>Registrar Mandato de Búsqueda</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
