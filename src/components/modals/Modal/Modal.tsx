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

import X from '@/assets/icons/X.svg?react'
import { cn } from '@/utils'

import { ModalProps } from './Modal.types'

export const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  const { refs, context } = useFloating({ open, onOpenChange })

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

  const { getFloatingProps } = useInteractions([dismiss])

  const headingId = useId()

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 300,
    initial: { opacity: 0, transform: 'translateY(8px)' },
    open: { opacity: 1, transform: 'translateY(0)' },
    close: { opacity: 0, transform: 'translateY(8px)' }
  })

  return (
    <FloatingPortal>
      {isMounted && (
        <FloatingOverlay className="grid place-items-center" lockScroll style={styles}>
          <FloatingFocusManager context={context}>
            <div
              className={cn(
                'w-md rounded-md border p-4',
                'border-neutral-200 bg-neutral-50 shadow-black/10',
                'dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/30'
              )}
              style={{ boxShadow: '0px 8px 16px 2px var(--tw-shadow-color)' }}
              ref={refs.setFloating}
              aria-labelledby={headingId}
              {...getFloatingProps()}
            >
              <div className="mb-4 flex justify-between">
                <h2
                  id={headingId}
                  className={cn('font-medium', 'text-neutral-950', 'dark:text-white')}
                >
                  {title}
                </h2>
                <button
                  tabIndex={-1}
                  onClick={() => onOpenChange?.(false)}
                  className={cn(
                    'cursor-pointer transition-colors',
                    'text-neutral-400 hover:text-neutral-500',
                    'dark:text-neutral-600 dark:hover:text-neutral-300'
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}
