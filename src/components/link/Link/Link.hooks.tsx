import { Link } from '@/types'
import { cn, getColorVariant, hexToRgb } from '@/utils'

export const useLinkIconComponent = ({ icon, title }: Pick<Link, 'title' | 'icon'>) => {
  if (icon.type === 'FAVICON') {
    return <img className="h-full w-full" src={icon.src} />
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
