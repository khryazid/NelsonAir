'use client';

import React from 'react';
import { OwnerDashboard } from '@/components/OwnerDashboard';
import { 
  INITIAL_AIRCRAFT, 
  INITIAL_COMPLIANCE_ALERTS, 
  INITIAL_DOCUMENTS, 
  INITIAL_MANAGEMENT_REPORTS 
} from '@/lib/data-store';

export default function PortalPage() {
  const managedAircraft = INITIAL_AIRCRAFT.filter((a) => a.is_under_management);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb / Status info */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-blue-700 font-bold">Portal del Propietario</span>
            <span>/</span>
            <span>Sesión Activa: Carlos Mendoza (Inversiones Corporativas)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-700 font-bold">Conexión Cifrada SSL</span>
          </div>
        </div>

        {/* The Owner Dashboard Component */}
        <OwnerDashboard
          aircraftList={managedAircraft}
          alerts={INITIAL_COMPLIANCE_ALERTS}
          documents={INITIAL_DOCUMENTS}
          reports={INITIAL_MANAGEMENT_REPORTS}
        />

      </div>
    </div>
  );
}
