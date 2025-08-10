'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Star, Clock, TrendingUp, AlertTriangle, Users, Award } from 'lucide-react'
import { exportToCSV, exportToXLSX, exportToPDF } from '../../lib/export'

type Supplier = {
  id: string
  name: string
  category: string
  onTimePerformance: number
  leadTime: number
  qualityScore: number
  totalOrders: number
  status: 'active' | 'inactive' | 'suspended'
  location: string
  rating: number
}

const mockSuppliers: Supplier[] = [
  { id: 'SUP-001', name: 'TechParts Inc.', category: 'Electronics', onTimePerformance: 95, leadTime: 7, qualityScore: 98, totalOrders: 156, status: 'active', location: 'San Jose, CA', rating: 4.8 },
  { id: 'SUP-002', name: 'Global Logistics', category: 'Transportation', onTimePerformance: 88, leadTime: 12, qualityScore: 92, totalOrders: 89, status: 'active', location: 'Chicago, IL', rating: 4.2 },
  { id: 'SUP-003', name: 'Quality Materials', category: 'Raw Materials', onTimePerformance: 92, leadTime: 15, qualityScore: 95, totalOrders: 234, status: 'active', location: 'Houston, TX', rating: 4.6 },
  { id: 'SUP-004', name: 'FastShip Express', category: 'Transportation', onTimePerformance: 85, leadTime: 5, qualityScore: 89, totalOrders: 67, status: 'active', location: 'Miami, FL', rating: 4.0 },
  { id: 'SUP-005', name: 'Premium Components', category: 'Electronics', onTimePerformance: 97, leadTime: 10, qualityScore: 99, totalOrders: 189, status: 'active', location: 'Austin, TX', rating: 4.9 },
  { id: 'SUP-006', name: 'Reliable Supply', category: 'Raw Materials', onTimePerformance: 78, leadTime: 20, qualityScore: 87, totalOrders: 45, status: 'suspended', location: 'Detroit, MI', rating: 3.5 },
  { id: 'SUP-007', name: 'Swift Delivery', category: 'Transportation', onTimePerformance: 91, leadTime: 8, qualityScore: 94, totalOrders: 123, status: 'active', location: 'Seattle, WA', rating: 4.4 },
  { id: 'SUP-008', name: 'Elite Manufacturing', category: 'Manufacturing', onTimePerformance: 89, leadTime: 18, qualityScore: 96, totalOrders: 78, status: 'active', location: 'Portland, OR', rating: 4.3 },
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState<keyof Supplier>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    setSuppliers(mockSuppliers)
  }, [])

  const categories = ['all', ...Array.from(new Set(suppliers.map(s => s.category)))]
  const statuses = ['all', 'active', 'inactive', 'suspended']

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  const handleSort = (field: keyof Supplier) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-900 text-green-300'
      case 'inactive': return 'bg-gray-700 text-gray-300'
      case 'suspended': return 'bg-red-900 text-red-300'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-400'
    if (score >= 85) return 'text-yellow-400'
    return 'text-red-400'
  }

  const averageOnTime = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.onTimePerformance, 0) / suppliers.length : 0
  const averageLeadTime = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.leadTime, 0) / suppliers.length : 0
  const averageQuality = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.qualityScore, 0) / suppliers.length : 0
  const totalSuppliers = suppliers.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Supplier Management</h1>
          <p className="text-lg text-gray-400">Monitor and manage supplier performance and relationships</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => exportToCSV('suppliers.csv', filteredSuppliers)} className="btn btn-secondary">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          <button onClick={() => exportToXLSX('suppliers.xlsx', filteredSuppliers)} className="btn btn-primary">
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
          <button onClick={() => exportToPDF('suppliers.pdf', filteredSuppliers)} className="btn btn-outline">
            <Download size={18} className="mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Suppliers</p>
              <p className="metric-number">{totalSuppliers}</p>
            </div>
            <div className="icon-container bg-blue-600">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg On-Time %</p>
              <p className="metric-number">{averageOnTime.toFixed(1)}%</p>
            </div>
            <div className="icon-container bg-green-600">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Lead Time</p>
              <p className="metric-number">{averageLeadTime.toFixed(1)} days</p>
            </div>
            <div className="icon-container bg-yellow-600">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Quality Score</p>
              <p className="metric-number">{averageQuality.toFixed(1)}%</p>
            </div>
            <div className="icon-container bg-purple-600">
              <Award size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers by name, ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 input"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400]"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Supplier</th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('category')}
                >
                  Category
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('onTimePerformance')}
                >
                  On-Time %
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('leadTime')}
                >
                  Lead Time
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('qualityScore')}
                >
                  Quality
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('totalOrders')}
                >
                  Orders
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-[#404040] hover:bg-[#404040] transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-white">{supplier.name}</p>
                      <p className="text-sm text-gray-400 font-mono">{supplier.id}</p>
                      <p className="text-xs text-gray-500">{supplier.location}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{supplier.category}</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${getPerformanceColor(supplier.onTimePerformance)}`}>
                      {supplier.onTimePerformance}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white">{supplier.leadTime} days</td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold ${getPerformanceColor(supplier.qualityScore)}`}>
                      {supplier.qualityScore}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white font-semibold">{supplier.totalOrders.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(supplier.status)}`}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[#ffe400] fill-current" />
                      <span className="text-white font-semibold">{supplier.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 