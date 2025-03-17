import { useCallback, useEffect, useState } from 'react'
import invariant from 'tiny-invariant'

const convertBlobToDataURL = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = reject

    reader.readAsDataURL(blob)
  })
}

const isValidHTTPUrl = (str: string) => {
  let url

  try {
    url = new URL(str)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

const getFavicons = async (url: string): Promise<string[]> => {
  invariant(isValidHTTPUrl(url), 'URL is not valid')

  const iconIds = (await fetch(`${import.meta.env.VITE_BACKEND_URL}/favicons?url=${url}`).then(
    (response) => response.json()
  )) as number[]

  const iconURLs = await Promise.all(
    iconIds.map((iconId) =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${iconId}`)
        .then((response) => response.blob())
        .then((blob) => convertBlobToDataURL(blob))
    )
  )

  return iconURLs
}

export const useFindManyFavicons = (href: string, { enabled }: { enabled: boolean }) => {
  const [data, setData] = useState<string[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const faviconsHandler = useCallback(async () => {
    try {
      setData(undefined)
      setIsLoading(true)
      setError(undefined)

      await getFavicons(href).then(setData)
    } catch (error) {
      setError((error as unknown as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [href])

  useEffect(() => {
    if (!enabled) return

    faviconsHandler()
  }, [enabled, faviconsHandler, href])

  return {
    data,
    isLoading,
    error
  }
}
