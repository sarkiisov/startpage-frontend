import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from './TextInput.types'
import { InputWrapper } from '../InputWrapper'
import { useId } from 'react'
import { cn } from '@/utils'

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
          'block w-full rounded-lg border border-neutral-700 bg-neutral-950 p-2.5 text-white transition-colors focus:border-neutral-300 focus:outline-0',
          className
        )}
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
