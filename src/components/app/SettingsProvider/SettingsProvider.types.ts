import { Settings } from '../types'

export type SettingsContext = {
  settings: Settings
  requestEditSettings: VoidFunction
}
