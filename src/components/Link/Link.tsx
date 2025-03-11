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
            className="flex justify-center items-center w-full bg-(--color)"
          >
            <span className="text-white text-3xl font-medium">{title[0].toUpperCase()}</span>
          </div>
        )
    }
  }, [icon, title])

  return (
    <div className={cn('relative cursor-pointer', className)} {...props}>
      <a className="content-none absolute inset-0" href={href} />
      <div className="flex w-full justify-center aspect-square rounded-md shadow-sm overflow-hidden">
        {iconComponent}
      </div>
      <div className="mt-2 text-xs font-medium text-center truncate line-clamp-2">{title}</div>
    </div>
  )
}
