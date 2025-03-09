import { PropsWithChildren } from 'react'

export type ModalProps = PropsWithChildren<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>
