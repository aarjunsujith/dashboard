'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, Package, Download, Calendar, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import { exportToCSV, exportToXLSX, exportToPDF } from '../../lib/export'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  // Mock analytics data
  const demandHistory = [
    { month: 'Jan', actual: 1200, forecast: 1150 },
    { month: 'Feb', actual: 1350, forecast: 1300 },
    { month: 'Mar', actual: 1100, forecast: 1250 },
    { month: 'Apr', actual: 1400, forecast: 1350 },
    { month: 'May', actual: 1600, forecast: 1500 },
    { month: 'Jun', actual: 1450, forecast: 1550 },
    { month: 'Jul', actual: 1700, forecast: 1600 },
    { month: 'Aug', actual: 1550, forecast: 1650 },
  ]

  const kpiData = [
    { name: 'On-Time Delivery', value: 96.2, target: 95, trend: 2.1, icon: Target, color: 'text-green-400', bgColor: 'bg-green-600' },
    { name: 'Inventory Turnover', value: 8.5, target: 8.0, trend: 0.5, icon: Package, color: 'text-blue-400', bgColor: 'bg-blue-600' },
    { name: 'Average Lead Time', value: 12.3, target: 15, trend: -2.7, icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-600' },
    { name: 'Cost per Order', value: 245, target: 250, trend: -5, icon: DollarSign, color: 'text-purple-400', bgColor: 'bg-purple-600' },
  ]

  const categoryPerformance = [
    { name: 'Electronics', value: 35, color: '#ffe400' },
    { name: 'Clothing', value: 25, color: '#10b981' },
    { name: 'Home & Garden', value: 20, color: '#f59e0b' },
    { name: 'Sports', value: 15, color: '#ef4444' },
    { name: 'Books', value: 5, color: '#8b5cf6' },
  ]

  const monthlyTrends = [
    { month: 'Jan', orders: 1200, revenue: 245000, cost: 180000 },
    { month: 'Feb', orders: 1350, revenue: 267000, cost: 195000 },
    { month: 'Mar', orders: 1100, revenue: 285000, cost: 210000 },
    { month: 'Apr', orders: 1400, revenue: 298000, cost: 225000 },
    { month: 'May', orders: 1600, revenue: 312000, cost: 240000 },
    { month: 'Jun', orders: 1450, revenue: 285420, cost: 220000 },
  ]

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />
  }

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? 'text-green-400' : 'text-red-400'
  }

  const exportAnalyticsData = () => {
    exportToCSV('analytics.csv', demandHistory)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Analytics & Insights</h1>
          <p className="text-lg text-gray-400">Advanced analytics and performance insights for your supply chain</p>
        </div>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button onClick={exportAnalyticsData} className="btn btn-primary">
            <Download size={18} className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-6">
                <div className={`icon-container ${kpi.bgColor}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className={`flex items-center gap-2 text-sm font-semibold ${getTrendColor(kpi.trend)}`}>
                  {getTrendIcon(kpi.trend)}
                  <span>{Math.abs(kpi.trend)}%</span>
                </div>
              </div>
              <div>
                <p className="metric-number mb-2">{kpi.value}{kpi.name.includes('Time') ? ' days' : kpi.name.includes('Cost') ? '$' : kpi.name.includes('Delivery') ? '%' : ''}</p>
                <p className="metric-label mb-1">{kpi.name}</p>
                <p className="metric-subtitle">Target: {kpi.target}{kpi.name.includes('Time') ? ' days' : kpi.name.includes('Cost') ? '$' : kpi.name.includes('Delivery') ? '%' : ''}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demand Forecast */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-blue-600">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Demand Forecast</h3>
                <p className="text-gray-400">Actual vs predicted demand trends</p>
              </div>
            </div>
            <span className="tag">Live Data</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandHistory}>
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
                <Line type="monotone" dataKey="actual" stroke="#ffe400" strokeWidth={4} dot={{ fill: '#ffe400', strokeWidth: 3, r: 6 }} />
                <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-purple-600">
                <PieChartIcon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Category Performance</h3>
                <p className="text-gray-400">Revenue distribution by category</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-purple-900 text-purple-300 rounded-full text-sm font-semibold">Updated</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  dataKey="value"
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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

        {/* Monthly Trends */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-green-600">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Monthly Trends</h3>
                <p className="text-gray-400">Orders, revenue, and cost trends</p>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-900 text-green-300 rounded-full text-sm font-semibold">Trending</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends}>
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
                <Bar dataKey="orders" fill="#ffe400" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="cost" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="icon-container bg-yellow-600">
                <Target size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Performance Insights</h3>
                <p className="text-gray-400">Key insights and recommendations</p>
              </div>
            </div>
            <span className="tag">AI Generated</span>
          </div>
          <div className="space-y-6">
            <div className="p-4 border border-[#404040] rounded-xl bg-[#2d2d2d]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <h4 className="font-semibold text-white">Strong Performance</h4>
              </div>
              <p className="text-gray-300 text-sm">On-time delivery rate improved by 2.1% this month, exceeding target by 1.2%</p>
            </div>
            <div className="p-4 border border-[#404040] rounded-xl bg-[#2d2d2d]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h4 className="font-semibold text-white">Attention Needed</h4>
              </div>
              <p className="text-gray-300 text-sm">Electronics category showing 15% higher demand than forecast - consider increasing inventory</p>
            </div>
            <div className="p-4 border border-[#404040] rounded-xl bg-[#2d2d2d]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <h4 className="font-semibold text-white">Optimization Opportunity</h4>
              </div>
              <p className="text-gray-300 text-sm">Lead time reduced by 2.7 days - consider negotiating better terms with suppliers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 