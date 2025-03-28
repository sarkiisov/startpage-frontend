import { useController, useFormContext } from 'react-hook-form'
import { InputWrapper } from '../InputWrapper'
import { useId } from 'react'
import { CheckboxProps } from './Checkbox.types'
import { cn } from '@/utils'

export const Checkbox = ({
  label,
  withAsterisk,
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
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <input
        {...field}
        {...props}
        checked={field.value}
        className={cn(
          'h-6 w-6 rounded border border-neutral-800 bg-neutral-950/40 transition-colors focus:ring focus:ring-neutral-300 focus:ring-offset-0 focus:outline-0',
          className
        )}
        type="checkbox"
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
