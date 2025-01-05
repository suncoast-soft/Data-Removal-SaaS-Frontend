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

export default function BillingHistoryTable({ data }: any) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-darkMain/20 bg-[#342E3705] overflow-x-auto max-w-[calc(100vw-32px)]">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-darkMain hover:bg-transparent h-[60px]">
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-base text-white rounded-tl-2xl lg:min-w-[331px]"></TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-base text-white ">
              Billing Date
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-base text-white ">
              Amount
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-base text-white ">
              Plan
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white">
              Users
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white"></TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white rounded-tr-2xl"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item: any) => (
            <TableRow className="h-[84px]">
              <TableCell className=" font-medium text-darkMain">
                <div className="flex items-center gap-3">
                  <Checkbox id="invoice-no" />
                  <InvoiceIcon />
                  <p className="text-xs lg:text-lg font-semibold">
                    {item.name}
                  </p>
                  <div
                    className={cn(
                      'min-w-[60px] bg-greenMain rounded-full text-darkMain flex items-center justify-center px-4 py-1 capitalize',
                      item.status !== 'paid' ? 'bg-orangeMain' : ''
                    )}
                  >
                    {item.status}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">{item.date}</p>
              </TableCell>
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {item.amount}
                </p>
              </TableCell>

              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">Basic Plan</p>
              </TableCell>

              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {item.user} user
                </p>
              </TableCell>
              <TableCell className="font-medium ">
                <a href={item.invoice_pdf} className="no-underline">
                  <span className="px-1 py-[5.5px] max-w-fit min-w-[91px] text-center bg-darkMain rounded-full text-[11px] font-semibold lg:px-[10.5px] leading-[17px] lg:text-xs text-white flex gap-1 items-center cursor-pointer hover:bg-darkMain/90">
                    <Download className="w-[16px] h-[16px]" /> Download
                  </span>
                </a>
              </TableCell>
              <TableCell className="font-medium ">
                <span className="w-[28px] h-[28px] rounded-full text-darkMain border-[1.4px] flex items-center justify-center cursor-pointer hover:bg-darkMain hover:text-white transition">
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
