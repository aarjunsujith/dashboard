'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Package, TrendingUp, AlertTriangle, Clock, DollarSign, Truck, Boxes, Download, Zap, Target, TrendingDown, ArrowUpRight } from 'lucide-react'
import { mockInventoryData, mockSupplierPerformance, mockOrderStatus, mockCostAnalysis, mockOrders } from '../lib/mock-data'
import { exportToCSV, exportToXLSX, exportToPDF } from '../lib/export'

export default function Dashboard() {
  const COLORS = ['#ffe400', '#10b981', '#f59e0b', '#ef4444']

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color, bgColor }: any) => (
    <div className="metric-card group">
      <div className="flex items-center justify-between mb-6">
        <div className={`icon-container ${bgColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-2 text-sm font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="metric-number mb-2">{value}</p>
        <p className="metric-label mb-1">{title}</p>
        <p className="metric-subtitle">{subtitle}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={20} className="text-gray-400" />
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Supply Chain Overview</h1>
          <p className="text-lg text-gray-400">Real-time monitoring of your supply operations</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => exportToCSV('orders.csv', mockOrders)} className="btn btn-secondary">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          <button onClick={() => exportToXLSX('orders.xlsx', mockOrders)} className="btn btn-primary">
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
          <button onClick={() => exportToPDF('orders.pdf', mockOrders)} className="btn btn-outline">
            <Download size={18} className="mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MetricCard
          title="Total Inventory"
          value="12,458"
          subtitle="units across all locations"
          icon={Boxes}
          trend={5.2}
          color="text-blue-400"
          bgColor="bg-blue-600"
        />
        <MetricCard
          title="On-Time Delivery"
          value="96.2%"
          subtitle="7-day performance"
          icon={Truck}
          trend={2.1}
          color="text-green-400"
          bgColor="bg-green-600"
        />
        <MetricCard
          title="Open Alerts"
          value="7"
          subtitle="stockouts, delays, quality"
          icon={AlertTriangle}
          trend={-12}
          color="text-yellow-400"
          bgColor="bg-yellow-600"
        />
        <MetricCard
          title="Monthly Spend"
          value="$285,420"
          subtitle="procurement + logistics"
          icon={DollarSign}
          trend={8.5}
          color="text-purple-400"
          bgColor="bg-purple-600"
        />
        <MetricCard
          title="Live Shipments"
          value="23"
          subtitle="currently in transit"
          icon={Zap}
          trend={0}
          color="text-indigo-400"
          bgColor="bg-indigo-600"
        />
        <MetricCard
          title="Performance Score"
          value="94.8%"
          subtitle="overall efficiency"
          icon={Target}
          trend={1.3}
          color="text-emerald-400"
          bgColor="bg-emerald-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-blue-600">
                <Target size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Inventory by Category</h3>
                <p className="text-gray-400">Current vs target levels</p>
              </div>
            </div>
            <span className="tag">Live Data</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockInventoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
                <Bar dataKey="current" fill="#ffe400" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" fill="#1a1a1a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-green-600">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Supplier Performance</h3>
                <p className="text-gray-400">Quality and on-time metrics</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-900 text-green-300 rounded-full text-sm font-semibold">Trending</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSupplierPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
                <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }} />
                <Line type="monotone" dataKey="quality" stroke="#ffe400" strokeWidth={4} dot={{ fill: '#ffe400', strokeWidth: 3, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-purple-600">
                <Package size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Order Status</h3>
                <p className="text-gray-400">Distribution overview</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-purple-900 text-purple-300 rounded-full text-sm font-semibold">Updated</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockOrderStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  dataKey="value"
                >
                  {mockOrderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-yellow-600">
                <DollarSign size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Cost Analysis</h3>
                <p className="text-gray-400">Monthly expenditure trends</p>
              </div>
            </div>
            <span className="tag">+8.5%</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCostAnalysis}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Cost']}
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '12px',
                    color: '#ffffff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
                <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={4} dot={{ fill: '#f59e0b', strokeWidth: 3, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="icon-container bg-gray-600">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
              <p className="text-gray-400">Latest updates from your supply chain</p>
            </div>
          </div>
          <span className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-semibold">Last 24h</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[#404040] rounded-xl hover:shadow-lg transition-all duration-300 bg-[#2d2d2d]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-green-300" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">Shipment Delivered</p>
                <p className="text-sm text-gray-400">Order #12345 completed</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
          <div className="p-6 border border-[#404040] rounded-xl hover:shadow-lg transition-all duration-300 bg-[#2d2d2d]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-yellow-900 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} className="text-yellow-300" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">Delay Reported</p>
                <p className="text-sm text-gray-400">Supplier notified of issue</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">4 hours ago</p>
          </div>
          <div className="p-6 border border-[#404040] rounded-xl hover:shadow-lg transition-all duration-300 bg-[#2d2d2d]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
                <Package size={20} className="text-blue-300" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-white">Low Stock Alert</p>
                <p className="text-sm text-gray-400">Item #789 needs reorder</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">6 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
