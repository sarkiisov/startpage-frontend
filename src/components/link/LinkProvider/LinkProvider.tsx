import { useCallback } from 'react'

import { Button, LinkForm, useModalContext } from '@/components'
import { useLocalStorage } from '@/hooks'
import { Link } from '@/types'
import { createSafeContext } from '@/utils'

import { LinkContext } from './LinkProvider.types'

const [LinkContextProvider, useLinkContext] = createSafeContext<LinkContext>(
  'LinkProvider component was not found in the tree'
)

const LinkProvider = ({ children }: React.PropsWithChildren) => {
  const [links, setLinks] = useLocalStorage<Link[]>('links', [])

  const { openModal, closeModal } = useModalContext()

  const requestAddLink = useCallback(() => {
    const addLink = (link: Link) => {
      setLinks((links) => [...links, link])
    }

    openModal({
      title: 'Add new link',
      children: (
        <LinkForm
          onSubmit={(link) => {
            addLink({ id: crypto.randomUUID(), ...link })
            closeModal()
          }}
        >
          <LinkForm.Body />
          <div className="mt-4 flex justify-end">
            <LinkForm.Actions />
          </div>
        </LinkForm>
      )
    })
  }, [closeModal, openModal, setLinks])

  const requestEditLink = useCallback(
    (link: Link) => {
      const editLink = (nextLink: Link) => {
        setLinks((links) => {
          const index = links.findIndex((link) => link.id === nextLink.id)

          if (index === -1) return links

          const nextLinks = [...links]
          nextLinks[index] = nextLink

          return nextLinks
        })
      }

      openModal({
        title: 'Edit link',
        children: (
          <LinkForm
            defaultValues={link}
            onSubmit={(nextLink) => {
              editLink({ id: link.id, ...nextLink })
              closeModal()
            }}
          >
            <LinkForm.Body />
            <div className="mt-4 flex justify-end">
              <LinkForm.Actions />
            </div>
          </LinkForm>
        )
      })
    },
    [closeModal, openModal, setLinks]
  )

  const requestDeleteLink = useCallback(
    (link: Link) => {
      const deleteLink = (id: string) => {
        setLinks((links) => links.filter((link) => link.id !== id))
      }

      openModal({
        title: 'Do you want to remove link?',
        children: (
          <div className="flex flex-col gap-4">
            <div className="text-white">{link.title}</div>
            <div className="ml-auto flex gap-4">
              <Button variant="secondary" onClick={closeModal}>
                Dismiss
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteLink(link.id)
                  closeModal()
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        )
      })
    },
    [closeModal, openModal, setLinks]
  )

  return (
    <LinkContextProvider
      value={{ links, setLinks, requestAddLink, requestEditLink, requestDeleteLink }}
    >
      {children}
    </LinkContextProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { useLinkContext, LinkProvider }
