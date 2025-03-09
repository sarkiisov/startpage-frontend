export type LinkIcon =
  | { type: 'FAVICON'; imageSrc: string }
  | { type: 'PLACEHOLDER'; color: string }

export type Link = {
  url: string
  icon: LinkIcon
  title: string
}
