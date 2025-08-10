import { NextResponse } from 'next/server'
import { mockOrders } from '../../../lib/mock-data'
import { parse } from 'csv-parse/sync'
import * as XLSX from 'xlsx'

export async function GET() {
  // TODO: Replace with DB fetch
  return NextResponse.json({ data: mockOrders })
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const body = await req.json()
      return NextResponse.json({ received: body }, { status: 201 })
    }

    const buffer = Buffer.from(await req.arrayBuffer())

    if (contentType.includes('text/csv')) {
      const records = parse(buffer.toString('utf-8'), { columns: true, skip_empty_lines: true })
      return NextResponse.json({ received: records }, { status: 201 })
    }

    if (
      contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      contentType.includes('application/vnd.ms-excel')
    ) {
      const wb = XLSX.read(buffer, { type: 'buffer' })
      const first = wb.SheetNames[0]
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[first])
      return NextResponse.json({ received: rows }, { status: 201 })
    }

    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to parse' }, { status: 400 })
  }
} 