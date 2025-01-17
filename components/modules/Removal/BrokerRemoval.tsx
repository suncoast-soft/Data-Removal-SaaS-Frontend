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

export default function BrokerRemoval({
  searches
}: {
  searches: Array<Search>
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
        {searches.map((search: Search) => (
          <TableRow key={search.id}>
            <TableCell className="font-medium">
              {search.brokers?.name ?? ''}
            </TableCell>
            <TableCell>{search.removal_status}</TableCell>
            <TableCell>{search.removal_note}</TableCell>
            <TableCell className="text-right">
              {formatDate(search.created_at ?? '', 'MM/dd/yyy p')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
