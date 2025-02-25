import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { format } from 'date-fns'
import { Laptop, Smartphone } from 'lucide-react'

interface LoginHistoryProps {
  loginHistory: any[]
}

export default function LoginHistoryTable({ loginHistory }: LoginHistoryProps) {
  return (
    <div className="mt-6 mb-8 rounded-2xl border border-dark/20 bg-[#342E3705] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-dark h-14 hover:bg-primary group">
            <TableHead className="font-bold text-sm lg:text-base rounded-tl-2xl text-white group-hover:text-dark">
              Date
            </TableHead>
            <TableHead className="font-bold text-sm lg:text-base text-white group-hover:text-dark">
              Time
            </TableHead>
            <TableHead className="font-bold text-sm lg:text-base text-white group-hover:text-dark">
              Device
            </TableHead>
            <TableHead className="font-bold text-sm lg:text-base rounded-tr-2xl text-white group-hover:text-dark">
              Location
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loginHistory.map((login) => (
            <TableRow key={login.id} className="h-16">
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {format(new Date(login.created_at), 'MMM d, yyyy')}
                </p>
              </TableCell>
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {format(new Date(login.created_at), 'h:mm a')}
                </p>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {login.device_type === 'mobile' ? (
                    <Smartphone className="w-4 h-4" />
                  ) : (
                    <Laptop className="w-4 h-4" />
                  )}
                  <p className="text-xs lg:text-lg font-semibold capitalize">
                    {login.device_type}
                  </p>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <p className="text-xs lg:text-lg font-semibold">
                  {login.location?.city && login.location?.region
                    ? `${login.location.city}, ${login.location.region}`
                    : 'Unknown'}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
