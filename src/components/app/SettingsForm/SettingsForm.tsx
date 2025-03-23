import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { SettingsFormData, SettingsFormProps } from './SettingsForm.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsFormSchema } from './SettingsForm.schema'
import { Button } from '@/components/ui'
import { CounterInput, TextInput } from '@/components/inputs'

export const SettingsForm = ({ defaultValues, onSubmit, children }: SettingsFormProps) => {
  const form = useForm<SettingsFormData>({
    defaultValues,
    resolver: zodResolver(SettingsFormSchema)
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

const SettingsFormBody = () => {
  return (
    <div className="flex flex-col gap-3">
      <CounterInput name="columns" label="Columns" />
      <TextInput name="backendUrl" label="Backend URL" />
    </div>
  )
}

const SettingsFormActions = () => {
  const { formState } = useFormContext<SettingsFormData>()

  return (
    <Button disabled={formState.isSubmitting} type="submit">
      Save
    </Button>
  )
}

SettingsForm.Body = SettingsFormBody
SettingsForm.Actions = SettingsFormActions
