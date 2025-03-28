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
  } = useController({ name, control, shouldUnregister, defaultValue: '#eeeeee' })

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <input
        {...field}
        {...props}
        className={cn(
          'block h-10 w-16 cursor-pointer rounded-lg border border-neutral-800 bg-neutral-950/40 p-1 text-white transition-colors focus:ring focus:ring-neutral-300 focus:outline-0',
          className
        )}
        type="color"
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
