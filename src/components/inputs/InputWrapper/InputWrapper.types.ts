export type InputWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  label?: string
  withAsterisk?: boolean
  error?: string
}
