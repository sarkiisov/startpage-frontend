import { z } from 'zod'

import { normalizeUrl } from './LinkForm.utils'

export const LinkFormSchema = z.object({
  href: z.string().transform(normalizeUrl).pipe(z.string().url()),
  icon: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('FAVICON'),
      src: z.string().min(1)
    }),
    z.object({
      type: z.literal('PLACEHOLDER'),
      color: z.string().min(1)
    })
  ]),
  title: z.string().min(1)
})
