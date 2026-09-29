import { NextResponse } from 'next/server';
import { INITIAL_AIRCRAFT } from '@/lib/data-store';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Aircraft } from '@/lib/types';

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('aircraft')
        .select(`
          *,
          technical_specs:aircraft_technical_specs(*)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ aircraft: data });
      }
    }

    return NextResponse.json({ aircraft: INITIAL_AIRCRAFT });
  } catch (err: any) {
    console.error('Fetch aircraft error:', err);
    return NextResponse.json({ aircraft: INITIAL_AIRCRAFT });
  }
}

export async function POST(req: Request) {
  try {
    const body: Partial<Aircraft> = await req.json();

    if (!body.registration_mark || !body.make || !body.model) {
      return NextResponse.json(
        { error: 'Matrícula, fabricante y modelo son requeridos' },
        { status: 400 }
      );
    }

    const newAircraft: Aircraft = {
      id: 'ac-' + Date.now(),
      registration_mark: body.registration_mark.toUpperCase(),
      serial_number: body.serial_number || 'S/N-PENDING',
      authority: body.authority || 'INAC',
      make: body.make,
      model: body.model,
      manufacture_year: body.manufacture_year || new Date().getFullYear(),
      home_base_icao: body.home_base_icao || 'SVCS',
      status: body.status || 'draft',
      price_usd: body.price_usd || 0,
      is_for_sale: body.is_for_sale !== undefined ? body.is_for_sale : true,
      is_under_management: body.is_under_management || false,
      featured_image_url:
        body.featured_image_url ||
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
      description_notes: body.description_notes || '',
      technical_specs: body.technical_specs || {
        airframe_tt_hours: 1000,
        engine_details: [],
        avionics_features: ['Standard Suite'],
        logbooks_complete: true,
        damage_history: false,
        legal_clearance_title: true
      },
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('aircraft')
        .insert([
          {
            registration_mark: newAircraft.registration_mark,
            serial_number: newAircraft.serial_number,
            authority: newAircraft.authority,
            make: newAircraft.make,
            model: newAircraft.model,
            manufacture_year: newAircraft.manufacture_year,
            home_base_icao: newAircraft.home_base_icao,
            status: newAircraft.status,
            price_usd: newAircraft.price_usd,
            is_for_sale: newAircraft.is_for_sale,
            is_under_management: newAircraft.is_under_management,
            featured_image_url: newAircraft.featured_image_url,
            description_notes: newAircraft.description_notes
          }
        ])
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, aircraft: data });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Aeronave registrada exitosamente',
      aircraft: newAircraft
    });
  } catch (err: any) {
    console.error('Create aircraft error:', err);
    return NextResponse.json(
      { error: err.message || 'Error al registrar aeronave' },
      { status: 500 }
    );
  }
}
