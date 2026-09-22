import { z } from 'zod'

import { Link, LinkIcon, Settings } from '@/types'

const LinkIconSchema: z.ZodType<LinkIcon> = z.discriminatedUnion('type', [
  z.object({ type: z.literal('FAVICON'), src: z.string().min(1) }),
  z.object({ type: z.literal('PLACEHOLDER'), color: z.string().min(1) })
])

const LinkSchema: z.ZodType<Link> = z.object({
  id: z.string().min(1),
  href: z.string().url(),
  icon: LinkIconSchema,
  title: z.string().min(1)
})

const SettingsSchema: z.ZodType<Settings> = z.object({
  columns: z.number().min(2).max(10),
  background: z.object({ filename: z.string(), dataURI: z.string() }).nullable(),
  darkMode: z.boolean()
})

export const ConfigSchema = z.object({
  settings: SettingsSchema,
  links: z.array(LinkSchema)
})
