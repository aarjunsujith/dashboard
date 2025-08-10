import { NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = LoginSchema.parse(json)

    const token = jwt.sign({ sub: parsed.email, role: 'Manager' }, SECRET, { expiresIn: '7d' })

    const res = NextResponse.json({ ok: true, user: { email: parsed.email, role: 'Manager' } })
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Invalid credentials' }, { status: 400 })
  }
} 