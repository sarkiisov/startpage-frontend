import { DefaultValues } from 'react-hook-form'

import { LinkFormData } from './LinkForm.types'

export const fallbackDefaultValues: DefaultValues<LinkFormData> = {
  title: '',
  href: '',
  icon: { type: 'PLACEHOLDER' }
}
