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
          'block w-full rounded-lg border border-neutral-800 bg-neutral-950/40 p-2 text-white transition-colors focus:ring-neutral-300 focus:outline-0',
          className
        )}
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
