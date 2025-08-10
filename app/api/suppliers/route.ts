import { NextResponse } from 'next/server'

const suppliers = [
  { id: 'SUP-001', name: 'ABC Corp', onTime: 0.93, leadTimeDays: 5.2 },
  { id: 'SUP-002', name: 'Globex', onTime: 0.88, leadTimeDays: 6.1 },
  { id: 'SUP-003', name: 'Wayne Logistics', onTime: 0.96, leadTimeDays: 4.7 },
]

export async function GET() {
  return NextResponse.json({ data: suppliers })
} 