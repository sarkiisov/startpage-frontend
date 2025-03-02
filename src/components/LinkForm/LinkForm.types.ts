import { DefaultValues, SubmitHandler } from 'react-hook-form'

export type LinkFormData = {
  title: string
  url: string
  faviconUrl: string
}

export type LinkFormProps = {
  defaultValues: DefaultValues<LinkFormData>
  onSubmit: SubmitHandler<LinkFormData>
}
