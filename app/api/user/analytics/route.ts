import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // In a real app, verify user session here.
    // For this prototype, we'll fetch aggregated stats for the user's templates/links.
    
    // We'll just fetch all analytics events and group them (simulating "my links")
    const { data: events, error } = await supabaseAdmin
      .from('analytics_events')
      .select('event_type, country, city, created_at, device_type')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const views = events.filter((e: any) => e.event_type.includes('view') || e.event_type === 'milestone_previewed').length;
    const downloads = events.filter((e: any) => e.event_type === 'resume_downloaded').length;
    
    // Group by country
    const geoLocations = events.reduce((acc: any, event: any) => {
      const loc = event.country || 'Unknown';
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {});

    const topLocations = Object.entries(geoLocations)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      views,
      downloads,
      topLocations,
      recentEvents: events.slice(0, 10)
    });
  } catch (error: any) {
    logger.error('analytics', 'Analytics fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
