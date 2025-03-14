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
      <label className="flex gap-0.5 mb-1 " htmlFor={id}>
        {label}
        {withAsterisk && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
