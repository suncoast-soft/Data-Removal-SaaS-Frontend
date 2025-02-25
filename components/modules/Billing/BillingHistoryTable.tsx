import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Download, Ellipsis } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import InvoiceIcon from '@/components/icons/InvoiceIcon'
import { cn } from '@/utils/cn'

interface BillingHistoryTableProps {
  data: {
    name: string
    status: string | null
    date: string
    amount: string
    user: number
    invoice_pdf: string | null | undefined
  }[]
}

export default function BillingHistoryTable({
  data
}: BillingHistoryTableProps) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-dark/20 bg-[#342E3705] overflow-x-auto">
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-dark text-white h-14">
            <TableHead className="font-bold text-sm lg:text-base rounded-tl-2xl"></TableHead>
            <TableHead className="font-bold text-sm lg:text-base">
              Billing Date
            </TableHead>
            <TableHead className="font-bold text-sm lg:text-base">
              Amount
            </TableHead>
            <TableHead className="font-bold text-sm lg:text-base">
              Plan
            </TableHead>
            <TableHead className="font-medium text-sm lg:text-base">
              Users
            </TableHead>
            <TableHead className="font-medium text-sm lg:text-base"></TableHead>
            <TableHead className="font-medium text-sm lg:text-base rounded-tr-2xl"></TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="h-20">
              {/* Invoice Name and Status */}
              <TableCell className="font-medium text-dark">
                <div className="flex items-center gap-3">
                  <Checkbox id={`invoice-${index}`} />
                  <InvoiceIcon />
                  <p className="text-xs lg:text-lg font-semibold">
                    {item.name}
                  </p>
                  <div
                    className={cn(
                      'min-w-[60px] px-4 py-1 rounded-full text-sm text-center capitalize',
                      item.status === 'paid'
                        ? 'bg-primary text-dark'
                        : 'bg-secondary text-dark'
                    )}
                  >
                    {item.status}
                  </div>
                </div>
              </TableCell>

              {/* Billing Date */}
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">{item.date}</p>
              </TableCell>

              {/* Amount */}
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {item.amount}
                </p>
              </TableCell>

              {/* Plan */}
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">Basic Plan</p>
              </TableCell>

              {/* Users */}
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {item.user} user
                </p>
              </TableCell>

              {/* Download Link */}
              <TableCell>
                <a href={item.invoice_pdf ?? '/'}>
                  <span className="px-2 py-1 text-xs lg:text-sm font-semibold bg-dark text-white rounded-full flex items-center gap-1 cursor-pointer hover:bg-dark/90">
                    <Download className="w-4 h-4" /> Download
                  </span>
                </a>
              </TableCell>

              {/* Options */}
              <TableCell>
                <span className="w-7 h-7 rounded-full border border-dark text-dark flex items-center justify-center cursor-pointer hover:bg-dark hover:text-white transition">
                  <Ellipsis className="w-5 h-5" />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
