'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('px-8 py-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden',
        dropdown_root: 'mx-2',
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-slate-500 rounded-md w-[34px] font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-500 [&:has([aria-selected].day-outside)]:bg-slate-500/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        selected:
          'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
        outside:
          'day-outside text-slate-300 aria-selected:bg-slate-500/50 aria-selected:text-slate-300',
        disabled: 'text-slate-300 opacity-50',
        hidden: 'invisible',
        ...classNames
      }}
      hideNavigation={true}
      captionLayout="dropdown"
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
