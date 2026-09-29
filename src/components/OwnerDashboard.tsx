'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileSpreadsheet, 
  ChevronRight
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
    <div className="space-y-6 text-slate-900">
      
      {/* Top Banner: Owner Account & Aircraft Switcher */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Portal Privado de Administración Aeronáutica</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Gestión de Flota & Bóveda Cifrada
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitoreo en tiempo real de estatus legal INAC/FAA, vencimientos de pólizas y bitácoras.
          </p>
        </div>

        {/* Aircraft Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600">Aeronave Activa:</label>
          <select
            value={selectedAircraftId}
            onChange={(e) => setSelectedAircraftId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-blue-800 focus:bg-white focus:border-blue-600 focus:outline-none"
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
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Matrícula & Autoridad</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-blue-900">{currentAircraft.registration_mark}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                {currentAircraft.authority}
              </span>
            </div>
            <span className="text-xs text-slate-600 mt-1 block font-medium">
              {currentAircraft.make} {currentAircraft.model}
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Horas de Célula (TTAF)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-slate-900">
                {formatHours(currentAircraft.technical_specs?.airframe_tt_hours)}
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bitácoras al día
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Hangar Base</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-black text-sky-700">{currentAircraft.home_base_icao}</span>
              <span className="text-xs text-slate-500 font-medium">
                {currentAircraft.home_base_icao === 'SVCS' ? 'Charallave' : 'Maiquetía'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Hangar Privado Techado</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Gestión Legal & Operativa</span>
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Aeronavegabilidad Activa
            </div>
            <a
              href={whatsappManagerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 mt-2"
            >
              <span>Contactar al Abogado-Piloto</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Alertas de Vencimiento & Mantenimiento ({aircraftAlerts.length})
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'vault'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Bóveda Documental Cifrada ({aircraftDocs.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === 'reports'
              ? 'border-blue-600 text-blue-700 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Informes Mensuales de Gestión ({aircraftReports.length})
        </button>
      </div>

      {/* Tab 1: Compliance Alerts */}
      {activeTab === 'overview' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <span>Sistema de Trazabilidad y Alertas Regulatorias INAC / FAA</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
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
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCritical
                      ? 'bg-red-50/70 border-red-200 text-red-900'
                      : isWarning
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-blue-50/50 border-blue-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isCritical ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                        {alert.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tipo: <span className="capitalize">{alert.alert_type}</span> • Fecha Límite:{' '}
                        <strong className="text-slate-900">{formatDate(alert.due_date)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-700 border border-blue-300'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <a
                      href={whatsappManagerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition shadow-2xs"
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
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span>Bóveda Documental Cifrada (Encrypted Storage)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Archivos PDF confidenciales con URLs firmadas temporales protegidas por Row Level Security (RLS).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aircraftDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start justify-between gap-3 hover:border-blue-300 hover:bg-blue-50/30 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {doc.document_name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 space-x-2">
                      <span className="capitalize">{doc.document_type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>Subido: {formatDate(doc.uploaded_at)}</span>
                    </p>
                    {doc.expiration_date && (
                      <p className="text-[10px] text-amber-700 font-semibold mt-0.5">
                        Expira: {formatDate(doc.expiration_date)}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulatedDownload(doc.document_name, doc.id)}
                  disabled={downloadingDocId === doc.id}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5 shrink-0 shadow-2xs"
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
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Historial de Informes Mensuales de Administración</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rendición de cuentas de horas de vuelo, mantenimientos preventivos y desglose contable mensual.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {aircraftReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Informe de Gestión — Mes {rep.report_period_month} / {rep.report_period_year}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      Emitido el {formatDate(rep.created_at)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Gasto Operativo Total</span>
                      <span className="text-sm font-black text-blue-900">
                        {formatCurrency(rep.total_operating_cost_usd)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSimulatedDownload(`Informe_${rep.report_period_month}_${rep.report_period_year}.pdf`, rep.id)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar PDF</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                  {rep.summary_notes}
                </p>

                {rep.cost_breakdown && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Combustible</span>
                      <span className="font-bold text-slate-900">{formatCurrency(rep.cost_breakdown.fuel)}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Hangaraje</span>
                      <span className="font-bold text-slate-900">{formatCurrency(rep.cost_breakdown.hangar)}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Tripulación</span>
                      <span className="font-bold text-slate-900">{formatCurrency(rep.cost_breakdown.crew)}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Taller & Mtto</span>
                      <span className="font-bold text-slate-900">{formatCurrency(rep.cost_breakdown.maintenance)}</span>
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
