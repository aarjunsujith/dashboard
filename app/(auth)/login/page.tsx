'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const [email, setEmail] = useState('demo@nsc.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error || 'Login failed')
      setLoading(false)
      return
    }
    const redirect = sp.get('redirect') || '/'
    router.replace(redirect)
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="card card-shadow w-full max-w-sm space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="text-sm text-slate-400">Access your dashboard</p>
        </div>
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input className="mt-1 w-full rounded-lg bg-transparent border border-[rgb(var(--border))] px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input type="password" className="mt-1 w-full rounded-lg bg-transparent border border-[rgb(var(--border))] px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  )
} 