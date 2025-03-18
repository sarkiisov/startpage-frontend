import { Link } from '@/types'
import { Dispatch } from 'react'

export type LinkContext = {
  links: Link[]
  setLinks: Dispatch<Link[]>
  requestAddLink: VoidFunction
  requestEditLink: (link: Link) => void
  requestDeleteLink: (link: Link) => void
}
