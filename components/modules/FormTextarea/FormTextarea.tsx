import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/cn'
import { Pencil } from 'lucide-react'

interface ModuleProps {
  control: any
  name: string
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  theme?: 'dark' | 'white'
}

export default function FormTextarea({
  control,
  name,
  label,
  placeholder,
  required,
  className,
  theme = 'white'
}: ModuleProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          <FormLabel
            className={cn(
              'font-semibold text-lg',
              theme === 'white' ? 'text-white' : 'text-dark'
            )}
          >
            <span>{label}</span>
            {required && <span className="text-secondary p-1">*</span>}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <div className="absolute left-4 top-7 transform -translate-y-1/2">
                <Pencil className="w-5 text-primary" />
              </div>

              <Textarea
                placeholder={placeholder || label}
                {...field}
                className={cn(
                  'bg-transparent px-10 py-3',
                  theme === 'white'
                    ? 'text-white [&::placeholder]:text-white/60'
                    : 'text-dark [&::placeholder]:text-dark/60 border-dark/60 bg-white'
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
