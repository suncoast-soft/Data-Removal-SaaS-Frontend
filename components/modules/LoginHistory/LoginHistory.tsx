import LoginHistoryTable from './LoginHistoryTable'
import SectionHeader from '@/components/modules/SectionHeader'

interface LoginHistoryProps {
  loginHistory: any[]
}

export default function LoginHistory({ loginHistory }: LoginHistoryProps) {
  return (
    <div className="mt-16 mb-20">
      <SectionHeader title="Login History" />
      <LoginHistoryTable loginHistory={loginHistory} />
    </div>
  )
}
