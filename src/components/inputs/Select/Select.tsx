import { useId, useMemo } from 'react'
import { SelectObjectOption, SelectProps } from './Select.types'
import { useController, useFormContext } from 'react-hook-form'
import { InputWrapper } from '../InputWrapper'
import { cn } from '@/utils'

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
          'appearance-none p-2.5 pe-9 block w-full border border-gray-200 rounded-lg',
          className
        )}
        id={id}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.35355 4.06066C8.15829 3.8654 7.84171 3.8654 7.64645 4.06066L5.35355 6.35355C5.15829 6.54882 4.84171 6.54882 4.64645 6.35355C4.45118 6.15829 4.45118 5.84171 4.64645 5.64645L6.93934 3.35356C7.52513 2.76777 8.47487 2.76777 9.06066 3.35355L11.3536 5.64645C11.5488 5.84171 11.5488 6.15829 11.3536 6.35355C11.1583 6.54882 10.8417 6.54882 10.6464 6.35355L8.35355 4.06066Z' fill='%236b7280'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.35355 11.9393C8.15829 12.1346 7.84171 12.1346 7.64645 11.9393L5.35355 9.64645C5.15829 9.45119 4.84171 9.45119 4.64645 9.64645C4.45118 9.84171 4.45118 10.1583 4.64645 10.3536L6.93934 12.6464C7.52513 13.2322 8.47487 13.2322 9.06066 12.6464L11.3536 10.3536C11.5488 10.1583 11.5488 9.84171 11.3536 9.64645C11.1583 9.45119 10.8417 9.45119 10.6464 9.64645L8.35355 11.9393Z' fill='%236b7280'/%3E%3C/svg%3E%0A")`,
          backgroundSize: '1.25em 1.25em',
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat'
        }}
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
