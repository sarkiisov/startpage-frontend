import { useController, useFormContext } from 'react-hook-form'
import { InputWrapper } from '../InputWrapper'
import { FileInputProps } from './FileInput.types'
import { useId } from 'react'
import { filesize } from 'filesize'
import { cn, downloadFile } from '@/utils'

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <div className="min-w-0 truncate text-white">{(value as File).name}</div>
            <div className="shrink-0 text-neutral-400">({filesize((value as File).size)})</div>
          </div>
          <div className="mt-0.5 flex gap-3">
            <button
              onClick={() => downloadFile(value as File)}
              type="button"
              className="cursor-pointer text-white hover:underline"
            >
              Download
            </button>
            <button
              onClick={() => onChange(null)}
              type="button"
              className="cursor-pointer text-white hover:underline"
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
            'block w-full rounded-lg border border-neutral-800 bg-neutral-950/40 text-white outline-0 file:mr-2 file:border-0 file:bg-neutral-800 file:p-2 focus:ring focus:ring-neutral-300',
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
