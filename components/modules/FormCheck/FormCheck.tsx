import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface ModuleProps {
  control: any
  name: string
  label?: ReactNode
  className?: string
  theme?: 'dark' | 'white'
}

export default function FormCheck({
  control,
  name,
  label,
  className,
  theme = 'white'
}: ModuleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <div className="flex gap-2 mt-5">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <Label
              htmlFor="acceptTerms"
              className={cn(
                'text-sm font-light leading-relaxed tracking-wide',
                theme === 'white' ? 'text-white' : 'text-dark'
              )}
            >
              {label}
            </Label>
          </div>

          <FormMessage className="pl-7" />
        </FormItem>
      )}
    />
  )
}
