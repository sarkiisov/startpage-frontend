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
        className="overflow-hidden rounded-lg border border-neutral-300 outline-2 outline-offset-2 outline-transparent transition-colors peer-checked:outline-white"
        htmlFor={id}
      >
        <img className="h-14 w-14 bg-white" src={faviconSrc} />
      </label>
    </div>
  )
}

export const FaviconInput = () => {
  const { watch, getFieldState } = useFormContext<LinkFormData>()

  const { error: fieldError } = getFieldState('icon.src')

  const href = watch('href')

  const {
    data: images,
    isLoading,
    isSuccess,
    error
  } = useFindManyFavicons(href, { enabled: Boolean(href) })

  return (
    <InputWrapper label="Icon" error={fieldError?.message}>
      <div className="flex flex-wrap gap-2.5 text-white">
        {isLoading && <span className="text-white">Loading favicons...</span>}
        {isSuccess &&
          (images?.length ? (
            images?.map((image) => <FaviconInputOption key={image} faviconSrc={image} />)
          ) : (
            <span className="text-white">No favicons found</span>
          ))}
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </InputWrapper>
  )
}
