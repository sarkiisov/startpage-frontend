import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useDebouncedValue } from '@/hooks'
import { getHostname, hasFaviconPermissions, requestFaviconPermissions } from '@/utils'

import { getFavicons } from './LinkForm.utils'

const FAVICON_FETCH_DEBOUNCE_MS = 500

export const useFindManyFavicons = (href: string, { enabled }: { enabled: boolean }) => {
  const [data, setData] = useState<string[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [hasPermission, setHasPermission] = useState<boolean>()

  const hostname = useMemo(() => getHostname(href), [href])
  const debouncedHostname = useDebouncedValue(hostname, FAVICON_FETCH_DEBOUNCE_MS)

  const hrefRef = useRef(href)
  hrefRef.current = href

  const faviconsHandler = useCallback(async () => {
    try {
      setData(undefined)
      setIsLoading(true)
      setIsSuccess(false)
      setError(undefined)

      await getFavicons(hrefRef.current).then(setData)

      setIsSuccess(true)
    } catch (error) {
      setError((error as unknown as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !debouncedHostname) return

    hasFaviconPermissions().then((granted) => {
      setHasPermission(granted)

      if (granted) faviconsHandler()
    })
  }, [enabled, debouncedHostname, faviconsHandler])

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
