export type LinkIcon = { type: 'FAVICON'; url: string } | { type: 'PLACEHOLDER'; color: string }

export type LinkType = LinkIcon['type']

export type LinkProps = {
  href: string
  icon: LinkIcon
  title: string
}
