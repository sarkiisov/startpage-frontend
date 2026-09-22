import { useRef, useState } from 'react'

import { Button } from '@/components/ui'
import { Link } from '@/types'
import { downloadFile, getFromLocalStorage, readFileAsText, setToLocalStorage } from '@/utils'

import { ConfigSchema } from './ConfigExportImport.schema'
import { defaultSettings } from '../SettingsProvider/SettingsProvider.consts'

export const ConfigExportImport = () => {
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const config = {
      settings: getFromLocalStorage('settings', defaultSettings),
      links: getFromLocalStorage<Link[]>('links', [])
    }

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })

    downloadFile(new File([blob], 'startpage-config.json', { type: 'application/json' }))
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files as FileList

    event.target.value = ''

    if (!file) return

    try {
      const config = JSON.parse(await readFileAsText(file))
      const result = ConfigSchema.safeParse(config)

      if (!result.success) {
        setError('Invalid configuration file')
        return
      }

      setToLocalStorage('settings', result.data.settings)
      setToLocalStorage('links', result.data.links)

      window.location.reload()
    } catch {
      setError('Invalid configuration file')
    }
  }

  return (
    <div className="flex flex-col gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={handleExport}>
          Export
        </Button>
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
          Import
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImport}
        />
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
