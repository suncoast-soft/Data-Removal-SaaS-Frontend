import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-2 h-6 w-[50%]" />
      <Skeleton className="mb-2 h-6 w-[75%]" />
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-2 h-6 w-[25%]" />
      <Skeleton className="mb-2 h-6 w-[80%]" />
      <Skeleton className="mb-2 h-6 w-full" />
    </>
  )
}
