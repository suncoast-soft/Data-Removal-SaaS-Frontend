import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface ModuleProps {
  control: any
  type?: 'text' | 'email' | 'number'
  name: string
  label: string
  placeholder?: string
  icon?: ReactNode
  required?: boolean
  className?: string
}

export default function FormInput({
  control,
  type = 'text',
  name,
  label,
  placeholder,
  icon,
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
            <div className="relative">
              {icon && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  {icon}
                </div>
              )}
              <Input
                type={type}
                placeholder={placeholder || label}
                {...field}
                className={cn(
                  'bg-transparent text-white [&::placeholder]:text-white/60 py-3'
                )}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
