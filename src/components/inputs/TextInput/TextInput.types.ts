import { InputBaseProps } from '../types'

export type TextInputProps = InputBaseProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
