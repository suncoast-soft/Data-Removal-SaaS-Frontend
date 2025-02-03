import SectionHeader from '@/components/modules/SectionHeader'

export default function Inbox() {
  return (
    <div className="container mx-auto pt-0 px-0">
      <SectionHeader title="Inbox" />

      <div className="min-h-40 flex items-center justify-center">
        <h4 className="text-dark text-xl">Your Inbox is empty</h4>
      </div>
    </div>
  )
}
