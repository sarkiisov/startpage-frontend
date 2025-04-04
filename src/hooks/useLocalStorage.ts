import { useState } from 'react'

import { getFromLocalStorage, setToLocalStorage } from '@/utils'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => getFromLocalStorage(key, initialValue))

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    setToLocalStorage(key, valueToStore)
  }

  return [storedValue, setValue] as const
}
