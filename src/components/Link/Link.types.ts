export type LinkIcon =
  | { type: 'FAVICON'; imageSrc: string }
  | { type: 'PLACEHOLDER'; color: string }

export type LinkProps = {
  href: string
  icon: LinkIcon
  title: string
}
