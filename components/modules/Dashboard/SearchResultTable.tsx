import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatDate } from 'date-fns'
import ResultItem from '@/components/modules/Dashboard/ResultItem'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function SearchResultTable({ data }: any) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-darkMain/20 bg-[#342E3705]">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-darkMain hover:bg-transparent h-[60px]">
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-bold text-sm lg:text-base text-white rounded-tl-2xl">
              Google (17)
            </TableHead>

            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white">
              Result Type
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white">
              Status
            </TableHead>
            <TableHead className="bg-darkMain hover:bg-darkMain h-[60px] font-medium text-sm lg:text-base text-white rounded-tr-2xl">
              Removal Time Estimate
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item: any, i: any) => (
            <TableRow className={i === data.length - 1 ? '[&>td]:pb-0' : ''}>
              <TableCell className="font-medium">
                <ResultItem item={item} isLast={i === data.length - 1} />
              </TableCell>
              <TableCell className="font-medium ">
                <span className="px-1 py-[5.5px] max-w-fit block min-w-[91px] text-center bg-greenMain rounded-full text-[11px] font-semibold lg:px-[10.5px] leading-[17px] lg:text-xs text-darkMain">
                  Social Media
                </span>
              </TableCell>
              <TableCell className="font-medium ">
                <span className="px-1 py-[5.5px] max-w-fit block min-w-[91px] text-center bg-blue rounded-full text-[11px] font-semibold lg:px-[10.5px] leading-[17px] lg:text-xs text-white">
                  Social Media
                </span>
              </TableCell>
              <TableCell className="font-medium">
                <span className="px-1 py-[5.5px] max-w-fit block min-w-[91px] text-center bg-darkMain rounded-full text-[11px] font-semibold lg:px-[10.5px] leading-[17px] lg:text-xs text-white">
                  6 Days
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end pb-3">
        <Button
          variant={'link'}
          className="p-0 hover:no-underline flex font-bold gap-2 text-darkMain px-9 h-fit"
        >
          More Items <ChevronDown className="h-5 w-5 font-bold" />
        </Button>
      </div>
    </div>
  )
}
