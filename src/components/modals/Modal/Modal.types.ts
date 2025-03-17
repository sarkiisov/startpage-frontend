export type ModalProps = {
  open: boolean
  onOpenChange?: (opened: boolean) => void
  title?: string
  children?: React.ReactNode
}
