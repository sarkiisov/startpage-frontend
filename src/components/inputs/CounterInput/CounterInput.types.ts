import { InputProps } from '../types'

export type CounterInputProps = InputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
