import Gear from '@/assets/icons/Gear.svg?react'
import Plus from '@/assets/icons/Plus.svg?react'

import { ContextMenu, Link, useLinkContext, useSettingsContext } from './components'
import { SortableGrid } from './components/dnd/SortableGrid'
import { cn } from './utils'

export const App = () => {
  const { links, setLinks, requestAddLink, requestEditLink, requestDeleteLink } = useLinkContext()
  const {
    settings: { columns },
    requestEditSettings
  } = useSettingsContext()

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <SortableGrid
          columns={columns}
          items={links}
          onChange={(items) => setLinks(items)}
          renderItem={(link) => (
            <ContextMenu>
              <ContextMenu.Trigger>
                <Link className="w-17" {...link} />
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item onClick={() => requestEditLink(link)}>Edit</ContextMenu.Item>
                <ContextMenu.Item onClick={() => requestDeleteLink(link)}>Delete</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>
          )}
        />
        <div className="absolute right-0 bottom-0 m-5 flex flex-col gap-5">
          <button
            onClick={requestEditSettings}
            className={cn(
              'cursor-pointer transition-colors',
              'text-neutral-400 hover:text-neutral-600',
              'dark:text-neutral-600 dark:hover:text-neutral-300'
            )}
          >
            <Gear className="h-5 w-5" />
          </button>
          <button
            onClick={requestAddLink}
            className={cn(
              'cursor-pointer transition-colors',
              'text-neutral-400 hover:text-neutral-600',
              'dark:text-neutral-600 dark:hover:text-neutral-300'
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  )
}
