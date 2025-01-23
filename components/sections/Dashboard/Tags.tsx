import { Badge } from '@/components/ui/badge'
import React from 'react'

interface Tag {
  label: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

interface TagsProps {
  tags: Tag[]
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag, index) => (
        <Badge key={index} variant={tag.variant}>
          {tag.label}
        </Badge>
      ))}
    </div>
  )
}
