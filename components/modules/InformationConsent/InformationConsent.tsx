import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { BlockContent } from '@/sanity.types'
import { InfoIcon } from 'lucide-react'
import SanityRichText from '../SanityRichText'

interface ModuleProps {
  title: string | undefined
  description: BlockContent | undefined
}

export default function InformationConsent({
  title,
  description
}: ModuleProps) {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 mt-4 lg:mt-3 z-10 cursor-pointer">
          <InfoIcon className="w-[18px] h-[18px]" />
          <p className="text-sm font-semibold underline">{title}</p>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-sky text-dark/80 shadow-lg border-2 border-white max-w-2xl max-h-[95vh] overflow-y-auto scrollbar-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2 text-dark underline">
            {title}
          </DialogTitle>
        </DialogHeader>

        <SanityRichText content={description} />
      </DialogContent>
    </Dialog>
  )
}
