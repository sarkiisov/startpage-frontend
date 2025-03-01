import { PropsWithChildren, DetailedHTMLProps, MouseEvent } from 'react'

export type ContextMenuProps = PropsWithChildren

export type ContextMenuContentProps = PropsWithChildren

export type ContextMenuItemProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type ContextMenuContext = {
  isOpen: boolean
  openMenu: (event: MouseEvent) => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  refs: { setFloating: (node: HTMLElement | null) => void }
  floatingStyles: React.CSSProperties
  position: { x: number; y: number }
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => any
}
