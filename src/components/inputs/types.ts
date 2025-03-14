import { InputWrapperProps } from './InputWrapper'

export type InputProps = InputWrapperProps & {
  name: string
  shouldUnregister?: boolean
}
