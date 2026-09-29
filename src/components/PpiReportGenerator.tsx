'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Plane, 
  Scale
} from 'lucide-react';
import { PpiReport } from '@/lib/types';
import { SAMPLE_PPI_REPORT } from '@/lib/data-store';
import { formatDate } from '@/lib/utils';

export function PpiReportGenerator() {
  const [report, setReport] = useState<PpiReport>({
    ...SAMPLE_PPI_REPORT,
    inspector_name: 'Cap. Abg. Nelson Sánchez (Piloto Comercial CPL / Abg. Aeronáutico)'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action controls (Hidden when printing) */}
      <div className="no-print bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs text-slate-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Herramienta Pericial Legal-Técnica</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Emisor de Dictámenes de Inspección Pre-Compra (PPI)
          </h3>
          <p className="text-xs text-slate-500">
            Genera informes con membrete legal que fusionan peritaje de célula/motor, vuelo de prueba y consulta al Registro Aeronáutico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
          >
            {isEditing ? 'Vista Previa de Informe' : 'Editar Parámetros'}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Exportar a PDF</span>
          </button>
        </div>
      </div>

      {/* Editor Form Mode */}
      {isEditing && (
        <div className="no-print bg-white border border-slate-200 rounded-3xl p-6 text-xs text-slate-800 space-y-4 shadow-xs">
          <h4 className="font-bold text-blue-700 uppercase tracking-wider text-xs">
            Formulario de Carga del Dictamen PPI
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">N° de Dictamen:</label>
              <input
                type="text"
                value={report.report_number}
                onChange={(e) => setReport({ ...report, report_number: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Matrícula:</label>
              <input
                type="text"
                value={report.aircraft_registration}
                onChange={(e) => setReport({ ...report, aircraft_registration: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Fabricante & Modelo:</label>
              <input
                type="text"
                value={report.aircraft_make_model}
                onChange={(e) => setReport({ ...report, aircraft_make_model: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Ubicación / Hangar:</label>
              <input
                type="text"
                value={report.location}
                onChange={(e) => setReport({ ...report, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Veredicto Legal-Técnico:</label>
              <select
                value={report.final_legal_technical_verdict}
                onChange={(e) => setReport({ ...report, final_legal_technical_verdict: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Aeronave Apta para Adquisición">Aeronave Apta para Adquisición</option>
                <option value="Apta con Observaciones Subsanables">Apta con Observaciones Subsanables</option>
                <option value="Riesgo Crítico / No Recomendada">Riesgo Crítico / No Recomendada</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-slate-500 font-semibold mb-1">Opinión Legal & Recomendación de Cierre:</label>
            <textarea
              rows={3}
              value={report.confidential_legal_opinion}
              onChange={(e) => setReport({ ...report, confidential_legal_opinion: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Official Printable Report with High-End Legal Letterhead */}
      <div className="print-container bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 max-w-4xl mx-auto font-sans leading-relaxed">
        
        {/* Letterhead */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center text-white shadow-sm">
              <Plane className="w-8 h-8 transform -rotate-45" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
                DESPACHO AERONÁUTICO & MERCANTIL
              </h1>
              <p className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                Cap. Abg. Nelson Sánchez • Peritaje Técnico & Blindaje Jurídico
              </p>
              <p className="text-[11px] text-slate-500">
                Caracas, Venezuela • Operaciones SVCS / SVMI / SVFM • Multijurisdicción INAC & FAA
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Dictamen Pericial N°</div>
            <div className="text-sm font-black font-mono text-slate-950">{report.report_number}</div>
            <div className="text-xs text-slate-500 mt-0.5">Fecha: {formatDate(report.date)}</div>
          </div>
        </div>

        {/* Report Title */}
        <div className="text-center my-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h2 className="text-base sm:text-lg font-black tracking-tight uppercase text-slate-900">
            INFORME DE INSPECCIÓN PRE-COMPRA (PPI) & AUDITORÍA REGISTRAL
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Certificación pericial de aeronavegabilidad, pruebas operacionales y estatus de título de propiedad
          </p>
        </div>

        {/* Identification Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs mb-6">
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Aeronave</span>
            <span className="font-bold text-slate-900">{report.aircraft_make_model}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Matrícula</span>
            <span className="font-mono font-black text-blue-700 text-sm">{report.aircraft_registration}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Serial (MSN)</span>
            <span className="font-mono text-slate-900 font-semibold">{report.serial_number}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] font-bold block">Lugar de Inspección</span>
            <span className="text-slate-900 font-medium">{report.location}</span>
          </div>
        </div>

        {/* Inspection Sections */}
        <div className="space-y-6 text-xs text-slate-800">
          
          {/* 1. Célula */}
          <div className="border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs pb-2 border-b border-slate-100 mb-3 flex items-center justify-between">
              <span>1. Inspección Física de Célula & Corrosión</span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-full">
                {report.physical_inspection.airframe_condition}
              </span>
            </h3>
            <ul className="space-y-1.5 leading-relaxed text-slate-600">
              <li>• <strong>Célula y largueros:</strong> {report.physical_inspection.corrosion_findings}</li>
              <li>• <strong>Tren de aterrizaje y frenos:</strong> {report.physical_inspection.landing_gear_tires}</li>
              <li>• <strong>Superficies de control y timones:</strong> {report.physical_inspection.control_surfaces}</li>
            </ul>
          </div>

          {/* 2. Planta Motriz & Boroscopia */}
          <div className="border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs pb-2 border-b border-slate-100 mb-3">
              2. Planta Motriz, Compresiones & Boroscopia
            </h3>
            <ul className="space-y-1.5 leading-relaxed text-slate-600">
              <li>• <strong>Régimen térmico y compresiones:</strong> {report.powerplant_inspection.engine_compressions}</li>
              <li>• <strong>Boroscopia de turbinas/cilindros:</strong> {report.powerplant_inspection.borescope_summary}</li>
              <li>• <strong>Estanqueidad y fugas de aceite:</strong> {report.powerplant_inspection.oil_leakage}</li>
              <li>• <strong>Estado de hélices:</strong> {report.powerplant_inspection.propeller_condition}</li>
            </ul>
          </div>

          {/* 3. Vuelo de Verificación Operacional */}
          <div className="border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs pb-2 border-b border-slate-100 mb-3">
              3. Prueba en Tierra (Run-Up) & Vuelo de Verificación
            </h3>
            <ul className="space-y-1.5 leading-relaxed text-slate-600">
              <li>• <strong>Chequeo de magnetos/reversas:</strong> {report.operational_runup_flight.ground_runup}</li>
              <li>• <strong>Aviónica y piloto automático:</strong> {report.operational_runup_flight.avionics_systems_check}</li>
              <li>• <strong>Vuelo de prueba al mando del piloto-inspector:</strong> {report.operational_runup_flight.test_flight_observations}</li>
            </ul>
          </div>

          {/* 4. Dictamen Legal & Registral */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-blue-50/30">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs pb-2 border-b border-slate-200/60 mb-3 flex items-center justify-between">
              <span>4. Dictamen Registral & Jurídico (INAC / FAA)</span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 font-bold rounded-full">
                Clear Title / Título Limpio
              </span>
            </h3>
            <ul className="space-y-1.5 leading-relaxed text-slate-600">
              <li>• <strong>Estatus ante el Registro Aeronáutico Nacional:</strong> {report.legal_regulatory_review.national_registry_record}</li>
              <li>• <strong>Directivas de Aeronavegabilidad (ADs):</strong> {report.legal_regulatory_review.airworthiness_directive_status}</li>
              <li>• <strong>Gravámenes o prendas:</strong> No constan gravámenes, embargos ni litigios que impidan la transmisión de la propiedad.</li>
            </ul>
          </div>

          {/* Final Legal-Technical Verdict */}
          <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-600 text-slate-900">
            <div className="flex items-center justify-between mb-2">
              <span className="font-black uppercase tracking-wider text-xs text-blue-900">Veredicto Pericial Final:</span>
              <span className="px-3.5 py-1 bg-blue-600 text-white font-extrabold rounded-lg text-xs shadow-xs">
                {report.final_legal_technical_verdict}
              </span>
            </div>
            <p className="text-xs leading-relaxed italic text-slate-700">
              &quot;{report.confidential_legal_opinion}&quot;
            </p>
          </div>

        </div>

        {/* Signatures & Accreditation */}
        <div className="mt-12 pt-8 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs text-center">
          <div>
            <div className="w-48 border-b border-slate-800 mx-auto mb-2" />
            <span className="font-bold text-slate-900 block">{report.inspector_name}</span>
            <span className="text-[11px] text-slate-500 block">Abogado Especialista en Derecho Aeronáutico & Mercantil</span>
            <span className="text-[10px] text-slate-400 block">INAC REG-8842 • Colegio de Abogados de Caracas</span>
          </div>

          <div>
            <div className="w-48 border-b border-slate-800 mx-auto mb-2" />
            <span className="font-bold text-slate-900 block">Piloto Comercial al Mando (CPL)</span>
            <span className="text-[11px] text-slate-500 block">Habilitación Multimotor Terrestre & IFR</span>
            <span className="text-[10px] text-slate-400 block">Licencia Aeronáutica Vigente</span>
          </div>
        </div>

      </div>
    </div>
  );
}
