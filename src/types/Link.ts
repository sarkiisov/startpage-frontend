export type LinkIcon = { type: 'FAVICON'; src: string } | { type: 'PLACEHOLDER'; color: string }

export type Link = {
  id: string
  href: string
  icon: LinkIcon
  title: string
}
