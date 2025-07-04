import { z } from 'zod'

export const SettingsFormSchema = z.object({
  columns: z
    .number()
    .min(2, 'At least 2 columns required')
    .max(10, 'No more than 10 columns required'),
  backendUrl: z.string().url().or(z.literal('')),
  background: z.literal(null).or(z.instanceof(File)),
  darkMode: z.boolean()
})
