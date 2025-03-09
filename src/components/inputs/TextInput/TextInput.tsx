import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from './TextInput.types'

export const TextInput = ({
  name,
  label,
  shouldUnregister,
  readOnly,
  ...props
}: TextInputProps) => {
  const { control, formState } = useFormContext()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: '' })

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input {...field} {...props} readOnly={formState.isSubmitting || readOnly} id={name} />
      <span>{error?.message}</span>
    </div>
  )
}
