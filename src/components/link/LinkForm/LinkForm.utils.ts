import { getFaviconUrlWithCache } from '../../../utils/favicon'

export const normalizeUrl = (url: string): string => {
  const trimmedUrl = url.trim()
  
  // If URL is empty, return as-is
  if (!trimmedUrl) {
    return trimmedUrl
  }
  
  // If URL already has a protocol, return as-is
  if (trimmedUrl.includes('://')) {
    return trimmedUrl
  }
  
  // Add https:// prefix for URLs without protocol
  return `https://${trimmedUrl}`
}

export const getFavicons = async (url: string): Promise<string[]> => {
  // Return empty array if URL is empty or invalid
  if (!url || !url.trim()) {
    return []
  }

  try {
    // ensure URL has protocol for parsing
    const normalizedUrl = normalizeUrl(url)
    
    // Use the new caching favicon function
    const faviconUrl = await getFaviconUrlWithCache(normalizedUrl)
    
    return [faviconUrl]
  } catch {
    return []
  }
}
