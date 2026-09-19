import { getDomainName } from './url'

type IconFetcher = (url: string) => Promise<string>

const parseHTML = (text: string) => new DOMParser().parseFromString(text, 'text/html')

const getAppleTouchIconUrl: IconFetcher = async (url) => {
  const text = await fetch(url, { redirect: 'follow' }).then((response) => response.text())

  const document = parseHTML(text)

  const link = Array.from(document.querySelectorAll('link[rel="apple-touch-icon"]')).at(-1)
  const href = link?.getAttribute('href')

  if (!href) {
    throw new Error('Apple touch icon was not found')
  }

  return new URL(href, url).toString()
}

const getAppStoreIconUrl: IconFetcher = async (url) => {
  const search = getDomainName(url)
  const searchUrl = `https://www.apple.com/us/search/${encodeURIComponent(search)}?src=globalnav`

  const text = await fetch(searchUrl).then((response) => response.text())

  const document = parseHTML(text)

  const image = document.querySelector('.rf-serp-explore-image')
  const src = image?.getAttribute('src')

  if (!src) {
    throw new Error('App Store app icon was not found')
  }

  return new URL(src, searchUrl).toString()
}

const TAB_LOAD_TIMEOUT_MS = 15000

const waitForTabToLoad = (tabId: number): Promise<void> =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener)
      reject(new Error('Play Market tab load timed out'))
    }, TAB_LOAD_TIMEOUT_MS)

    const listener = (updatedTabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
      if (updatedTabId !== tabId || changeInfo.status !== 'complete') return

      clearTimeout(timeout)
      chrome.tabs.onUpdated.removeListener(listener)
      resolve()
    }

    chrome.tabs.onUpdated.addListener(listener)
  })

const getPlayMarketIconUrl: IconFetcher = async (url) => {
  const search = getDomainName(url)
  const searchUrl = `https://play.google.com/store/search?q=${encodeURIComponent(search)}&c=apps&hl=en`

  const tab = await chrome.tabs.create({ url: searchUrl, active: false })

  if (!tab.id) {
    throw new Error('Failed to open Play Market tab')
  }

  const tabId = tab.id

  try {
    if (tab.status !== 'complete') {
      await waitForTabToLoad(tabId)
    }

    const [{ result: src }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => document.querySelector<HTMLImageElement>('img[alt="Icon image"]')?.src
    })

    if (!src) {
      throw new Error('Play Market icon was not found')
    }

    return src
  } finally {
    chrome.tabs.remove(tabId)
  }
}

export const getFaviconUrls = (url: string): ReturnType<IconFetcher>[] =>
  [getAppleTouchIconUrl, getAppStoreIconUrl, getPlayMarketIconUrl].map((fetcher) => fetcher(url))
