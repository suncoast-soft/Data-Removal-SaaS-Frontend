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
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
import { cn } from '@/utils/cn'
import { formatDate } from 'date-fns'

interface Job extends Omit<Tables<'jobs'>, 'broker'> {
  broker: Tables<'brokers'> | null
}

const TreeNode: React.FC<{ data: any; level?: number }> = ({
  data,
  level = 0
}) => {
  if (typeof data !== 'object' || data === null) {
    return <span>{String(data)}</span>
  }

  if (Array.isArray(data)) {
    return (
      <ul className="my-1">
        {data.map((item, index) => (
          <li key={index}>
            <TreeNode data={item} level={level + 1} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="my-1">
      {Object.entries(data).map(([key, value], index) => (
        <li key={index}>
          <strong>{key}</strong>: <TreeNode data={value} level={level + 1} />
        </li>
      ))}
    </ul>
  )
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
          {jobs
            .filter((job) => job.broker?.enable_scraping)
            .map((job: Job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  {job.broker?.name ?? ''}
                </TableCell>
                <TableCell
                  className={cn(
                    job.status === 'completed' ? 'text-primary' : ''
                  )}
                >
                  {job.status}
                </TableCell>
                <TableCell>
                  {formatDate(job.updated_at ?? '', 'PPP p')}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button>View Details</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      {job.result ? (
                        <TreeNode data={job.result} />
                      ) : (
                        <>Search In Progress</>
                      )}
                    </PopoverContent>
                  </Popover>

                  <Button variant="destructive">Request Removal</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {jobs.filter((job) => job.broker?.enable_scraping).length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
