export const hasFaviconPermissions = (): Promise<boolean> =>
  new Promise((resolve) => chrome.permissions.contains({ origins: ['<all_urls>'] }, resolve))

export const requestFaviconPermissions = (): Promise<boolean> =>
  new Promise((resolve) => chrome.permissions.request({ origins: ['<all_urls>'] }, resolve))
