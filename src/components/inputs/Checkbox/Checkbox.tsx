import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/utils'

import { CheckboxProps } from './Checkbox.types'

export const Checkbox = ({
  label,
  name,
  shouldUnregister,
  className,
  readOnly,
  ...props
}: CheckboxProps) => {
  const { control, formState } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: false })

  return (
    <div>
      <div className="flex gap-3">
        <input
          {...field}
          {...props}
          checked={field.value}
          className={cn(
            'h-6 w-6 rounded border transition-colors focus:ring focus:ring-offset-0 focus:outline-0',
            'border-neutral-300 bg-white text-black focus:ring-neutral-800',
            'dark:border-neutral-800 dark:bg-neutral-950/40 dark:focus:ring-neutral-300',
            className
          )}
          type="checkbox"
          readOnly={formState.isSubmitting || readOnly}
          id={id}
        />
        <label htmlFor={id} className={cn('text-sm', 'text-black', 'dark:text-white')}>
          {label}
        </label>
      </div>
      {error?.message && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}
