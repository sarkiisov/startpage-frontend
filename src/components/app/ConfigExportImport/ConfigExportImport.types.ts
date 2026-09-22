import { z } from 'zod'

import { ConfigSchema } from './ConfigExportImport.schema'

export type Config = z.infer<typeof ConfigSchema>
