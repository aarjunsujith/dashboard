import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Package, BarChart2, Settings, Boxes, ListChecks, Users2, PieChart, Bell, Search, Zap } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nova Supply Dashboard',
  description: 'Supply chain management dashboard',
}

const NavItem = ({ href, icon, label, isActive = false }: { href: string; icon: React.ReactNode; label: string; isActive?: boolean }) => (
  <Link href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
    <div className="w-6 h-6 text-gray-300">
      {icon}
    </div>
    <span className="font-medium">{label}</span>
  </Link>
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen grid grid-cols-[300px_1fr]">
          <aside className="panel">
            <div className="px-8 py-8 border-b border-[#404040] flex items-center gap-4">
              <div className="icon-container bg-[#ffe400]">
                <Package size={24} className="text-black" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">NOVA SUPPLY</p>
                <p className="font-bold text-xl gradient-text">Dashboard</p>
              </div>
            </div>
            <nav className="p-6 space-y-2">
              <NavItem href="/" icon={<BarChart2 size={20} />} label="Dashboard" isActive={true} />
              <NavItem href="/inventory" icon={<Boxes size={20} />} label="Inventory" />
              <NavItem href="/orders" icon={<ListChecks size={20} />} label="Orders" />
              <NavItem href="/suppliers" icon={<Users2 size={20} />} label="Suppliers" />
              <NavItem href="/analytics" icon={<PieChart size={20} />} label="Analytics" />
              <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" />
            </nav>
          </aside>
          <main className="min-h-screen bg-[#1a1a1a]">
            <header className="h-20 panel flex items-center justify-between px-8 sticky top-0 z-10">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input className="w-full pl-12 pr-4 py-3 input" placeholder="Search orders, inventory, suppliers..." />
              </div>
              <div className="flex items-center gap-6">
                <button className="relative p-3 text-gray-300 hover:text-white transition-colors bg-[#2d2d2d] rounded-xl border border-[#404040] hover:shadow-lg">
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#ffe400] rounded-full border-2 border-[#2d2d2d]"></div>
                </button>
                <div className="w-10 h-10 bg-[#ffe400] rounded-xl flex items-center justify-center">
                  <span className="text-sm font-bold text-black">AR</span>
                </div>
              </div>
            </header>
            <div className="p-8 max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
