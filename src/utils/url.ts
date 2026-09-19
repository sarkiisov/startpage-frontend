export const getDomainName = (url: string) => {
  const { hostname } = new URL(url)

  const ignoreParts = ['www']

  return hostname
    .split('.')
    .slice(0, -1)
    .filter((str) => !ignoreParts.includes(str))
    .join(' ')
}
