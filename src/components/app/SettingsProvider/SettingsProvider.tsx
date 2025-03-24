import { useModalContext } from '@/components/modals'
import { useLocalStorage } from '@/hooks'
import { createSafeContext } from '@/utils'
import { SettingsForm } from '../SettingsForm'
import { useCallback } from 'react'
import { SettingsContext } from './SettingsProvider.types'
import { defaultSettings } from './SettingsProvider.consts'
import { Settings } from '../types'

const [SettingsContextProvider, useSettingsContext] = createSafeContext<SettingsContext>(
  'SettingsProvider was not found in the tree'
)

const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', defaultSettings)

  const { openModal, closeModal } = useModalContext()

  const requestEditSettings = useCallback(() => {
    openModal({
      title: 'Settings',
      children: (
        <SettingsForm
          defaultValues={settings}
          onSubmit={(nextSettings) => {
            setSettings(nextSettings)
            closeModal()
          }}
        >
          <SettingsForm.Body />
          <div className="mt-4 flex justify-end">
            <SettingsForm.Actions />
          </div>
        </SettingsForm>
      )
    })
  }, [closeModal, openModal, settings, setSettings])

  return (
    <SettingsContextProvider value={{ settings, requestEditSettings }}>
      {children}
    </SettingsContextProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { useSettingsContext, SettingsProvider }
