'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tables } from '@/types_db'
import { formatDate } from 'date-fns'

interface Search extends Tables<'searches'> {
  brokers: Tables<'brokers'> | null
}

export default function BrokerSearches({
  searches
}: {
  searches: Array<Search>
}) {
  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Broker</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {searches.map((search: Search) => (
          <TableRow key={search.id}>
            <TableCell className="font-medium">
              {search.brokers?.name ?? ''}
            </TableCell>
            <TableCell>
              <ul>
                {Object.entries(search.search_result ?? {})
                  .filter(([key, value]) => value)
                  .map(([key, value]) => (
                    <li key={key} className="list-none">
                      <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
              </ul>
            </TableCell>
            <TableCell>
              {formatDate(search.updated_at ?? '', 'MM/dd/yyy p')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
