import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Download } from 'lucide-react'
import InvoiceIcon from '@/components/icons/InvoiceIcon'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BillingHistoryProps {
  billings: {
    name: string
    date: string
    amount: string
    status: string | undefined
    plan: string | null
    invoice_pdf: string | null | undefined
  }[]
}

export default function BillingHistory({ billings }: BillingHistoryProps) {
  return (
    <div className="rounded-2xl border border-dark/20 overflow-x-auto mb-20">
      <Table>
        <TableHeader>
          <TableRow className="bg-dark hover:bg-dark/90">
            {['Invoice Number', 'Billing Date', 'Amount', 'Plan', ''].map(
              (thead, index) => (
                <TableHead
                  key={index}
                  className="text-white font-bold text-sm lg:text-lg"
                >
                  {thead}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {billings.map((billing, index) => (
            <TableRow
              key={index}
              className="text-sm lg:text-lg font-medium text-dark"
            >
              {[
                <>
                  <div className="flex gap-3 items-center">
                    <InvoiceIcon />

                    <span>{billing.name}</span>

                    <span
                      className={cn(
                        'rounded-xl text-xs font-bold px-4 py-0.5',
                        billing.status?.toLowerCase() === 'paid'
                          ? 'bg-primary text-dark'
                          : 'bg-secondary text-dark'
                      )}
                    >
                      {billing.status}
                    </span>
                  </div>
                </>,
                billing.date,
                billing.amount,
                billing.plan,
                <>
                  <Button
                    variant="destructive"
                    size="small"
                    className="px-3 py-1.5 font-bold"
                    asChild
                  >
                    <Link href={`${billing.invoice_pdf}`} target="_blank">
                      <Download className="w-4 h-4 mr-1" />
                      <span>Download</span>
                    </Link>
                  </Button>
                </>
              ].map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
