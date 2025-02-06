import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/utils/cn'

interface OptionProps {
  label: string
  value: string
}

interface ModuleProps {
  control: any
  name: string
  label: string
  options: OptionProps[]
  required?: boolean
  className?: string
  theme?: 'dark' | 'white'
}

export default function FormToggle({
  control,
  name,
  label,
  options,
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
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-row flex-wrap gap-8"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 min-w-16"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-lg">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
