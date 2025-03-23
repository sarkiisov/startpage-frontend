export const getFromLocalStorage = <T>(key: string, initialValue: T): T => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error('Error reading localStorage', error)
    return initialValue
  }
}

export const setToLocalStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting localStorage', error)
  }
}
