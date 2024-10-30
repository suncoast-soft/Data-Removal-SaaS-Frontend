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

interface Removal extends Tables<'removal'> {
  searches: Search
}

export default function BrokerRemoval({
  removals
}: {
  removals: Array<Removal>
}) {
  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Broker</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Last Updated</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {removals.map((removal: Removal) => (
          <TableRow key={removal.id}>
            <TableCell className="font-medium">
              {removal.searches?.brokers?.name ?? ''}
            </TableCell>
            <TableCell>{removal.status}</TableCell>
            <TableCell>{removal.note}</TableCell>
            <TableCell className="text-right">
              {formatDate(removal.created_at ?? '', 'MM/dd/yyy p')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
