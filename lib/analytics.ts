import type { Order, InventoryItem } from './mock-data'

export function calculateOnTimeDelivery(orders: Order[]): number {
  const delivered = orders.filter((o) => o.status === 'Delivered').length
  const total = orders.length || 1
  return Math.round((delivered / total) * 1000) / 10
}

export function calculateInventoryTurnover(items: InventoryItem[], costOfGoodsSold = 1000000): number {
  const avgInventory = items.reduce((sum, i) => sum + i.onHand, 0) / Math.max(1, items.length)
  const turnover = costOfGoodsSold / Math.max(1, avgInventory)
  return Math.round(turnover * 10) / 10
}

export function calculateAverageLeadTime(suppliers: { leadTimeDays: number }[]): number {
  const avg = suppliers.reduce((s, x) => s + x.leadTimeDays, 0) / Math.max(1, suppliers.length)
  return Math.round(avg * 10) / 10
}

// Extremely basic moving-average forecast for demo purposes
export function forecastDemand(history: number[], window = 3): number[] {
  if (history.length < window) return history
  const out: number[] = []
  for (let i = 0; i < history.length; i++) {
    const start = Math.max(0, i - window + 1)
    const slice = history.slice(start, i + 1)
    out.push(Math.round((slice.reduce((a, b) => a + b, 0) / slice.length) * 100) / 100)
  }
  return out
} 