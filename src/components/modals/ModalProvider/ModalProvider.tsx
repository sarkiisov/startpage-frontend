import { createSafeContext } from '@/utils'
import { Modal } from '../Modal'
import { ModalContext, ModalPayload } from './ModalProvider.types'
import { useCallback, useState } from 'react'

const [ModalContextProvider, useModalContext] = createSafeContext<ModalContext>(
  'ModalProvider component was not found in the tree'
)

const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<ModalPayload | null>(null)

  const openModal = useCallback((props: ModalPayload) => {
    setState(props)
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setState((state) => ({ ...state, open }))
  }, [])

  const closeModal = () => handleOpenChange(false)

  return (
    <ModalContextProvider value={{ openModal, closeModal }}>
      <Modal open={Boolean(state)} onOpenChange={handleOpenChange} {...state} />
      {children}
    </ModalContextProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { useModalContext, ModalProvider }
