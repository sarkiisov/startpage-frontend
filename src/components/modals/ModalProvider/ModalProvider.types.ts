import { ModalProps } from '../Modal'

export type ModalPayload = Pick<ModalProps, 'title' | 'children'>

export type ModalContext = {
  openModal: (payload: ModalPayload) => void
  closeModal: VoidFunction
}
