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

const renderValue = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    return (
      <ul className="pl-4 list-none">
        {Object.entries(value).map(([nestedKey, nestedValue]) => (
          <li key={nestedKey}>
            <strong>{nestedKey}:</strong> {renderValue(nestedValue)}
          </li>
        ))}
      </ul>
    )
  }
  return String(value)
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
        {searches
          .filter((search) => search.search_status === 'completed')
          .map((search: Search) => (
            <TableRow key={search.id}>
              <TableCell className="font-medium text-primary">
                {search.brokers?.name ?? ''}
              </TableCell>
              <TableCell>
                <ul>
                  {Object.entries(search.search_result ?? {})
                    .filter(([key, value]) => value)
                    .map(([key, value]) => (
                      <li key={key} className="list-none">
                        <strong>{key}:</strong> {renderValue(value)}
                      </li>
                    ))}
                </ul>
              </TableCell>
              <TableCell>
                {formatDate(
                  search.updated_at || search.created_at,
                  'MM/dd/yyy p'
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
