import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['Admin', 'Manager', 'Operator']).default('Operator'),
})

const SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = SignupSchema.parse(json)

    const hashed = await bcrypt.hash(parsed.password, 10)
    const token = jwt.sign({ sub: parsed.email, role: parsed.role }, SECRET, { expiresIn: '7d' })

    const res = NextResponse.json({ ok: true, user: { email: parsed.email, role: parsed.role, passwordHash: hashed } }, { status: 201 })
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  } catch (err: any) {
    const message = err?.message || 'Invalid payload'
    return NextResponse.json({ error: message }, { status: 400 })
  }
} 