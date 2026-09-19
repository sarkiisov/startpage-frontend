import { useCallback, useEffect, useState } from 'react'

import { hasFaviconPermissions, requestFaviconPermissions } from '@/utils'

import { getFavicons } from './LinkForm.utils'

export const useFindManyFavicons = (href: string, { enabled }: { enabled: boolean }) => {
  const [data, setData] = useState<string[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [hasPermission, setHasPermission] = useState<boolean>()

  const faviconsHandler = useCallback(async () => {
    try {
      setData(undefined)
      setIsLoading(true)
      setIsSuccess(false)
      setError(undefined)

      await getFavicons(href).then(setData)

      setIsSuccess(true)
    } catch (error) {
      setError((error as unknown as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [href])

  useEffect(() => {
    if (!enabled) return

    hasFaviconPermissions().then((granted) => {
      setHasPermission(granted)

      if (granted) faviconsHandler()
    })
  }, [enabled, faviconsHandler, href])

  const requestPermission = useCallback(async () => {
    const granted = await requestFaviconPermissions()

    setHasPermission(granted)

    if (granted) faviconsHandler()
  }, [faviconsHandler])

  return {
    data,
    isLoading,
    isSuccess,
    error,
    hasPermission,
    requestPermission
  }
}
