import { LinkProps } from './Link.types'
import { cn } from '@/utils'
import { useLinkIconComponent } from './Link.hooks'

export const Link = ({ href, icon, title, className, ...props }: LinkProps) => {
  const iconComponent = useLinkIconComponent({ icon, title })

  return (
    <div className={cn('relative cursor-pointer', className)} {...props}>
      <a className="absolute inset-0 content-none" href={href} />
      <div className="flex aspect-square w-full justify-center overflow-hidden rounded-md shadow-sm">
        {iconComponent}
      </div>
      <div className="mt-2 line-clamp-1 text-center text-xs font-medium text-white">{title}</div>
    </div>
  )
}
