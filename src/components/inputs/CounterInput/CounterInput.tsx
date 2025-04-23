import clsx from 'clsx'
import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/utils'

import { CounterInputProps } from './CounterInput.types'
import { InputWrapper } from '../InputWrapper'

const CounterInputButton = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={cn(
        'cursor-pointer rounded border px-4 py-1 transition-colors focus:ring focus:outline-0',
        'border-neutral-300 bg-neutral-50 text-black hover:bg-neutral-200 focus:ring-neutral-500',
        'dark:border-neutral-800 dark:bg-neutral-950/40 dark:hover:bg-neutral-800 dark:focus:ring-neutral-300',
        className
      )}
      {...props}
    />
  )
}

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
      <div className={cn('flex text-white', className)}>
        <CounterInputButton onClick={handleDecrementClick}>-</CounterInputButton>
        <input
          {...field}
          {...props}
          type="number"
          className={clsx(
            'h-fit w-12 border-0 bg-transparent text-center ring-0 focus:outline-0',
            'text-black',
            'dark:text-white'
          )}
          id={id}
        />
        <CounterInputButton onClick={handleIncrementClick}>+</CounterInputButton>
      </div>
    </InputWrapper>
  )
}
