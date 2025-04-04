import { useId, useMemo } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn } from '@/utils'

import { SelectObjectOption, SelectProps } from './Select.types'
import { InputWrapper } from '../InputWrapper'


export const Select = ({
  label,
  withAsterisk,
  name,
  shouldUnregister,
  options: _options,
  className,
  ...props
}: SelectProps) => {
  const { control } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  const options = useMemo<SelectObjectOption[]>(() => {
    return _options.map((option) =>
      typeof option === 'string'
        ? { value: option, label: option }
        : (option as unknown as SelectObjectOption)
    )
  }, [_options])

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      <select
        {...field}
        {...props}
        className={cn(
          'block w-full appearance-none rounded-lg border border-neutral-800 bg-neutral-950/40 p-2 pe-9 text-white outline-0 focus:ring-neutral-300 focus:outline-0',
          className
        )}
        id={id}
      >
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </InputWrapper>
  )
}
