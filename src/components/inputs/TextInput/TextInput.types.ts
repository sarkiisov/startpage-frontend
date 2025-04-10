import { InputProps } from '../types'

export type TextInputProps = InputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
