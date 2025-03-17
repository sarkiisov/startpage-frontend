import { z } from 'zod'

export const LinkFormSchema = z.object({
  href: z.string().url(),
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
