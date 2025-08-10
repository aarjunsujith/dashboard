import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function GET(req: Request) {
  const cookieHeader = (req.headers.get('cookie') || '')
  const token = cookieHeader.split(';').map((x) => x.trim()).find((x) => x.startsWith('token='))?.split('=')[1]
  if (!token) return NextResponse.json({ user: null }, { status: 200 })
  try {
    const payload = jwt.verify(token, SECRET) as any
    return NextResponse.json({ user: { email: payload.sub, role: payload.role } })
  } catch {
    return NextResponse.json({ user: null }, { status: 200 })
  }
} 