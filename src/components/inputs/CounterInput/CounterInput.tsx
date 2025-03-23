import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { CounterInputProps } from './CounterInput.types'
import { InputWrapper } from '../InputWrapper'
import { cn } from '@/utils'

export const CounterInput = ({
  label,
  withAsterisk,
  name,
  shouldUnregister,
  className,
  ...props
}: CounterInputProps) => {
  const { control, setValue } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: '' })

  const handleDecrementClick = () => {
    const { value } = field

    const parsedValue = parseInt(value)
    if (isNaN(parsedValue)) return

    setValue(name, parsedValue - 1, { shouldDirty: true, shouldValidate: true })
  }

  const handleIncrementClick = () => {
    const { value } = field

    const parsedValue = parseInt(value)
    if (isNaN(parsedValue)) return

    setValue(name, parsedValue + 1, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <div className={cn('flex gap-3 text-white', className)}>
        <button
          onClick={handleDecrementClick}
          type="button"
          className="rounded border border-neutral-700 px-4 py-1 hover:bg-neutral-800"
        >
          -
        </button>
        <input
          {...field}
          {...props}
          type="number"
          className="appeare w-8 appearance-none text-center focus:outline-0"
          id={id}
        />
        <button
          onClick={handleIncrementClick}
          type="button"
          className="rounded border border-neutral-700 px-4 py-1 hover:bg-neutral-800"
        >
          +
        </button>
      </div>
    </InputWrapper>
  )
}
