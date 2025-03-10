import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from './TextInput.types'
import './TextInput.styles.css'
import { InputWrapper } from '../InputWrapper'
import { useId } from 'react'

export const TextInput = ({ name, shouldUnregister, readOnly, ...props }: TextInputProps) => {
  const { control, formState } = useFormContext()

  const id = useId()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: '' })

  return (
    <InputWrapper id={id} error={error?.message} {...props}>
      <input
        {...field}
        {...props}
        className="text-input"
        readOnly={formState.isSubmitting || readOnly}
        id={id}
      />
    </InputWrapper>
  )
}
