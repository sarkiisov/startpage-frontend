import { useState } from 'react'
import { ContextMenu, Link } from './components'
import { SortabelGrid } from './components/SortableGrid'

import { Modal } from './components/Modal'
import { Center } from './components/layouts'
import { LinkForm } from './components/LinkForm/LinkForm'

const links = [
  {
    id: 1,
    href: 'https://www.geeksforgeeks.org/how-to-find-an-average-color-of-an-image-using-javascript/',
    title: 'YouTube',
    icon: { type: 'PLACEHOLDER', color: 'red' }
  },
  {
    id: 2,
    href: 'https://plus.unsplash.com/premium_photo-1681422570054-9ae5b8b03e46?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5zcGxhc2glMjBhcHB8ZW58MHx8MHx8fDA%3D',

    title: 'Reddit',
    icon: {
      type: 'FAVICON',
      url: 'https://plus.unsplash.com/premium_photo-1681422570054-9ae5b8b03e46?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dW5zcGxhc2glMjBhcHB8ZW58MHx8MHx8fDA%3D'
    }
  },
  {
    id: 3,
    href: 'https://www.geeksforgeeks.org/how-to-find-an-average-color-of-an-image-using-javascript/',
    title: 'DeepSeek',
    icon: {
      type: 'FAVICON',
      url: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png'
    }
  }
]

function App() {
  const [items, setItems] = useState<(any & { id: string | number })[]>(links)

  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <Center>
        <Modal open={isOpened} onOpenChange={setIsOpened}>
          {/* <span>Hello from child</span> */}
          <LinkForm />
          <button onClick={() => setIsOpened(false)}>Close modal</button>
        </Modal>

        <SortabelGrid
          columns={3}
          items={items}
          onChange={(items) => setItems(items)}
          renderItem={(item) => (
            <ContextMenu>
              <ContextMenu.Trigger>
                <div style={{ width: '4rem' }}>
                  <Link {...item} />
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item onClick={() => alert('Option 1 clicked')}>
                  Изменить
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => alert('Option 2 clicked')}>
                  Удалить
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>
          )}
        />
        <button
          onClick={() => setIsOpened(true)}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            margin: '1rem',
            padding: '1rem',
            fontSize: '1rem'
          }}
        >
          +
        </button>
      </Center>
    </>
  )
}

export default App
