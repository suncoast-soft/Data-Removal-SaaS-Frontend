import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-[3px] border font-semibold transition-colors focus:outline-none px-[14px] py-[3px] text-xs border-transparent',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 hover:bg-slate-800 text-white',
        primary: 'bg-primary hover:bg-primary/80 text-dark',
        secondary: 'bg-secondary hover:bg-secondary/80 text-dark',
        destructive: 'bg-blue hover:bg-blue/80 text-white',
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
