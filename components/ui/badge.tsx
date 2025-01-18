import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[3px] border font-normal transition-colors focus:outline-none px-[14px] py-[3px] text-xs border-transparent',
  {
    variants: {
      variant: {
        default: 'font-semibold bg-dark hover:bg-dark/80 text-white',
        secondary: 'bg-gray-100 text-dark hover:bg-dark/20 font-medium',
        destructive:
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-dark line-through border border-dark/10 font-medium'
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
