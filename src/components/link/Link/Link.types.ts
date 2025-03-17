import { Link } from '@/types'
import { HTMLAttributes } from 'react'

export type LinkProps = HTMLAttributes<HTMLDivElement> & Omit<Link, 'id'>
