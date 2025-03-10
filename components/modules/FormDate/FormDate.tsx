import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import { displayDate } from '@/utils/helpers'
import { CalendarRange } from 'lucide-react'

interface ModuleProps {
  control: any
  name: string
  label: string
  required?: boolean
  className?: string
}

export default function FormDate({
  control,
  name,
  label,
  required,
  className
}: ModuleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel className="text-white font-semibold text-lg">
            <span>{label}</span>
            {required && <span className="text-secondary p-1">*</span>}
          </FormLabel>

          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <CalendarRange className="w-5 text-primary" />
                  </div>
                  <Button
                    type="button"
                    variant={'outline'}
                    className={cn(
                      'w-full border-white justify-start px-12 py-4 text-white font-light hover:bg-dark hover:text-white',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      displayDate(field.value)
                    ) : (
                      <span className="opacity-60">Select a date</span>
                    )}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  defaultMonth={new Date('1990-01-10')}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-10')
                  }
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
