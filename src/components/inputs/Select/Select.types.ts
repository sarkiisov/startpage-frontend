import { InputProps } from '../types'

export type SelectObjectOption = { label: string; value: string; disabled?: boolean }

export type SelectOption = string | SelectObjectOption

export type SelectProps = InputProps &
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    options: SelectOption[]
  }
