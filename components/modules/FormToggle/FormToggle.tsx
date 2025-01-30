import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
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
}

export default function FormToggle({
  control,
  name,
  label,
  options,
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
            <ToggleGroup
              type="single"
              className="justify-start gap-4"
              value={field.value}
              onValueChange={field.onChange}
            >
              {options.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  aria-label={option.label}
                  className="border-2 h-[46px] w-[46px] border-white data-[state=on]:bg-white data-[state=on]:text-dark"
                >
                  <span className="font-bold text-xl">{option.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
