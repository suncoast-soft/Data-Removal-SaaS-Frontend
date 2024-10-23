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

type Profile = Tables<'profiles'>

interface Search extends Tables<'search'> {
  brokers: Tables<'brokers'> | null
}

export default function Analytics({
  profiles,
  searches
}: {
  profiles: Array<Profile>
  searches: Array<Search>
}) {
  console.log(searches)
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
          .filter((search) => search.status === 'completed')
          .map((search: Search) => (
            <TableRow key={search.id}>
              <TableCell className="font-medium">
                {search.brokers?.name ?? ''}
              </TableCell>
              <TableCell>
                <ul>
                  {Object.entries(search.result ?? {})
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
