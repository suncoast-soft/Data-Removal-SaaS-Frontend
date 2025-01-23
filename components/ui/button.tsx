import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-semibold leading-none ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-dark hover:bg-secondary/90 dark:bg-slate-50 dark:text-primary dark:hover:bg-slate-50/90',
        secondary:
          'bg-primary text-dark hover:bg-primary/80 dark:bg-primary dark:text-slate-50 dark:hover:bg-primary/80',
        destructive:
          'bg-dark text-primary hover:bg-dark dark:bg-dark dark:primary dark:hover:bg-dark',
        outline: 'text-dark border-dark border hover:bg-dark hover:text-white',
        ghost:
          'hover:bg-slate-100 hover:text-primary dark:hover:bg-primary dark:hover:text-slate-50',
        link: 'text-primary underline-offset-4 hover:underline dark:text-slate-50'
      },
      size: {
        default: 'w-fit h-fit rounded-full px-8 py-5',
        small: 'w-fit h-fit px-5 py-3 font-normal text-sm rounded-full',
        icon: 'h-9 w-9 rounded-full flex justify-center items-center p-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
