import { NextResponse } from 'next/server'

const shipments = [
  { id: 'SH-2001', status: 'In Transit', lat: 40.7357, lng: -74.1724 },
  { id: 'SH-2002', status: 'In Transit', lat: 39.9526, lng: -75.1652 },
  { id: 'SH-2003', status: 'Delivered', lat: 34.0522, lng: -118.2437 },
]

export async function GET() {
  return NextResponse.json({ data: shipments })
} 