import { getFromLocalStorage } from '@/utils'
import { defaultSettings } from './SettingsProvider.consts'
import { Settings } from '@/types'

export const getSettings = (): Settings => {
  return getFromLocalStorage('settings', defaultSettings)
}
