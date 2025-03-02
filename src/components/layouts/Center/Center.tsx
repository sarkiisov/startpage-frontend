import { HTMLAttributes } from 'react'
import './Center.styles.css'
import clsx from 'clsx'

export const Center = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('center', className)} {...props} />
}
