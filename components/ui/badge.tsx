import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[3px] border font-normal transition-colors focus:outline-none px-[14px] py-[3px] text-xs border-transparent',
  {
    variants: {
      variant: {
        default: 'font-semibold bg-darkMain hover:bg-darkMain/80 text-white',
        secondary: 'bg-gray-100 text-darkMain hover:bg-darkMain/20 font-medium',
        destructive:
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline:
          'text-darkMain line-through border border-darkMain/10 font-medium'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
