'use client';

import React, { useState } from 'react';
import { 
  Plane, 
  ShieldAlert, 
  FileText, 
  Download, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileCheck, 
  Wrench, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Fuel,
  CreditCard
} from 'lucide-react';
import { 
  Aircraft, 
  ComplianceAlert, 
  AircraftDocument, 
  ManagementReport 
} from '@/lib/types';
import { formatCurrency, formatHours, formatDate, buildWhatsAppLink } from '@/lib/utils';

interface OwnerDashboardProps {
  aircraftList: Aircraft[];
  alerts: ComplianceAlert[];
  documents: AircraftDocument[];
  reports: ManagementReport[];
}

export function OwnerDashboard({
  aircraftList,
  alerts,
  documents,
  reports
}: OwnerDashboardProps) {
  const [selectedAircraftId, setSelectedAircraftId] = useState<string>(
    aircraftList[0]?.id || 'ac-kingair-b200'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'vault' | 'reports'>('overview');
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  const currentAircraft = aircraftList.find((a) => a.id === selectedAircraftId) || aircraftList[0];
  const aircraftAlerts = alerts.filter((a) => a.aircraft_id === selectedAircraftId);
  const aircraftDocs = documents.filter((d) => d.aircraft_id === selectedAircraftId);
  const aircraftReports = reports.filter((r) => r.aircraft_id === selectedAircraftId);

  const handleSimulatedDownload = (docName: string, id: string) => {
    setDownloadingDocId(id);
    setTimeout(() => {
      setDownloadingDocId(null);
      alert(`Descarga segura iniciada: ${docName}\n(Generando token de acceso temporal con Supabase Storage)`);
    }, 800);
  };

  const whatsappManagerUrl = buildWhatsAppLink(
    `Hola Cap. Abg. Nelson, como propietario de la aeronave ${currentAircraft?.registration_mark}, solicito coordinar un trámite / servicio.`
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Owner Account & Aircraft Switcher */}
      <div className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Portal Privado de Administración Aeronáutica</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Gestión de Flota & Bóveda Cifrada</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitoreo en tiempo real de estatus legal INAC/FAA, vencimientos de pólizas y bitácoras.
          </p>
        </div>

        {/* Aircraft Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-400">Aeronave Activa:</label>
          <select
            value={selectedAircraftId}
            onChange={(e) => setSelectedAircraftId(e.target.value)}
            className="bg-[#070d18] border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
          >
            {aircraftList.map((ac) => (
              <option key={ac.id} value={ac.id}>
                {ac.registration_mark} — {ac.make} {ac.model}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Aircraft Overview Card */}
      {currentAircraft && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#080e1b] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">Matrícula & Autoridad</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-amber-400">{currentAircraft.registration_mark}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-bold border border-sky-800">
                {currentAircraft.authority}
              </span>
            </div>
            <span className="text-xs text-slate-300 mt-1 block">
              {currentAircraft.make} {currentAircraft.model}
            </span>
          </div>

          <div className="bg-[#080e1b] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">Horas de Célula (TTAF)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-white">
                {formatHours(currentAircraft.technical_specs?.airframe_tt_hours)}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Bitácoras al día
            </span>
          </div>

          <div className="bg-[#080e1b] border border-slate-800 p-4 rounded-xl">
            <span className="text-[11px] text-slate-400 block font-medium">Hangar Base</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-sky-400">{currentAircraft.home_base_icao}</span>
              <span className="text-xs text-slate-400">
                {currentAircraft.home_base_icao === 'SVCS' ? 'Charallave' : 'Maiquetía'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Hangar Privado Techado</span>
          </div>

          <div className="bg-[#080e1b] border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 block font-medium">Gestión Legal & Operativa</span>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Aeronavegabilidad Activa
            </div>
            <a
              href={whatsappManagerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mt-2"
            >
              <span>Contactar al Abogado-Piloto</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'overview'
              ? 'border-amber-400 text-amber-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Alertas de Vencimiento & Mantenimiento ({aircraftAlerts.length})
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'vault'
              ? 'border-amber-400 text-amber-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Bóveda Documental Cifrada ({aircraftDocs.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'reports'
              ? 'border-amber-400 text-amber-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Informes Mensuales de Gestión ({aircraftReports.length})
        </button>
      </div>

      {/* Tab 1: Compliance Alerts */}
      {activeTab === 'overview' && (
        <div className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Sistema de Trazabilidad y Alertas Regulatorias INAC / FAA</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vencimientos críticos monitoreados legalmente para garantizar la validez del seguro y la aeronavegabilidad.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {aircraftAlerts.map((alert) => {
              const isCritical = alert.severity === 'critical';
              const isWarning = alert.severity === 'warning';

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCritical
                      ? 'bg-red-950/20 border-red-500/40 text-red-200'
                      : isWarning
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCritical ? (
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-sky-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {alert.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Tipo: <span className="capitalize">{alert.alert_type}</span> • Fecha Límite:{' '}
                        <strong className="text-slate-200">{formatDate(alert.due_date)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-red-900/80 text-red-200 border border-red-700'
                          : isWarning
                          ? 'bg-amber-900/80 text-amber-200 border border-amber-700'
                          : 'bg-sky-900/80 text-sky-200 border border-sky-700'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <a
                      href={whatsappManagerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                    >
                      Gestionar Trámite
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Document Vault */}
      {activeTab === 'vault' && (
        <div className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-400" />
                <span>Bóveda Documental Cifrada (Encrypted Storage)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Archivos PDF confidenciales con URLs firmadas temporales protegidas por Row Level Security (RLS).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aircraftDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#070d18] border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-3 hover:border-slate-700 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                      {doc.document_name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 space-x-2">
                      <span className="capitalize">{doc.document_type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>Subido: {formatDate(doc.uploaded_at)}</span>
                    </p>
                    {doc.expiration_date && (
                      <p className="text-[10px] text-amber-400 mt-0.5">
                        Expira: {formatDate(doc.expiration_date)}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulatedDownload(doc.document_name, doc.id)}
                  disabled={downloadingDocId === doc.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingDocId === doc.id ? 'Descargando...' : 'Descargar'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Management Reports */}
      {activeTab === 'reports' && (
        <div className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Historial de Informes Mensuales de Administración</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Rendición de cuentas de horas de vuelo, mantenimientos preventivos y desglose contable mensual.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {aircraftReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-[#070d18] border border-slate-800 p-5 rounded-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-850 gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Informe de Gestión — Mes {rep.report_period_month} / {rep.report_period_year}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Emitido el {formatDate(rep.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Gasto Operativo Total</span>
                      <span className="text-sm font-black text-amber-400">
                        {formatCurrency(rep.total_operating_cost_usd)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSimulatedDownload(`Informe_${rep.report_period_month}_${rep.report_period_year}.pdf`, rep.id)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar PDF</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {rep.summary_notes}
                </p>

                {rep.cost_breakdown && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-[10px] text-slate-500 uppercase block">Combustible</span>
                      <span className="font-bold text-slate-200">{formatCurrency(rep.cost_breakdown.fuel)}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-[10px] text-slate-500 uppercase block">Hangaraje</span>
                      <span className="font-bold text-slate-200">{formatCurrency(rep.cost_breakdown.hangar)}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-[10px] text-slate-500 uppercase block">Tripulación</span>
                      <span className="font-bold text-slate-200">{formatCurrency(rep.cost_breakdown.crew)}</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                      <span className="text-[10px] text-slate-500 uppercase block">Taller & Mtto</span>
                      <span className="font-bold text-slate-200">{formatCurrency(rep.cost_breakdown.maintenance)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
