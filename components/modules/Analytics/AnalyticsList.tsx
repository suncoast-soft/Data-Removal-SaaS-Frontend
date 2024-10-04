'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tables } from '@/types_db'
import { formatDate } from 'date-fns'

interface Job extends Omit<Tables<'jobs'>, 'broker'> {
  broker: Tables<'brokers'> | null
}

export default function Analytics({
  createJobsAction,
  jobs
}: {
  createJobsAction: () => void
  jobs: Array<Job>
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className={'bg-sky-50 border-sky-700'}>
        <CardHeader className="relative">
          <CardTitle>Start Free Analytics</CardTitle>
          <CardDescription>Last Updated:</CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={() => createJobsAction()}>Start Analytics</Button>
        </CardContent>
      </Card>

      <Table className="mt-16">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Broker</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job: Job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">
                {job.broker?.name ?? ''}
              </TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{formatDate(job.updated_at ?? '', 'PPP p')}</TableCell>
              <TableCell className="text-right">
                <Button>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{jobs.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
