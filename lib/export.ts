import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'

export function exportToCSV<T extends object>(filename: string, rows: T[]) {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  XLSX.writeFile(wb, filename.endsWith('.csv') ? filename : `${filename}.csv`)
}

export function exportToXLSX<T extends object>(filename: string, rows: T[]) {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(rows)
  XLSX.utils.book_append_sheet(wb, ws, 'Report')
  XLSX.writeFile(wb, filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`)
}

export function exportToPDF<T extends object>(filename: string, rows: T[]) {
  const doc = new jsPDF()
  const text = JSON.stringify(rows, null, 2)
  const lines = doc.splitTextToSize(text, 180)
  doc.text(lines, 10, 10)
  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
} 