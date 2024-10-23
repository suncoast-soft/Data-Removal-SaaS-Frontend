'use client'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tables } from '@/types_db'
import { formatDate } from 'date-fns'

type Profile = Tables<'profiles'>
type Google = Tables<'google'>

export default function GoogleReport({
  profile,
  searches
}: {
  profile: Profile
  searches: Array<Google>
}) {
  console.log(searches)

  return (
    <Table className="mt-8">
      <TableBody>
        {searches.map((search: Google) => (
          <TableRow key={search.id}>
            <TableCell>
              <ul>
                {Object.entries(search)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => (
                    <li key={key} className="list-none">
                      <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
