import { useId, useMemo, useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import Upload from '@/assets/icons/Upload.svg?react'
import { InputWrapper } from '@/components/inputs'

import { useFindManyFavicons } from '../LinkForm.hooks'
import { LinkFormData } from '../LinkForm.types'
import { FaviconFileUploaderProps, FaviconInputOptionProps } from './FaviconInput.types'

const FaviconFileUploader = ({ onUpload }: FaviconFileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    onUpload?.(file)
  }

  const triggerInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="h-14 w-14">
      <div
        className="block h-full w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-800"
        onClick={triggerInput}
      >
        <input
          multiple={false}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          ref={inputRef}
        />
        <div className="flex h-full w-full items-center justify-center text-xl text-white transition-colors hover:text-neutral-300">
          <Upload />
        </div>
      </div>
    </div>
  )
}

const FaviconInputOption = ({ src, isLoading }: FaviconInputOptionProps) => {
  const id = useId()

  const { control, formState } = useFormContext<LinkFormData>()

  const {
    field: { value, ...fieldProps }
  } = useController({ name: 'icon.src', control })

  return (
    <div className="flex">
      {isLoading && <span className="text-white">l...</span>}
      <input
        disabled={isLoading}
        className="peer hidden"
        type="radio"
        value={src}
        checked={src === value}
        readOnly={formState.isSubmitting}
        id={id}
        {...fieldProps}
      />
      <label
        className="overflow-hidden rounded-lg outline-2 outline-offset-2 outline-transparent transition-colors peer-checked:outline-white"
        htmlFor={id}
      >
        <img className="h-14 w-14" src={src} />
      </label>
    </div>
  )
}

FaviconInputOption.Skeleton = () => {
  return <div className="h-14 w-14 animate-pulse rounded-lg bg-white/20" />
}

export const FaviconInput = () => {
  const {
    watch,
    getFieldState,
    formState: { defaultValues },
    setValue
  } = useFormContext<LinkFormData>()

  const { error: fieldError } = getFieldState('icon.src')

  const href = watch('href')

  const { data, isLoading, isSuccess, error } = useFindManyFavicons(href, {
    enabled: Boolean(href)
  })

  const [uploadedSrc, setUploadedSrc] = useState<string>()

  const handleFaviconUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const src = event.target?.result as string
      setUploadedSrc(src)
      setValue('icon.src', src, { shouldValidate: true })
    }
    reader.readAsDataURL(file)
  }

  const images = useMemo(() => {
    const icon = defaultValues?.icon
    const defaultSrc = icon?.type === 'FAVICON' ? icon.src : null

    return [...(data ?? []), defaultSrc, uploadedSrc].filter(
      (value, index, arr) => value && arr.indexOf(value) === index
    ) as string[]
  }, [data, defaultValues, uploadedSrc])

  return (
    <InputWrapper label="Icon" error={fieldError?.message}>
      <div className="flex flex-wrap gap-2.5 text-white">
        {isLoading &&
          Array(2)
            .fill(null)
            .map((_, index) => <FaviconInputOption.Skeleton key={index} />)}
        {images?.map((image) => <FaviconInputOption key={image} src={image} />)}
        <FaviconFileUploader onUpload={handleFaviconUpload} />
      </div>
      <div className="mt-3">
        {error && <span className="text-red-500">{error}</span>}
        {isSuccess && !data?.length && <span className="text-neutral-300">No favicons found</span>}
      </div>
    </InputWrapper>
  )
}
