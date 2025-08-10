'use client'

import { useState } from 'react'
import { Search, Filter, Download, Eye, Edit, Trash2, Package, Truck, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { mockOrders } from '../../lib/mock-data'
import { exportToCSV, exportToXLSX, exportToPDF } from '../../lib/export'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const statusOptions = [
    { value: 'all', label: 'All Orders', color: 'text-gray-400' },
    { value: 'pending', label: 'Pending', color: 'text-yellow-400' },
    { value: 'processing', label: 'Processing', color: 'text-blue-400' },
    { value: 'shipped', label: 'Shipped', color: 'text-purple-400' },
    { value: 'delivered', label: 'Delivered', color: 'text-green-400' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-400' }
  ]

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-900 text-yellow-300'
      case 'processing': return 'bg-blue-900 text-blue-300'
      case 'shipped': return 'bg-purple-900 text-purple-300'
      case 'delivered': return 'bg-green-900 text-green-300'
      case 'cancelled': return 'bg-red-900 text-red-300'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />
      case 'processing': return <Package size={16} />
      case 'shipped': return <Truck size={16} />
      case 'delivered': return <CheckCircle size={16} />
      case 'cancelled': return <AlertTriangle size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Order Management</h1>
          <p className="text-lg text-gray-400">Track and manage all supply chain orders</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => exportToCSV('orders.csv', filteredOrders)} className="btn btn-secondary">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          <button onClick={() => exportToXLSX('orders.xlsx', filteredOrders)} className="btn btn-primary">
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
          <button onClick={() => exportToPDF('orders.pdf', filteredOrders)} className="btn btn-outline">
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
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="metric-number">{mockOrders.length}</p>
            </div>
            <div className="icon-container bg-blue-600">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="metric-number">{mockOrders.filter(o => o.status === 'pending').length}</p>
            </div>
            <div className="icon-container bg-yellow-600">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">In Transit</p>
              <p className="metric-number">{mockOrders.filter(o => o.status === 'shipped').length}</p>
            </div>
            <div className="icon-container bg-purple-600">
              <Truck size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Delivered</p>
              <p className="metric-number">{mockOrders.filter(o => o.status === 'delivered').length}</p>
            </div>
            <div className="icon-container bg-green-600">
              <CheckCircle size={24} className="text-white" />
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
              placeholder="Search orders by ID, customer, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 input"
            />
          </div>
          <div className="flex gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  statusFilter === option.value
                    ? 'bg-[#ffe400] text-black'
                    : 'bg-[#404040] text-gray-300 hover:bg-[#505050]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Order ID</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Location</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#404040] hover:bg-[#404040] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-[#ffe400]">{order.id}</span>
                  </td>
                  <td className="py-4 px-6 text-white">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-300">{order.location}</td>
                  <td className="py-4 px-6 text-white font-semibold">${order.amount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#404040]">
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 hover:bg-[#505050] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-[#ffe400] text-black'
                      : 'bg-[#404040] text-gray-300 hover:bg-[#505050]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 hover:bg-[#505050] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 