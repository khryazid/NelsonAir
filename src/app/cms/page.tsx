'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Plane, 
  Sparkles, 
  FileText, 
  Users, 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Scale,
  Download,
  Eye,
  Check
} from 'lucide-react';
import { AiSpecImporter } from '@/components/AiSpecImporter';
import { PpiReportGenerator } from '@/components/PpiReportGenerator';
import { 
  INITIAL_AIRCRAFT, 
  INITIAL_BUYER_LEADS, 
  INITIAL_COMPLIANCE_ALERTS, 
  INITIAL_INSPECTIONS 
} from '@/lib/data-store';
import { Aircraft, AircraftStatus, AviationAuthority, BuyerLead } from '@/lib/types';
import { formatCurrency, formatHours, formatDate, buildWhatsAppLink } from '@/lib/utils';

export default function CmsPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'ai_importer' | 'ppi_generator' | 'leads' | 'inspections'>('listings');
  
  // Local state for aircraft management
  const [aircraftList, setAircraftList] = useState<Aircraft[]>(INITIAL_AIRCRAFT);
  const [leadsList, setLeadsList] = useState<BuyerLead[]>(INITIAL_BUYER_LEADS);
  const [inspectionsList, setInspectionsList] = useState(INITIAL_INSPECTIONS);

  // Form state for manual listing creation / editing
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState<Partial<Aircraft>>({
    registration_mark: '',
    serial_number: '',
    authority: 'INAC',
    make: '',
    model: '',
    manufacture_year: new Date().getFullYear(),
    home_base_icao: 'SVCS',
    status: 'draft',
    price_usd: 0,
    is_for_sale: true,
    is_under_management: false,
    featured_image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    description_notes: '',
    technical_specs: {
      airframe_tt_hours: 0,
      engine_details: [{ position: 'L', model: '', smoh_hours: 0, tbo: 3600 }],
      propeller_details: [{ position: 'L', spoh_hours: 0, tbo_hours: 3000 }],
      avionics_features: ['Garmin Suite'],
      logbooks_complete: true,
      damage_history: false,
      legal_clearance_title: true
    }
  });

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAircraft.registration_mark || !editingAircraft.make || !editingAircraft.model) {
      alert('Por favor complete matrícula, fabricante y modelo');
      return;
    }

    const newId = editingAircraft.id || 'ac-' + Date.now();
    const completeAircraft: Aircraft = {
      id: newId,
      registration_mark: editingAircraft.registration_mark.toUpperCase(),
      serial_number: editingAircraft.serial_number || 'S/N-PENDIENTE',
      authority: editingAircraft.authority || 'INAC',
      make: editingAircraft.make,
      model: editingAircraft.model,
      manufacture_year: Number(editingAircraft.manufacture_year) || 2010,
      home_base_icao: editingAircraft.home_base_icao || 'SVCS',
      status: (editingAircraft.status as AircraftStatus) || 'draft',
      price_usd: Number(editingAircraft.price_usd) || 0,
      is_for_sale: editingAircraft.is_for_sale !== false,
      is_under_management: !!editingAircraft.is_under_management,
      featured_image_url: editingAircraft.featured_image_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
      description_notes: editingAircraft.description_notes || '',
      technical_specs: editingAircraft.technical_specs || {
        airframe_tt_hours: 0,
        engine_details: [],
        avionics_features: [],
        logbooks_complete: true,
        damage_history: false,
        legal_clearance_title: true
      },
      created_at: new Date().toISOString()
    };

    setAircraftList((prev) => {
      const exists = prev.some((a) => a.id === completeAircraft.id);
      if (exists) {
        return prev.map((a) => (a.id === completeAircraft.id ? completeAircraft : a));
      }
      return [completeAircraft, ...prev];
    });

    setIsFormOpen(false);
    alert('¡Aeronave guardada exitosamente en el catálogo!');
  };

  const handleStatusChange = (id: string, newStatus: AircraftStatus) => {
    setAircraftList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleDeleteAircraft = (id: string) => {
    if (confirm('¿Está seguro de eliminar esta aeronave del inventario?')) {
      setAircraftList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleDraftFromAi = (draft: Partial<Aircraft>) => {
    setEditingAircraft(draft);
    setIsFormOpen(true);
    setActiveTab('listings');
  };

  return (
    <div className="bg-[#070b16] text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Panel de Control Administrativo (CMS Abogado)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Gestión Integral del Despacho Aeronáutico
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Control de inventario, ingesta de fichas con IA, generación de reportes PPI y prospectos off-market.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingAircraft({
                  registration_mark: '',
                  serial_number: '',
                  authority: 'INAC',
                  make: '',
                  model: '',
                  manufacture_year: new Date().getFullYear(),
                  home_base_icao: 'SVCS',
                  status: 'draft',
                  price_usd: 0,
                  is_for_sale: true,
                  is_under_management: false,
                  featured_image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
                  description_notes: '',
                  technical_specs: {
                    airframe_tt_hours: 0,
                    engine_details: [{ position: 'L', model: '', smoh_hours: 0, tbo: 3600 }],
                    avionics_features: ['Garmin Suite'],
                    logbooks_complete: true,
                    damage_history: false,
                    legal_clearance_title: true
                  }
                });
                setIsFormOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Aeronave (Carga Manual)</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Aeronaves en Brokerage</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{aircraftList.length}</div>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">
              {aircraftList.filter((a) => a.status === 'published').length} publicadas activas
            </span>
          </div>

          <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Mandatos Off-Market</span>
            <div className="text-2xl font-black text-sky-400 mt-1">{leadsList.length}</div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Leads de alto patrimonio</span>
          </div>

          <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Inspecciones PPI Solicitadas</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{inspectionsList.length}</div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Peritajes en hangar</span>
          </div>

          <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Alertas Regulatorias</span>
            <div className="text-2xl font-black text-purple-400 mt-1">{INITIAL_COMPLIANCE_ALERTS.length}</div>
            <span className="text-[10px] text-amber-400 mt-0.5 block">Vencimientos INAC / Pólizas</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'listings'
                ? 'border-amber-400 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Gestión de Inventario ({aircraftList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_importer')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai_importer'
                ? 'border-amber-400 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ingestor de Fichas (AI Parser)</span>
          </button>

          <button
            onClick={() => setActiveTab('ppi_generator')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ppi_generator'
                ? 'border-amber-400 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-sky-400" />
            <span>Emisor de Reportes PPI (Membrete)</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-amber-400 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mandatos Off-Market ({leadsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspections')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'inspections'
                ? 'border-amber-400 text-amber-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Solicitudes de Inspección ({inspectionsList.length})</span>
          </button>
        </div>

        {/* TAB 1: Aircraft Listings CRUD */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            
            {/* Modal / Inline Form for Manual Carga */}
            {isFormOpen && (
              <form
                onSubmit={handleSaveListing}
                className="bg-[#0b1426] border border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-5 animate-in slide-in-from-top-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>Formulario de Carga Especializada en TypeScript (Zod Ready)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Identification */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Matrícula (YV o N) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.registration_mark || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, registration_mark: e.target.value.toUpperCase() })}
                      placeholder="YV-3450 o N-892CA"
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs font-bold text-amber-400 uppercase focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Serial Number (MSN) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.serial_number || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, serial_number: e.target.value })}
                      placeholder="BB-1688"
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Fabricante (Make) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.make || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, make: e.target.value })}
                      placeholder="Beechcraft"
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Modelo (Model) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.model || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, model: e.target.value })}
                      placeholder="King Air B200"
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Year, Base, Price, Authority */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Año de Fabricación</label>
                    <input
                      type="number"
                      value={editingAircraft.manufacture_year || 2010}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, manufacture_year: Number(e.target.value) })}
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Base OACI</label>
                    <select
                      value={editingAircraft.home_base_icao || 'SVCS'}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, home_base_icao: e.target.value })}
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="SVCS">SVCS (Charallave)</option>
                      <option value="SVMI">SVMI (Maiquetía)</option>
                      <option value="SVFM">SVFM (La Carlota)</option>
                      <option value="SVVA">SVVA (Valencia)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Precio de Venta (USD)</label>
                    <input
                      type="number"
                      value={editingAircraft.price_usd || 0}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, price_usd: Number(e.target.value) })}
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs font-bold text-emerald-400 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Estatus del Listado</label>
                    <select
                      value={editingAircraft.status || 'draft'}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, status: e.target.value as AircraftStatus })}
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="draft">Borrador (Draft)</option>
                      <option value="published">Publicado (Activo en Catálogo)</option>
                      <option value="under_contract">Bajo Contrato / En Peritaje</option>
                      <option value="sold">Vendido</option>
                    </select>
                  </div>
                </div>

                {/* Technical specs: TTAF, Engines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Horas Totales Célula (TTAF)</label>
                    <input
                      type="number"
                      value={editingAircraft.technical_specs?.airframe_tt_hours || 0}
                      onChange={(e) =>
                        setEditingAircraft({
                          ...editingAircraft,
                          technical_specs: {
                            ...(editingAircraft.technical_specs || {
                              airframe_tt_hours: 0,
                              engine_details: [],
                              avionics_features: [],
                              logbooks_complete: true,
                              damage_history: false,
                              legal_clearance_title: true
                            }),
                            airframe_tt_hours: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">URL Foto Principal</label>
                    <input
                      type="url"
                      value={editingAircraft.featured_image_url || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, featured_image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Notas Técnicas & Dictamen Legal Preliminar</label>
                  <textarea
                    rows={3}
                    value={editingAircraft.description_notes || ''}
                    onChange={(e) => setEditingAircraft({ ...editingAircraft, description_notes: e.target.value })}
                    className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Guardar Aeronave en Catálogo
                  </button>
                </div>
              </form>
            )}

            {/* Aircraft Table */}
            <div className="bg-[#0b1426] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Listado Maestro de Aeronaves (Brokerage & Flota)
                </h3>
                <span className="text-xs text-slate-400">{aircraftList.length} registradas</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#080d1a] text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Matrícula / Aeronave</th>
                      <th className="p-3.5">Base OACI</th>
                      <th className="p-3.5">Horas TTAF</th>
                      <th className="p-3.5">Precio (USD)</th>
                      <th className="p-3.5">Estatus</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {aircraftList.map((ac) => (
                      <tr key={ac.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded font-black text-amber-400 bg-slate-950 border border-slate-800">
                              {ac.registration_mark}
                            </span>
                            <div>
                              <div className="font-bold text-white">{ac.manufacture_year} {ac.make} {ac.model}</div>
                              <div className="text-[10px] text-slate-400 font-mono">MSN: {ac.serial_number}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800">
                            {ac.home_base_icao}
                          </span>
                        </td>

                        <td className="p-3.5 font-mono text-slate-300">
                          {formatHours(ac.technical_specs?.airframe_tt_hours)}
                        </td>

                        <td className="p-3.5 font-bold text-emerald-400">
                          {formatCurrency(ac.price_usd)}
                        </td>

                        <td className="p-3.5">
                          <select
                            value={ac.status}
                            onChange={(e) => handleStatusChange(ac.id, e.target.value as AircraftStatus)}
                            className="bg-[#060b14] border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-200 focus:border-amber-500 focus:outline-none"
                          >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                            <option value="under_contract">Bajo Contrato</option>
                            <option value="sold">Vendido</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingAircraft(ac);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAircraft(ac.id)}
                            className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI Spec Importer */}
        {activeTab === 'ai_importer' && (
          <AiSpecImporter onDraftImported={handleDraftFromAi} />
        )}

        {/* TAB 3: PPI Report Generator */}
        {activeTab === 'ppi_generator' && (
          <PpiReportGenerator />
        )}

        {/* TAB 4: Off-Market Leads */}
        {activeTab === 'leads' && (
          <div className="bg-[#0b1426] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Mandatos de Búsqueda Off-Market (Email Marketing & Calificación)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Prospectos calificados de alto patrimonio captados vía web según la matriz de segmentación del plan.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d1a] text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Cliente / Razón Social</th>
                    <th className="p-3.5">Categorías Preferidas</th>
                    <th className="p-3.5">Presupuesto</th>
                    <th className="p-3.5">Operación</th>
                    <th className="p-3.5">Horizonte</th>
                    <th className="p-3.5 text-right">Contacto Rápido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {leadsList.map((lead) => {
                    const leadWhatsApp = buildWhatsAppLink(
                      `Estimado ${lead.full_name || 'cliente'}, le escribe el Cap. Abg. Nelson R. respecto a su mandato de búsqueda de aeronave en nuestra plataforma.`
                    );

                    return (
                      <tr key={lead.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3.5">
                          <div className="font-bold text-white">{lead.full_name || 'Sin nombre'}</div>
                          <div className="text-[11px] text-slate-400">{lead.email}</div>
                          {lead.phone_whatsapp && (
                            <div className="text-[10px] text-emerald-400 font-mono">{lead.phone_whatsapp}</div>
                          )}
                        </td>

                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {lead.preferred_categories.map((c, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-amber-300 uppercase">
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5 font-bold text-slate-200">
                          {lead.budget_range.replace('_', ' - ')}
                        </td>

                        <td className="p-3.5 text-slate-300 capitalize text-[11px]">
                          {lead.operation_profile?.replace('_', ' ') || 'IFR'}
                        </td>

                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            lead.timeline === 'immediate'
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-slate-900 text-slate-300 border border-slate-700'
                          }`}>
                            {lead.timeline}
                          </span>
                        </td>

                        <td className="p-3.5 text-right">
                          <a
                            href={leadWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PPI Inspections Requests */}
        {activeTab === 'inspections' && (
          <div className="bg-[#0b1426] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Solicitudes de Inspección PPI in situ
                </h3>
                <p className="text-[11px] text-slate-400">
                  Peticiones de peritaje en hangares recibidas desde la página web pública.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d1a] text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Cliente</th>
                    <th className="p-3.5">Aeronave Objetivo</th>
                    <th className="p-3.5">Hangar / Base OACI</th>
                    <th className="p-3.5">Fecha Deseada</th>
                    <th className="p-3.5">Estatus</th>
                    <th className="p-3.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {inspectionsList.map((insp) => (
                    <tr key={insp.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white">{insp.client_name}</div>
                        <div className="text-[11px] text-slate-400">{insp.client_email}</div>
                        <div className="text-[10px] text-emerald-400">{insp.client_phone}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-black text-amber-400 font-mono text-sm">{insp.aircraft_registration}</span>
                        <div className="text-[11px] text-slate-300">{insp.aircraft_model}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-sky-400">{insp.hangar_airport_icao}</div>
                        <div className="text-[10px] text-slate-400">{insp.hangar_location_notes}</div>
                      </td>

                      <td className="p-3.5 text-slate-300">
                        {insp.preferred_inspection_date || 'Inmediata'}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                          {insp.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <a
                          href={buildWhatsAppLink(`Estimado ${insp.client_name}, le contacta el Cap. Abg. Nelson respecto a la inspección PPI de la aeronave ${insp.aircraft_registration}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Coordinar Hangar</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
