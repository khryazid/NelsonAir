'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  Plane, 
  Sparkles, 
  Users, 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare,
  Scale
} from 'lucide-react';
import { AiSpecImporter } from '@/components/AiSpecImporter';
import { PpiReportGenerator } from '@/components/PpiReportGenerator';
import { 
  INITIAL_AIRCRAFT, 
  INITIAL_BUYER_LEADS, 
  INITIAL_COMPLIANCE_ALERTS, 
  INITIAL_INSPECTIONS 
} from '@/lib/data-store';
import { Aircraft, AircraftStatus, BuyerLead } from '@/lib/types';
import { formatCurrency, formatHours, buildWhatsAppLink } from '@/lib/utils';

export default function CmsPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'ai_importer' | 'ppi_generator' | 'leads' | 'inspections'>('listings');
  
  const [aircraftList, setAircraftList] = useState<Aircraft[]>(INITIAL_AIRCRAFT);
  const [leadsList] = useState<BuyerLead[]>(INITIAL_BUYER_LEADS);
  const [inspectionsList] = useState(INITIAL_INSPECTIONS);

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
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Panel de Control Administrativo (CMS Abogado)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Gestión Integral del Despacho Aeronáutico
            </h1>
            <p className="text-slate-500 text-xs mt-1">
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
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Aeronave (Carga Manual)</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Aeronaves en Brokerage</span>
            <div className="text-2xl font-black text-blue-900 mt-1">{aircraftList.length}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
              {aircraftList.filter((a) => a.status === 'published').length} publicadas activas
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Mandatos Off-Market</span>
            <div className="text-2xl font-black text-sky-700 mt-1">{leadsList.length}</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Leads de alto patrimonio</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Inspecciones PPI Solicitadas</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{inspectionsList.length}</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Peritajes en hangar</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Alertas Regulatorias</span>
            <div className="text-2xl font-black text-indigo-700 mt-1">{INITIAL_COMPLIANCE_ALERTS.length}</div>
            <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">Vencimientos INAC / Pólizas</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'listings'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Gestión de Inventario ({aircraftList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_importer')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai_importer'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Ingestor de Fichas (AI Parser)</span>
          </button>

          <button
            onClick={() => setActiveTab('ppi_generator')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ppi_generator'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Emisor de Reportes PPI (Membrete)</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Mandatos Off-Market ({leadsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspections')}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'inspections'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
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
                className="bg-white border border-blue-300 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 animate-in slide-in-from-top-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                    <Plane className="w-4 h-4 text-blue-600" />
                    <span>Formulario de Carga Especializada en TypeScript (Zod Ready)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-700"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Identification */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Matrícula (YV o N) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.registration_mark || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, registration_mark: e.target.value.toUpperCase() })}
                      placeholder="YV-3450 o N-892CA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-black text-blue-700 uppercase focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Serial Number (MSN) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.serial_number || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, serial_number: e.target.value })}
                      placeholder="BB-1688"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Fabricante (Make) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.make || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, make: e.target.value })}
                      placeholder="Beechcraft"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Modelo (Model) *</label>
                    <input
                      required
                      type="text"
                      value={editingAircraft.model || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, model: e.target.value })}
                      placeholder="King Air B200"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Year, Base, Price, Authority */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Año de Fabricación</label>
                    <input
                      type="number"
                      value={editingAircraft.manufacture_year || 2010}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, manufacture_year: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Base OACI</label>
                    <select
                      value={editingAircraft.home_base_icao || 'SVCS'}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, home_base_icao: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="SVCS">SVCS (Charallave)</option>
                      <option value="SVMI">SVMI (Maiquetía)</option>
                      <option value="SVFM">SVFM (La Carlota)</option>
                      <option value="SVVA">SVVA (Valencia)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Precio de Venta (USD)</label>
                    <input
                      type="number"
                      value={editingAircraft.price_usd || 0}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, price_usd: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-black text-blue-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Estatus del Listado</label>
                    <select
                      value={editingAircraft.status || 'draft'}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, status: e.target.value as AircraftStatus })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="draft">Borrador (Draft)</option>
                      <option value="published">Publicado (Activo en Catálogo)</option>
                      <option value="under_contract">Bajo Contrato / En Peritaje</option>
                      <option value="sold">Vendido</option>
                    </select>
                  </div>
                </div>

                {/* Technical specs: TTAF, Engines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Horas Totales Célula (TTAF)</label>
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">URL Foto Principal</label>
                    <input
                      type="url"
                      value={editingAircraft.featured_image_url || ''}
                      onChange={(e) => setEditingAircraft({ ...editingAircraft, featured_image_url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Notas Técnicas & Dictamen Legal Preliminar</label>
                  <textarea
                    rows={3}
                    value={editingAircraft.description_notes || ''}
                    onChange={(e) => setEditingAircraft({ ...editingAircraft, description_notes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                  >
                    Guardar Aeronave en Catálogo
                  </button>
                </div>
              </form>
            )}

            {/* Aircraft Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Listado Maestro de Aeronaves (Brokerage & Flota)
                </h3>
                <span className="text-xs text-slate-500">{aircraftList.length} registradas</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Matrícula / Aeronave</th>
                      <th className="p-4">Base OACI</th>
                      <th className="p-4">Horas TTAF</th>
                      <th className="p-4">Precio (USD)</th>
                      <th className="p-4">Estatus</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {aircraftList.map((ac) => (
                      <tr key={ac.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded-md font-black text-blue-700 bg-blue-50 border border-blue-200">
                              {ac.registration_mark}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900">{ac.manufacture_year} {ac.make} {ac.model}</div>
                              <div className="text-[11px] text-slate-400 font-mono">MSN: {ac.serial_number}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                            {ac.home_base_icao}
                          </span>
                        </td>

                        <td className="p-4 font-mono text-slate-700 font-semibold">
                          {formatHours(ac.technical_specs?.airframe_tt_hours)}
                        </td>

                        <td className="p-4 font-black text-blue-900">
                          {formatCurrency(ac.price_usd)}
                        </td>

                        <td className="p-4">
                          <select
                            value={ac.status}
                            onChange={(e) => handleStatusChange(ac.id, e.target.value as AircraftStatus)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                          >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                            <option value="under_contract">Bajo Contrato</option>
                            <option value="sold">Vendido</option>
                          </select>
                        </td>

                        <td className="p-4 text-right space-x-1.5">
                          <button
                            onClick={() => {
                              setEditingAircraft(ac);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAircraft(ac.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
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
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Mandatos de Búsqueda Off-Market (Email Marketing & Calificación)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Prospectos calificados de alto patrimonio captados vía web según la matriz de segmentación del plan.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Cliente / Razón Social</th>
                    <th className="p-4">Categorías Preferidas</th>
                    <th className="p-4">Presupuesto</th>
                    <th className="p-4">Operación</th>
                    <th className="p-4">Horizonte</th>
                    <th className="p-4 text-right">Contacto Rápido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leadsList.map((lead) => {
                    const leadWhatsApp = buildWhatsAppLink(
                      `Estimado ${lead.full_name || 'cliente'}, le escribe el Cap. Abg. Nelson R. respecto a su mandato de búsqueda de aeronave en nuestra plataforma.`
                    );

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{lead.full_name || 'Sin nombre'}</div>
                          <div className="text-[11px] text-slate-500">{lead.email}</div>
                          {lead.phone_whatsapp && (
                            <div className="text-[10px] text-emerald-700 font-mono font-bold">{lead.phone_whatsapp}</div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {lead.preferred_categories.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[10px] text-blue-700 font-semibold uppercase">
                                {c}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-4 font-bold text-slate-900">
                          {lead.budget_range.replace('_', ' - ')}
                        </td>

                        <td className="p-4 text-slate-600 capitalize text-[11px]">
                          {lead.operation_profile?.replace('_', ' ') || 'IFR'}
                        </td>

                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            lead.timeline === 'immediate'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {lead.timeline}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <a
                            href={leadWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
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
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Solicitudes de Inspección PPI in situ
                </h3>
                <p className="text-[11px] text-slate-500">
                  Peticiones de peritaje en hangares recibidas desde la página web pública.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Aeronave Objetivo</th>
                    <th className="p-4">Hangar / Base OACI</th>
                    <th className="p-4">Fecha Deseada</th>
                    <th className="p-4">Estatus</th>
                    <th className="p-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inspectionsList.map((insp) => (
                    <tr key={insp.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{insp.client_name}</div>
                        <div className="text-[11px] text-slate-500">{insp.client_email}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{insp.client_phone}</div>
                      </td>

                      <td className="p-4">
                        <span className="font-black text-blue-700 font-mono text-sm">{insp.aircraft_registration}</span>
                        <div className="text-[11px] text-slate-600">{insp.aircraft_model}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-sky-700">{insp.hangar_airport_icao}</div>
                        <div className="text-[10px] text-slate-500">{insp.hangar_location_notes}</div>
                      </td>

                      <td className="p-4 text-slate-700 font-medium">
                        {insp.preferred_inspection_date || 'Inmediata'}
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                          {insp.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <a
                          href={buildWhatsAppLink(`Estimado ${insp.client_name}, le contacta el Cap. Abg. Nelson respecto a la inspección PPI de la aeronave ${insp.aircraft_registration}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
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
