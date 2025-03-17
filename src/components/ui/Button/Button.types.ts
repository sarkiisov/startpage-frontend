export type ButtonVariant = 'primary' | 'secondary' | 'destructive'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}
