import { ContextMenu, Link, useLinkContext, useSettingsContext } from './components'
import { SortabelGrid } from './components/dnd/SortableGrid'

import Plus from '@/assets/icons/Plus.svg?react'
import Gear from '@/assets/icons/Gear.svg?react'

function App() {
  const { links, setLinks, requestAddLink, requestEditLink, requestDeleteLink } = useLinkContext()
  const {
    settings: { columns },
    requestEditSettings
  } = useSettingsContext()

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <SortabelGrid
          columns={columns}
          items={links}
          onChange={(items) => setLinks(items)}
          renderItem={(link) => (
            <ContextMenu>
              <ContextMenu.Trigger>
                <Link className="w-15" {...link} />
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
            className="cursor-pointer text-neutral-600 transition-colors hover:text-neutral-300"
          >
            <Gear className="h-5 w-5" />
          </button>
          <button
            className="cursor-pointer text-neutral-600 transition-colors hover:text-neutral-300"
            onClick={requestAddLink}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  )
}

export default App
