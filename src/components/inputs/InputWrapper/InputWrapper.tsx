import { cn } from '@/utils'

import { InputWrapperProps } from './InputWrapper.types'

export const InputWrapper = ({
  id,
  label,
  withAsterisk,
  error,
  children,
  ...props
}: InputWrapperProps) => {
  return (
    <div {...props}>
      <label
        className={cn('mb-1 flex gap-0.5 text-sm', 'text-black', 'dark:text-white')}
        htmlFor={id}
      >
        {label}
        {withAsterisk && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
