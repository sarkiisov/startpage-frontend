import { InputProps } from '../types'

export type FileInputProps = InputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
