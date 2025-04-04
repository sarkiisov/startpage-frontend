import { Dispatch } from 'react'

import { Link } from '@/types'

export type LinkContext = {
  links: Link[]
  setLinks: Dispatch<Link[]>
  requestAddLink: VoidFunction
  requestEditLink: (link: Link) => void
  requestDeleteLink: (link: Link) => void
}
