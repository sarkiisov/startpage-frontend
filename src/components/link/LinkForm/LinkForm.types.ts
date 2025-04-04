import { DefaultValues, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { LinkFormSchema } from './LinkForm.schema'

export type LinkFormData = z.infer<typeof LinkFormSchema>

export type LinkFormProps = {
  defaultValues?: DefaultValues<LinkFormData>
  onSubmit: SubmitHandler<LinkFormData>
  children: React.ReactNode
}
