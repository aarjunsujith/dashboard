'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('new@nsc.com')
  const [password, setPassword] = useState('password')
  const [role, setRole] = useState<'Admin'|'Manager'|'Operator'>('Operator')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password, role }) })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error || 'Signup failed')
      setLoading(false)
      return
    }
    router.replace('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="card card-shadow w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-slate-400">Start using Nova Supply</p>
        </div>
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input className="mt-1 w-full rounded-lg bg-transparent border border-[rgb(var(--border))] px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input type="password" className="mt-1 w-full rounded-lg bg-transparent border border-[rgb(var(--border))] px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Role</span>
          <select className="mt-1 w-full rounded-lg bg-transparent border border-[rgb(var(--border))] px-3 py-2" value={role} onChange={(e) => setRole(e.target.value as any)}>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Operator">Operator</option>
          </select>
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 disabled:opacity-60">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
    </div>
  )
} 