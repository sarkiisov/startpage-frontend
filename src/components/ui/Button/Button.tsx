import { cn } from '@/utils'

import { ButtonProps } from './Button.types'

export const Button = ({ variant = 'primary', className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'min-w-20 cursor-pointer rounded-md px-4 py-2 transition-colors',
        {
          primary: 'bg-white text-black hover:bg-neutral-300',
          secondary: 'border border-neutral-700 bg-transparent text-white hover:bg-neutral-800',
          destructive: 'bg-red-500 text-white hover:bg-red-600'
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
