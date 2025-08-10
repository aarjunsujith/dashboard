export const mockInventoryData = [
  {
    category: 'Electronics',
    current: 2400,
    target: 3000,
  },
  {
    category: 'Clothing',
    current: 1800,
    target: 2000,
  },
  {
    category: 'Home & Garden',
    current: 3200,
    target: 2800,
  },
  {
    category: 'Sports',
    current: 1600,
    target: 2200,
  },
  {
    category: 'Books',
    current: 950,
    target: 1000,
  },
  {
    category: 'Automotive',
    current: 2100,
    target: 1800,
  },
]

export const mockSupplierPerformance = [
  {
    month: 'Jan',
    onTime: 85,
    quality: 92,
  },
  {
    month: 'Feb',
    onTime: 88,
    quality: 94,
  },
  {
    month: 'Mar',
    onTime: 92,
    quality: 91,
  },
  {
    month: 'Apr',
    onTime: 89,
    quality: 93,
  },
  {
    month: 'May',
    onTime: 94,
    quality: 95,
  },
  {
    month: 'Jun',
    onTime: 91,
    quality: 96,
  },
]

export const mockOrderStatus = [
  { name: 'Completed', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Pending', value: 7 },
  { name: 'Cancelled', value: 3 },
]

export const mockCostAnalysis = [
  {
    month: 'Jan',
    cost: 245000,
  },
  {
    month: 'Feb',
    cost: 267000,
  },
  {
    month: 'Mar',
    cost: 285000,
  },
  {
    month: 'Apr',
    cost: 298000,
  },
  {
    month: 'May',
    cost: 312000,
  },
  {
    month: 'Jun',
    cost: 285420,
  },
]

export type Order = {
  id: string
  customer: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  eta: string
  value: number
  amount: number
  date: string
  location: string
}

export const mockOrders: Order[] = [
  { id: 'SO-1001', customer: 'Acme Inc.', status: 'shipped', eta: '2024-06-18', value: 15420, amount: 15420, date: '2024-06-15', location: 'Newark, NJ' },
  { id: 'SO-1002', customer: 'Globex', status: 'pending', eta: '2024-06-20', value: 8420, amount: 8420, date: '2024-06-16', location: 'Dallas, TX' },
  { id: 'SO-1003', customer: 'Umbrella', status: 'delivered', eta: '2024-06-12', value: 23310, amount: 23310, date: '2024-06-10', location: 'Los Angeles, CA' },
  { id: 'SO-1004', customer: 'Soylent', status: 'processing', eta: '2024-06-19', value: 12600, amount: 12600, date: '2024-06-14', location: 'Chicago, IL' },
  { id: 'SO-1005', customer: 'Stark Ltd', status: 'cancelled', eta: '2024-06-13', value: 4150, amount: 4150, date: '2024-06-11', location: 'Boston, MA' },
  { id: 'SO-1006', customer: 'Wayne Corp', status: 'delivered', eta: '2024-06-10', value: 19500, amount: 19500, date: '2024-06-08', location: 'Denver, CO' },
  { id: 'SO-1007', customer: 'TechCorp', status: 'pending', eta: '2024-06-22', value: 18750, amount: 18750, date: '2024-06-17', location: 'Seattle, WA' },
  { id: 'SO-1008', customer: 'InnovateLab', status: 'shipped', eta: '2024-06-21', value: 9200, amount: 9200, date: '2024-06-15', location: 'Austin, TX' },
  { id: 'SO-1009', customer: 'FutureTech', status: 'processing', eta: '2024-06-25', value: 15600, amount: 15600, date: '2024-06-18', location: 'Miami, FL' },
  { id: 'SO-1010', customer: 'DataFlow', status: 'delivered', eta: '2024-06-14', value: 11200, amount: 11200, date: '2024-06-12', location: 'Phoenix, AZ' },
  { id: 'SO-1011', customer: 'CloudNine', status: 'pending', eta: '2024-06-24', value: 8900, amount: 8900, date: '2024-06-19', location: 'Portland, OR' },
  { id: 'SO-1012', customer: 'QuantumSoft', status: 'shipped', eta: '2024-06-23', value: 13400, amount: 13400, date: '2024-06-16', location: 'Atlanta, GA' },
]

export type InventoryItem = {
  sku: string
  product: string
  category: string
  onHand: number
  reorderPoint: number
  location: string
}

export const mockInventoryItems: InventoryItem[] = [
  { sku: 'ELEC-001', product: '4K Monitor', category: 'Electronics', onHand: 120, reorderPoint: 80, location: 'WH-East' },
  { sku: 'CLOT-002', product: 'Performance Tee', category: 'Clothing', onHand: 520, reorderPoint: 400, location: 'WH-West' },
  { sku: 'HOME-003', product: 'Smart Lamp', category: 'Home & Garden', onHand: 70, reorderPoint: 120, location: 'WH-Central' },
  { sku: 'AUTO-004', product: 'Car Mount', category: 'Automotive', onHand: 310, reorderPoint: 200, location: 'WH-East' },
]
