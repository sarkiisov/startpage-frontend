import { fileToDataURI, getFromLocalStorage } from '@/utils'
import { defaultSettings } from './SettingsProvider.consts'
import { Settings } from '@/types'

export const getSettings = (): Settings => {
  return getFromLocalStorage('settings', defaultSettings)
}

export const setBackground = async (file?: File | null) => {
  const backgroundUrl = file ? await fileToDataURI(file) : ''
  document.body.style.backgroundImage = `url(${backgroundUrl})`
}
