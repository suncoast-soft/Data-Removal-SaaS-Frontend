'use client'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Link from 'next/link'

interface GoogleSearchResult {
  link: string
  htmlTitle: string
  htmlSnippet: string
  displayLink: string
  htmlFormattedUrl: string
}

export default function GoogleReport({
  results
}: {
  results: Array<GoogleSearchResult>
}) {
  console.log(results)
  return (
    <Table className="mt-8">
      <TableBody>
        {results.map((search: GoogleSearchResult, index) => (
          <TableRow key={index}>
            <TableCell>
              <p className="font-semibold text-slate-600">
                {search.displayLink}
              </p>
              <Link href={search.link} className="no-underline mb-2">
                <p
                  dangerouslySetInnerHTML={{ __html: search.htmlTitle }}
                  className="text-primary font-semibold text-lg"
                />
                <p
                  dangerouslySetInnerHTML={{ __html: search.htmlFormattedUrl }}
                  className="text-primary text-sm underline"
                />
              </Link>
              <p dangerouslySetInnerHTML={{ __html: search.htmlSnippet }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
