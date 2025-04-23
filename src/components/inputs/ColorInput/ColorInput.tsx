import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/utils'

import { ColorInputProps } from './ColorInput.types'
import { InputWrapper } from '../InputWrapper'

export const ColorInput = ({
  label,
  withAsterisk,
  name,
  shouldUnregister,
  readOnly,
  className,
  ...props
}: ColorInputProps) => {
  const { control, formState } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: '#eeeeee' })

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <input
        {...field}
        {...props}
        className={cn(
          'block h-10 w-16 cursor-pointer rounded-lg border p-1 text-white transition-colors focus:ring focus:outline-0',
          'border-neutral-300 bg-neutral-50 focus:ring-neutral-500',
          'dark:border-neutral-800 dark:bg-neutral-950/40 dark:focus:ring-neutral-300',
          className
        )}
        type="color"
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
