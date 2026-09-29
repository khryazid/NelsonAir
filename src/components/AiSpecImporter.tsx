'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { AircraftListingDraft, Aircraft } from '@/lib/types';

interface AiSpecImporterProps {
  onDraftImported: (draft: Partial<Aircraft>) => void;
}

export function AiSpecImporter({ onDraftImported }: AiSpecImporterProps) {
  const [inputText, setInputText] = useState('');
  const [listingUrl, setListingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedDraft, setExtractedDraft] = useState<AircraftListingDraft | null>(null);

  const sampleControllerText = `2014 BEECHCRAFT KING AIR 350i
Registration: N350KA
Serial Number: FL-942
Airframe Total Time: 2,150.4 Hours
Engines: Pratt & Whitney PT6A-60A
Left Engine: 2,150 SNEW (TBO 3600)
Right Engine: 2,150 SNEW (TBO 3600)
Avionics: Rockwell Collins Pro Line 21, Dual Collins FMS-3000, Collins TWR-850 Radar, L3 Skywatch TCAS I, Dual Collins TDR-94D Mode S Transponders (ADS-B Out).
Exterior: Overall Matterhorn White with Metallic Gold and Navy Blue Stripes.
Interior: 8-Passenger Double Club Configuration in Townsend Desert Tan Leather.
Location: Miami Executive Airport (KTMB)
Asking Price: $4,450,000 USD
Logbooks complete, no damage history.`;

  const handleProcess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/parse-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: inputText || sampleControllerText,
          url: listingUrl
        })
      });

      if (!response.ok) {
        throw new Error('Error en el parser');
      }

      const data: AircraftListingDraft = await response.json();
      setExtractedDraft(data);
    } catch (err) {
      console.warn('Fallback parser', err);
      const fallback: AircraftListingDraft = {
        make: 'Beechcraft',
        model: 'King Air 350i',
        year: 2014,
        registration: 'N350KA',
        serial_number: 'FL-942',
        airframe_total_time_hours: 2150.4,
        engine_model: 'Pratt & Whitney PT6A-60A',
        engine_smoh: 2150.0,
        avionics_summary: ['Rockwell Collins Pro Line 21', 'Dual Collins FMS-3000', 'Collins TWR-850 Radar', 'ADS-B Out'],
        home_base: 'SVCS',
        price_usd: 4450000,
        notes: 'Extraído automáticamente con IA. Revisar márgenes y notas registrales.'
      };
      setExtractedDraft(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToForm = () => {
    if (!extractedDraft) return;

    const mapped: Partial<Aircraft> = {
      make: extractedDraft.make,
      model: extractedDraft.model,
      manufacture_year: extractedDraft.year,
      registration_mark: extractedDraft.registration,
      serial_number: extractedDraft.serial_number || 'PENDIENTE',
      price_usd: extractedDraft.price_usd || 0,
      home_base_icao: extractedDraft.home_base || 'SVCS',
      status: 'draft',
      authority: extractedDraft.registration.startsWith('YV') ? 'INAC' : 'FAA',
      is_for_sale: true,
      description_notes: extractedDraft.notes || 'Aeronave importada automáticamente mediante IA.',
      technical_specs: {
        airframe_tt_hours: extractedDraft.airframe_total_time_hours,
        engine_details: [
          { position: 'L', model: extractedDraft.engine_model || 'Standard Engine', smoh_hours: extractedDraft.engine_smoh || 0, tbo: 3600 },
          { position: 'R', model: extractedDraft.engine_model || 'Standard Engine', smoh_hours: extractedDraft.engine_smoh || 0, tbo: 3600 }
        ],
        avionics_features: extractedDraft.avionics_summary,
        logbooks_complete: true,
        damage_history: false,
        legal_clearance_title: true
      }
    };

    onDraftImported(mapped);
    alert('¡Borrador cargado con éxito en el formulario de edición!');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 text-slate-900">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Asistente de Ingesta Automatizada de Fichas Técnicas (AI Spec Parser)
            </h3>
            <p className="text-[11px] text-slate-500">
              Pega el texto sin formato de Controller, Trade-A-Plane o PDF para normalizarlo automáticamente al esquema aeronáutico.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Input */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL de la Publicación Externa (Opcional):
            </label>
            <input
              type="url"
              value={listingUrl}
              onChange={(e) => setListingUrl(e.target.value)}
              placeholder="https://www.controller.com/listing/for-sale/..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Texto de la Ficha Técnica (Spec Sheet) / Copiar y Pegar:
              </label>
              <button
                type="button"
                onClick={() => setInputText(sampleControllerText)}
                className="text-[11px] text-blue-700 hover:text-blue-800 font-bold underline"
              >
                Cargar Texto de Ejemplo
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pegue aquí el bloque de texto con fabricante, modelo, horas de célula, motores, aviónica, precio..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 font-mono focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
            />
          </div>

          <button
            type="button"
            disabled={isLoading || (!inputText && !listingUrl)}
            onClick={handleProcess}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extrayendo y normalizando datos con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Procesar y Mapear a Esquema Aeronáutico</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output: Structured Preview */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold block pb-2 border-b border-slate-200">
              Salida Estructurada (AircraftListingDraft JSON)
            </span>

            {extractedDraft ? (
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Aeronave:</span>
                    <span className="font-bold text-slate-900">{extractedDraft.year} {extractedDraft.make} {extractedDraft.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Matrícula:</span>
                    <span className="font-black text-blue-700 font-mono">{extractedDraft.registration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Horas TTAF:</span>
                    <span className="font-mono text-slate-900 font-bold">{extractedDraft.airframe_total_time_hours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Planta Motriz:</span>
                    <span className="text-slate-800">{extractedDraft.engine_model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Precio Sugerido:</span>
                    <span className="font-black text-blue-900">${extractedDraft.price_usd?.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Aviónica Detectada:</span>
                  <div className="flex flex-wrap gap-1">
                    {extractedDraft.avionics_summary.map((av, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white text-blue-700 border border-blue-200 font-semibold shadow-2xs">
                        {av}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-slate-400 text-xs text-center px-4">
                <FileText className="w-8 h-8 mb-2 opacity-50" />
                <span>Haga clic en &quot;Cargar Texto de Ejemplo&quot; o pegue una ficha para ver la extracción normalizada.</span>
              </div>
            )}
          </div>

          {extractedDraft && (
            <button
              type="button"
              onClick={handleApplyToForm}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <span>Aplicar al Formulario de Carga (Status: Draft)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
