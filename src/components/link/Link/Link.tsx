import { useMemo } from 'react'
import { LinkProps } from './Link.types'
import { cn } from '@/utils'

export const Link = ({ href, icon, title, className, ...props }: LinkProps) => {
  const iconComponent = useMemo(() => {
    switch (icon.type) {
      case 'FAVICON':
        return <img src={icon.src} />
      case 'PLACEHOLDER':
        return (
          <div
            style={{ '--color': icon.color } as React.CSSProperties}
            className="flex w-full items-center justify-center bg-(--color)"
          >
            <span className="text-3xl font-medium text-white">{title[0].toUpperCase()}</span>
          </div>
        )
    }
  }, [icon, title])

  return (
    <div className={cn('relative cursor-pointer', className)} {...props}>
      <a className="absolute inset-0 content-none" href={href} />
      <div className="flex aspect-square w-full justify-center overflow-hidden rounded-md shadow-sm">
        {iconComponent}
      </div>
      <div className="mt-2 line-clamp-2 truncate text-center text-xs font-medium text-white">
        {title}
      </div>
    </div>
  )
}
