export type Settings = {
  columns: number
  backendUrl: string
  background: {
    filename: string
    dataURI: string
  } | null
  darkMode: boolean
}
