import { Link } from '@/types'
import { cn, getColorVariant, hexToRgb } from '@/utils'

import { useFavicon } from '../../../hooks'

export const useLinkIconComponent = ({ icon, title, href }: Pick<Link, 'title' | 'icon' | 'href'>) => {
  const { faviconUrl } = useFavicon(href)

  if (icon.type === 'FAVICON') {
    // use cached favicon URL
    return <img className="h-full w-full" src={faviconUrl} alt={`${title} favicon`} />
  }
  if (icon.type === 'PLACEHOLDER') {
    const rgbColor = hexToRgb(icon.color)
    const variant = rgbColor ? getColorVariant(rgbColor) : 'dark'

    return (
      <div
        style={{ '--color': icon.color } as React.CSSProperties}
        className="flex w-full items-center justify-center bg-(--color)"
      >
        <span
          className={cn(
            'text-3xl font-medium',
            {
              light: 'text-neutral-800',
              dark: 'text-white'
            }[variant]
          )}
        >
          {title[0].toUpperCase()}
        </span>
      </div>
    )
  }
}
