'use client'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface GoogleSearchResult {
  link: string
}

export default function GoogleReport({
  results
}: {
  results: Array<GoogleSearchResult>
}) {
  return (
    <Table className="mt-8">
      <TableBody>
        {results.map((search: GoogleSearchResult, index) => (
          <TableRow key={index}>
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
