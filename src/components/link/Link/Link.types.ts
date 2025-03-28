import { HTMLAttributes } from 'react'
import { Link } from '@/types'

export type LinkProps = HTMLAttributes<HTMLDivElement> & Omit<Link, 'id'>
