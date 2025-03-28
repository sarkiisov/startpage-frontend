import { z } from 'zod'
import { SettingsFormSchema } from './SettingsForm.schema'
import { DefaultValues, SubmitHandler } from 'react-hook-form'

export type SettingsFormData = z.infer<typeof SettingsFormSchema>

export type SettingsFormProps = {
  defaultValues?: DefaultValues<SettingsFormData>
  onSubmit: SubmitHandler<SettingsFormData>
  children: React.ReactNode
}
