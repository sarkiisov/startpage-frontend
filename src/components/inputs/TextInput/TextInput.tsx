import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/utils'

import { TextInputProps } from './TextInput.types'
import { InputWrapper } from '../InputWrapper'

export const TextInput = ({
  label,
  withAsterisk,
  name,
  shouldUnregister,
  className,
  readOnly,
  ...props
}: TextInputProps) => {
  const { control, formState } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: '' })

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <input
        {...field}
        {...props}
        className={cn(
          'block w-full rounded-lg border p-2 text-white transition-colors focus:outline-0',
          'border-neutral-300 bg-neutral-50 text-black focus:ring-neutral-500',
          'dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-white dark:focus:ring-neutral-300',
          className
        )}
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
