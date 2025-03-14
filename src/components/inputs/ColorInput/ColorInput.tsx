import { useController, useFormContext } from 'react-hook-form'
import { ColorInputProps } from './ColorInput.types'
import { useId } from 'react'
import { InputWrapper } from '../InputWrapper'
import { cn } from '@/utils'

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
  } = useController({ name, control, shouldUnregister })

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <input
        {...field}
        {...props}
        className={cn(
          'block w-14 h-10 p-1 border border-gray-200 rounded-lg cursor-pointer',
          className
        )}
        type="color"
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
