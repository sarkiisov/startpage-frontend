import { getSettings } from '@/components/app'
import { fileToDataURI } from '@/utils'
import invariant from 'tiny-invariant'

const isValidHTTPUrl = (str: string) => {
  let url

  try {
    url = new URL(str)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const getFavicons = async (url: string): Promise<string[]> => {
  invariant(isValidHTTPUrl(url), 'URL is not valid')

  const { backendUrl } = getSettings()

  const iconIds = (await fetch(`${backendUrl}/favicons?url=${url}`).then((response) =>
    response.json()
  )) as number[]

  const iconURLs = await Promise.all(
    iconIds.map((iconId) =>
      fetch(`${backendUrl}/files/${iconId}`)
        .then((response) => response.blob())
        .then((blob) => fileToDataURI(blob))
    )
  )

  return iconURLs
}
