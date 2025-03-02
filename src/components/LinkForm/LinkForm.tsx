import { TextInput } from '../inputs'
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form'
import { LinkFormData, LinkFormProps } from './LinkForm.types'
import { useFindManyFavicons } from './LinkForm.hooks'
import { useId } from 'react'

const LinkFormFavicon = ({
  value,
  shouldUnregister = false,
  readOnly,
  children,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  shouldUnregister?: boolean
}) => {
  const id = useId()

  const { control, formState } = useFormContext()

  const {
    field: { value: currentValue, ...fieldProps }
  } = useController({ name: 'faviconUrl', control, shouldUnregister })

  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={value === currentValue}
        readOnly={formState.isSubmitting || readOnly}
        id={id}
        {...props}
        {...fieldProps}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}

export const LinkForm = ({ defaultValues, onSubmit }: LinkFormProps) => {
  const form = useForm<LinkFormData>({
    defaultValues: defaultValues ?? { title: '', url: '', faviconUrl: '' }
  })

  const { handleSubmit, watch } = form

  const title = watch('title')
  const url = watch('url')

  const { data: images, isLoading } = useFindManyFavicons(url, { enabled: Boolean(url) })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Название" name="title" />
        <TextInput label="URL" type="url" name="url" />
        <div>
          {title && (
            <LinkFormFavicon value="">
              <div>{title.slice(0, 1).toUpperCase()}</div>
            </LinkFormFavicon>
          )}
          {isLoading && 'Загрузка изображений'}
          {images?.map((image) => (
            <LinkFormFavicon key={image} value={image}>
              <img src={image} />
            </LinkFormFavicon>
          ))}
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </FormProvider>
  )
}
