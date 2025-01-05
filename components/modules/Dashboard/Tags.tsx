import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function Tags({ tags }: any) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((t: any) => (
        <Badge variant={t.variant}>{t.label}</Badge>
      ))}
    </div>
  )
}
