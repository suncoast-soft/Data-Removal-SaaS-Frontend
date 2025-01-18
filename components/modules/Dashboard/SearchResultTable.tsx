import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ResultItem from '@/components/modules/Dashboard/ResultItem'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface SearchResult {
  name: string
  url: string
  subUrl?: string
  date: string
}

interface SearchResultTableProps {
  data: SearchResult[]
}

export default function SearchResultTable({ data }: SearchResultTableProps) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-dark/20 bg-dark/5">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-dark h-14">
            <TableHead className="text-white font-bold text-sm lg:text-base rounded-tl-2xl">
              Google ({data.length})
            </TableHead>
            <TableHead className="text-white font-medium text-sm lg:text-base">
              Result Type
            </TableHead>
            <TableHead className="text-white font-medium text-sm lg:text-base">
              Status
            </TableHead>
            <TableHead className="text-white font-medium text-sm lg:text-base rounded-tr-2xl">
              Removal Time Estimate
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={index === data.length - 1 ? '[&>td]:pb-0' : ''}
            >
              {/* Item Details */}
              <TableCell className="font-medium">
                <ResultItem item={item} isLast={index === data.length - 1} />
              </TableCell>

              {/* Result Type */}
              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-dark bg-primary rounded-full">
                  Social Media
                </span>
              </TableCell>

              {/* Status */}
              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-white bg-blue rounded-full">
                  Pending
                </span>
              </TableCell>

              {/* Time Estimate */}
              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-white bg-dark rounded-full">
                  6 Days
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Load More Button */}
      <div className="flex justify-end py-3">
        <Button
          variant="link"
          className="flex items-center gap-2 text-dark font-bold hover:underline"
        >
          More Items <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
