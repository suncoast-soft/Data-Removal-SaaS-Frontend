import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

interface SectionProps {
  results: any[]
}

export default function RemovalResult({ results }: SectionProps) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-dark/20 bg-dark/5">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-dark h-14">
            <TableHead className="text-white font-bold text-sm lg:text-base rounded-tl-2xl">
              Google ({results.length})
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
          {results.map((item, index) => (
            <TableRow
              key={index}
              className={index === results.length - 1 ? '[&>td]:pb-0' : ''}
            >
              <TableCell className="font-medium">
                <div>
                  <p className="font-semibold text-dark/80">
                    {item.displayLink}
                  </p>
                  <Link href={item.link} className="no-underline mb-2">
                    <p
                      dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
                      className="text-primary font-semibold text-lg"
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.htmlFormattedUrl
                      }}
                      className="text-primary text-sm underline"
                    />
                  </Link>
                  <p dangerouslySetInnerHTML={{ __html: item.htmlSnippet }} />
                </div>
              </TableCell>

              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-dark bg-primary rounded-full">
                  Social Media
                </span>
              </TableCell>

              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-white bg-blue-500 rounded-full">
                  Pending
                </span>
              </TableCell>

              <TableCell className="font-medium">
                <span className="block min-w-[91px] px-2 py-1 text-center text-xs font-semibold text-white bg-dark rounded-full">
                  6 Days
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end py-3">
        <Button
          variant="link"
          className="flex items-center gap-2 text-dark font-bold hover:underline"
        >
          More Items <ChevronDownIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
