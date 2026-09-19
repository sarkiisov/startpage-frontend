import invariant from 'tiny-invariant'

import { getFaviconUrls, urlToDataURI } from '@/utils'

const isValidHTTPUrl = (str: string) => {
  let url

  try {
    url = new URL(str)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

const isFulfilled = <T,>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
  result.status === 'fulfilled'

export const getFavicons = async (url: string): Promise<string[]> => {
  invariant(isValidHTTPUrl(url), 'URL is not valid')

  const iconUrls = (await Promise.allSettled(getFaviconUrls(url)))
    .filter(isFulfilled)
    .map((result) => result.value)

  const dataURIs = (await Promise.allSettled(iconUrls.map(urlToDataURI)))
    .filter(isFulfilled)
    .map((result) => result.value)

  return dataURIs
}
