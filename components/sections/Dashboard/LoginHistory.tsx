import { format } from 'date-fns'

interface LoginHistoryProps {
  loginHistory: any[]
}

export default function LoginHistory({ loginHistory }: LoginHistoryProps) {
  return (
    <div className="mt-16 mb-20">
      <h2 className="text-xl font-semibold mb-4">Login History</h2>
      <div className="bg-card rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Device</th>
              <th className="px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((login, index) => (
              <tr key={login.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                <td className="px-4 py-2">
                  {format(new Date(login.created_at), 'MMM d, yyyy')}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(login.created_at), 'h:mm a')}
                </td>
                <td className="px-4 py-2 capitalize">{login.device_type}</td>
                <td className="px-4 py-2">
                  {login.location?.city && login.location?.region
                    ? `${login.location.city}, ${login.location.region}`
                    : 'Unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 