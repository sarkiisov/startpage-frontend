import { filesize } from 'filesize'
import { useId } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { cn, downloadFile } from '@/utils'

import { InputWrapper } from '../InputWrapper'
import { FileInputProps } from './FileInput.types'

export const FileInput = ({
  label,
  withAsterisk,
  name,
  shouldUnregister,
  className,
  readOnly,
  ...props
}: FileInputProps) => {
  const { control, formState } = useFormContext()

  const id = useId()

  const {
    field: { value, onChange, ...field },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister, defaultValue: null })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files as FileList
    onChange(file || null)
  }

  return (
    <InputWrapper id={id} label={label} withAsterisk={withAsterisk} error={error?.message}>
      {value ? (
        <div className="">
          <div className="flex gap-3">
            <div className={cn('min-w-0 truncate', 'text-black', 'dark:text-white')}>
              {(value as File).name}
            </div>
            <div className="shrink-0 text-neutral-400">({filesize((value as File).size)})</div>
          </div>
          <div className="mt-0.5 flex gap-3">
            <button
              onClick={() => downloadFile(value as File)}
              type="button"
              className={cn('cursor-pointer hover:underline', 'text-black', 'dark:text-white')}
            >
              Download
            </button>
            <button
              onClick={() => onChange(null)}
              type="button"
              className={cn('cursor-pointer hover:underline', 'text-black', 'dark:text-white')}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <input
          {...field}
          {...props}
          className={cn(
            'block w-full rounded-lg border text-white outline-0 file:mr-2 file:border-0 file:p-1.5 focus:ring',
            'border-neutral-300 bg-neutral-50 text-black file:bg-neutral-200 file:text-black focus:ring-neutral-500',
            'dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-white dark:file:bg-neutral-800 dark:file:text-white dark:focus:ring-neutral-300',
            className
          )}
          type="file"
          readOnly={formState.isSubmitting || readOnly}
          id={id}
          onChange={handleInputChange}
        />
      )}
    </InputWrapper>
  )
}
