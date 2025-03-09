import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles
} from '@floating-ui/react'
import { useId } from 'react'
import { ModalProps } from './Modal.types'
import classes from './Modal.module.css'

export const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  const { refs, context } = useFloating({ open, onOpenChange })

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

  const { getFloatingProps } = useInteractions([dismiss])

  const headingId = useId()

  const { isMounted, styles } = useTransitionStyles(context)

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingOverlay className={classes['modal-overlay']} lockScroll style={styles}>
          <FloatingFocusManager context={context}>
            <div
              className={classes.modal}
              ref={refs.setFloating}
              aria-labelledby={headingId}
              {...getFloatingProps()}
            >
              <h2 id={headingId}>Modal title</h2>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}
