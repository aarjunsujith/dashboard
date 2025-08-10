'use client'

import { useState } from 'react'
import { Search, Download, Plus, AlertTriangle, Package, TrendingUp, TrendingDown } from 'lucide-react'
import { mockInventoryItems } from '../../lib/mock-data'
import { exportToCSV, exportToXLSX, exportToPDF } from '../../lib/export'

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof typeof mockInventoryItems[0]>('sku')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (field: keyof typeof mockInventoryItems[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredItems = mockInventoryItems.filter(item =>
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage)

  const lowStockItems = mockInventoryItems.filter(item => item.onHand <= item.reorderPoint)
  const totalValue = mockInventoryItems.reduce((sum, item) => sum + (item.onHand * 100), 0) // Assuming $100 average value per item

  const getStockStatus = (onHand: number, reorderPoint: number) => {
    if (onHand === 0) return { status: 'Out of Stock', color: 'bg-red-900 text-red-300', icon: <AlertTriangle size={16} /> }
    if (onHand <= reorderPoint) return { status: 'Low Stock', color: 'bg-yellow-900 text-yellow-300', icon: <AlertTriangle size={16} /> }
    if (onHand <= reorderPoint * 1.5) return { status: 'Medium Stock', color: 'bg-blue-900 text-blue-300', icon: <Package size={16} /> }
    return { status: 'In Stock', color: 'bg-green-900 text-green-300', icon: <TrendingUp size={16} /> }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Inventory Management</h1>
          <p className="text-lg text-gray-400">Monitor and manage your supply chain inventory</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <Plus size={18} className="mr-2" />
            Add Item
          </button>
          <button onClick={() => exportToCSV('inventory.csv', filteredItems)} className="btn btn-secondary">
            <Download size={18} className="mr-2" />
            Export CSV
          </button>
          <button onClick={() => exportToXLSX('inventory.xlsx', filteredItems)} className="btn btn-primary">
            <Download size={18} className="mr-2" />
            Export Excel
          </button>
          <button onClick={() => exportToPDF('inventory.pdf', filteredItems)} className="btn btn-outline">
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
              <p className="text-sm text-gray-400">Total Items</p>
              <p className="metric-number">{mockInventoryItems.length}</p>
            </div>
            <div className="icon-container bg-blue-600">
              <Package size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Low Stock Alerts</p>
              <p className="metric-number">{lowStockItems.length}</p>
            </div>
            <div className="icon-container bg-yellow-600">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="metric-number">${totalValue.toLocaleString()}</p>
            </div>
            <div className="icon-container bg-green-600">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Stock Level</p>
              <p className="metric-number">{Math.round(mockInventoryItems.reduce((sum, item) => sum + item.onHand, 0) / mockInventoryItems.length)}</p>
            </div>
            <div className="icon-container bg-purple-600">
              <TrendingDown size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory by SKU, product, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 input"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040]">
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('sku')}
                >
                  <div className="flex items-center gap-2">
                    SKU
                    {sortField === 'sku' && (
                      sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('product')}
                >
                  <div className="flex items-center gap-2">
                    Product
                    {sortField === 'product' && (
                      sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('onHand')}
                >
                  <div className="flex items-center gap-2">
                    On Hand
                    {sortField === 'onHand' && (
                      sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Reorder Point</th>
                <th 
                  className="text-left py-4 px-6 text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition-colors"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center gap-2">
                    Location
                    {sortField === 'location' && (
                      sortDirection === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => {
                const stockStatus = getStockStatus(item.onHand, item.reorderPoint)
                return (
                  <tr key={item.sku} className="border-b border-[#404040] hover:bg-[#404040] transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono text-[#ffe400]">{item.sku}</span>
                    </td>
                    <td className="py-4 px-6 text-white">{item.product}</td>
                    <td className="py-4 px-6 text-gray-300">{item.category}</td>
                    <td className="py-4 px-6 text-white font-semibold">{item.onHand.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-300">{item.reorderPoint.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-300">{item.location}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                        {stockStatus.icon}
                        {stockStatus.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#404040]">
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedItems.length)} of {sortedItems.length} items
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