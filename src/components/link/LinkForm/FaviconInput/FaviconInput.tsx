import { useController, useFormContext } from 'react-hook-form'
import { LinkFormData } from '../LinkForm.types'
import { useFindManyFavicons } from '../LinkForm.hooks'
import { useId } from 'react'
import { FaviconInputOptionProps } from './FaviconInput.types'
import { InputWrapper } from '@/components/inputs'

const FaviconInputOption = ({ faviconSrc }: FaviconInputOptionProps) => {
  const id = useId()

  const { control, formState } = useFormContext<LinkFormData>()

  const {
    field: { value, ...fieldProps }
  } = useController({ name: 'icon.src', control, shouldUnregister: true })

  return (
    <div className="flex">
      <input
        className="peer hidden"
        type="radio"
        value={faviconSrc}
        checked={faviconSrc === value}
        readOnly={formState.isSubmitting}
        id={id}
        {...fieldProps}
      />
      <label
        className="overflow-hidden rounded-lg border border-gray-200 outline-2 outline-offset-2 outline-transparent transition-colors peer-checked:outline-white"
        htmlFor={id}
      >
        <img className="h-14 w-14" src={faviconSrc} />
      </label>
    </div>
  )
}

export const FaviconInput = () => {
  const { watch, getFieldState } = useFormContext<LinkFormData>()

  const { error } = getFieldState('icon.src')

  const href = watch('href')

  const { data: images, isLoading } = useFindManyFavicons(href, { enabled: Boolean(href) })

  return (
    <InputWrapper label="Icon" error={error?.message}>
      <div className="flex flex-wrap gap-2.5">
        {isLoading && <span>Загрузка изображений</span>}
        {images?.map((image, index) => <FaviconInputOption key={index} faviconSrc={image} />)}
      </div>
    </InputWrapper>
  )
}
