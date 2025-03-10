import { InputWrapperProps } from './InputWrapper.types'
import './InputWrapper.styles.css'

export const InputWrapper = ({
  id,
  label,
  withAsterisk,
  error,
  children,
  ...props
}: InputWrapperProps) => {
  return (
    <div className="input-wrapper" {...props}>
      <label className="input-wrapper__label" htmlFor={id}>
        {label}
        {withAsterisk && <span className="input-wrapper__asterisk">*</span>}
      </label>
      {children}
      {error && <span className="input-wrapper__error">{error}</span>}
    </div>
  )
}
