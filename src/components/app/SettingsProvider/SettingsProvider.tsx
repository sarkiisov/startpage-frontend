import { useCallback } from 'react'
import { DefaultValues } from 'react-hook-form'

import { useModalContext } from '@/components/modals'
import { useLocalStorage } from '@/hooks'
import { createSafeContext, dataURItoFile, fileToDataURI } from '@/utils'

import { SettingsForm, SettingsFormData } from '../SettingsForm'
import { defaultSettings } from './SettingsProvider.consts'
import { SettingsContext } from './SettingsProvider.types'
import { getSettings, setBackground, setColorMode } from './SettingsProvider.utils'

const [SettingsContextProvider, useSettingsContext] = createSafeContext<SettingsContext>(
  'SettingsProvider was not found in the tree'
)

const settings = getSettings()

if (settings.background) {
  const { dataURI, filename } = settings.background
  setBackground(dataURItoFile(dataURI, filename))
}

setColorMode(settings.darkMode ?? defaultSettings.darkMode)

const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings)

  const getDefaultValues = useCallback(async () => {
    const background = settings.background
      ? dataURItoFile(settings.background.dataURI, settings.background.filename)
      : null

    return { ...settings, background }
  }, [settings])

  const { openModal, closeModal } = useModalContext()

  const handleFormSubmit = useCallback(
    async (nextSettings: SettingsFormData) => {
      setSettings({
        ...nextSettings,
        background: nextSettings.background
          ? {
              filename: nextSettings.background.name,
              dataURI: await fileToDataURI(nextSettings.background)
            }
          : null
      })
      setBackground(nextSettings.background)
      setColorMode(nextSettings.darkMode)

      closeModal()
    },
    [closeModal, setSettings]
  )

  const requestEditSettings = useCallback(() => {
    openModal({
      title: 'Settings',
      children: (
        <SettingsForm
          defaultValues={getDefaultValues as DefaultValues<SettingsFormData>}
          onSubmit={handleFormSubmit}
        >
          <SettingsForm.Body />
          <div className="mt-4 flex justify-end">
            <SettingsForm.Actions />
          </div>
        </SettingsForm>
      )
    })
  }, [openModal, getDefaultValues, handleFormSubmit])

  return (
    <SettingsContextProvider value={{ settings, requestEditSettings }}>
      {children}
    </SettingsContextProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { useSettingsContext, SettingsProvider }
