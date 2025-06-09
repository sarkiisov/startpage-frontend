import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

import { FaviconInput } from './FaviconInput'
import { fallbackDefaultValues } from './LinkForm.consts'
import { LinkFormSchema } from './LinkForm.schema'
import { LinkFormData, LinkFormProps } from './LinkForm.types'
import { PlaceholderInput } from './PlaceholderInput'
import { TextInput } from '../../inputs'
import { Select, SelectOption } from '../../inputs/Select'
import { Button } from '../../ui/Button'

export const LinkForm = ({ defaultValues, onSubmit, children }: LinkFormProps) => {
  const form = useForm<LinkFormData>({
    defaultValues: defaultValues ?? fallbackDefaultValues,
    resolver: zodResolver(LinkFormSchema)
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

const LinkFormBody = () => {
  const { watch, setValue } = useFormContext<LinkFormData>()

  const iconType = watch('icon.type')

  const iconTypeOptions: SelectOption[] = [
    { value: 'PLACEHOLDER', label: 'Placeholder' },
    { value: 'FAVICON', label: 'Favicon' }
  ]

  return (
    <div className="flex flex-col gap-3">
      <TextInput label="Name" name="title" />
      <TextInput
        label="URL"
        name="href"
        onPaste={() => {
          setValue('icon.type', 'FAVICON')
        }}
      />
      <Select label="Icon type" name="icon.type" options={iconTypeOptions} />
      {
        {
          PLACEHOLDER: <PlaceholderInput />,
          FAVICON: <FaviconInput />
        }[iconType]
      }
    </div>
  )
}

const LinkFormActions = () => {
  const { formState } = useFormContext<LinkFormData>()

  return (
    <Button disabled={formState.isSubmitting} type="submit">
      Save
    </Button>
  )
}

LinkForm.Body = LinkFormBody
LinkForm.Actions = LinkFormActions
