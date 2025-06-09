import { useState, useEffect, useCallback } from 'react'

import { getFaviconUrlWithCache, preloadFavicon, refreshFavicon } from '../utils/favicon'

interface UseFaviconResult {
  faviconUrl: string
  isLoading: boolean
  hasError: boolean
  retry: () => void
}

/**
 * Hook to manage favicon loading with caching, error handling, and retry logic
 */
export const useFavicon = (url: string): UseFaviconResult => {
  const [faviconUrl, setFaviconUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const loadFavicon = useCallback(async (targetUrl: string, isRetry = false) => {
    if (!targetUrl || !targetUrl.trim()) {
      setFaviconUrl('')
      setIsLoading(false)
      setHasError(false)
      return
    }

    setIsLoading(true)
    setHasError(false)

    try {
      // get favicon url (with caching)
      const favicon = isRetry 
        ? await refreshFavicon(targetUrl) 
        : await getFaviconUrlWithCache(targetUrl)
      
      // preload the image to ensure it loads properly
      const loaded = await preloadFavicon(favicon)
      
      if (loaded) {
        setFaviconUrl(favicon)
        setHasError(false)
      } else {
        // if preload failed, try refreshing the cache
        const refreshedFavicon = await refreshFavicon(targetUrl)
        setFaviconUrl(refreshedFavicon)
        setHasError(false)
      }
    } catch (error) {
      console.warn('favicon loading failed:', error)
      setHasError(true)
      // still set a fallback favicon
      const fallbackFavicon = await getFaviconUrlWithCache(targetUrl)
      setFaviconUrl(fallbackFavicon)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const retry = useCallback(() => {
    loadFavicon(url, true)
  }, [url, loadFavicon])

  useEffect(() => {
    loadFavicon(url)
  }, [url, loadFavicon])

  return {
    faviconUrl,
    isLoading,
    hasError,
    retry
  }
}
