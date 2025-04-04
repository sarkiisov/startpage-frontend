import { cn } from '@/utils'

import { useLinkIconComponent } from './Link.hooks'
import { LinkProps } from './Link.types'

export const Link = ({ href, icon, title, className, ...props }: LinkProps) => {
  const iconComponent = useLinkIconComponent({ icon, title })

  return (
    <div className={cn('relative cursor-pointer', className)} {...props}>
      <a className="absolute inset-0 content-none" href={href} />
      <div className="px-2 pt-2">
        <div className="flex aspect-square w-full justify-center overflow-hidden rounded-md shadow-sm">
          {iconComponent}
        </div>
      </div>
      <div className="mt-2 line-clamp-1 inline-block w-full text-center text-xs font-medium text-ellipsis whitespace-nowrap text-white">
        {title}
      </div>
    </div>
  )
}
