/**
 * Utility functions for fetching favicons with caching and fallback strategies
 */

interface CachedFavicon {
  url: string
  timestamp: number
  faviconUrl: string
}

interface FaviconRetryOptions {
  maxRetries: number
  retryDelay: number
  timeout: number
}

const FAVICON_CACHE_KEY = 'startpage_favicon_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const DEFAULT_RETRY_OPTIONS: FaviconRetryOptions = {
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 5000
}

// fallback placeholder icon as data url (simple gray circle)
const FALLBACK_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiM5Q0E3QjciLz4KPHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeD0iMzIiIHk9IjMyIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+'

/**
 * Get cached favicon data from localStorage
 */
const getFaviconCache = (): Record<string, CachedFavicon> => {
  try {
    const cached = localStorage.getItem(FAVICON_CACHE_KEY)
    return cached ? JSON.parse(cached) : {}
  } catch {
    return {}
  }
}

/**
 * Save favicon to cache
 */
const cacheFavicon = (url: string, faviconUrl: string): void => {
  try {
    const cache = getFaviconCache()
    cache[url] = {
      url,
      timestamp: Date.now(),
      faviconUrl
    }
    localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore cache errors
  }
}

/**
 * Get cached favicon if still valid
 */
const getCachedFavicon = (url: string): string | null => {
  try {
    const cache = getFaviconCache()
    const cached = cache[url]
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.faviconUrl
    }
    
    // remove expired cache entry
    if (cached) {
      delete cache[url]
      localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(cache))
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Test if a favicon URL loads successfully with timeout
 */
const testFaviconUrl = async (url: string, timeout: number = 5000): Promise<boolean> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    await fetch(url, { 
      method: 'HEAD', 
      mode: 'no-cors',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    return true // no-cors mode doesn't give us response.ok, so assume success if no error
  } catch {
    return false
  }
}

/**
 * Get favicon URL with retry logic
 */
const getFaviconWithRetry = async (
  url: string, 
  options: FaviconRetryOptions = DEFAULT_RETRY_OPTIONS
): Promise<string> => {
  const faviconUrl = getFaviconUrl(url)
  
  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      const isWorking = await testFaviconUrl(faviconUrl, options.timeout)
      if (isWorking) {
        return faviconUrl
      }
    } catch {
      // continue to next attempt
    }
    
    if (attempt < options.maxRetries) {
      await sleep(options.retryDelay * Math.pow(2, attempt)) // exponential backoff
    }
  }
  
  // all retries failed, return fallback
  return FALLBACK_ICON
}

/**
 * Get basic favicon URL using Google's service
 */
export const getFaviconUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`
  } catch {
    return FALLBACK_ICON
  }
}

/**
 * Get favicon URL with caching and fallback strategies
 */
export const getFaviconUrlWithCache = async (url: string): Promise<string> => {
  if (!url || !url.trim()) {
    return FALLBACK_ICON
  }
  
  try {
    // check cache first
    const cached = getCachedFavicon(url)
    if (cached) {
      return cached
    }
    
    // try to get favicon with retry logic
    const faviconUrl = await getFaviconWithRetry(url)
    
    // cache the result (even if it's the fallback)
    cacheFavicon(url, faviconUrl)
    
    return faviconUrl
  } catch {
    return FALLBACK_ICON
  }
}

/**
 * Preload favicon image to ensure it loads properly
 */
export const preloadFavicon = (faviconUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!faviconUrl || faviconUrl === FALLBACK_ICON) {
      resolve(true)
      return
    }
    
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = faviconUrl
    
    // timeout after 10 seconds
    setTimeout(() => resolve(false), 10000)
  })
}

/**
 * Refresh favicon cache for a specific URL
 */
export const refreshFavicon = async (url: string): Promise<string> => {
  try {
    // remove from cache
    const cache = getFaviconCache()
    delete cache[url]
    localStorage.setItem(FAVICON_CACHE_KEY, JSON.stringify(cache))
    
    // get fresh favicon
    return await getFaviconUrlWithCache(url)
  } catch {
    return FALLBACK_ICON
  }
}

/**
 * Clear all favicon cache
 */
export const clearFaviconCache = (): void => {
  try {
    localStorage.removeItem(FAVICON_CACHE_KEY)
  } catch {
    // ignore errors
  }
}

/**
 * Get multiple favicon URLs (legacy function for compatibility)
 */
export const getMultipleFaviconUrls = (url: string): string[] => {
  const primaryUrl = getFaviconUrl(url)
  return primaryUrl ? [primaryUrl] : [FALLBACK_ICON]
}

/**
 * Find working favicon (legacy function, now uses cache)
 */
export const findWorkingFavicon = async (url: string): Promise<string> => {
  return await getFaviconUrlWithCache(url)
}
