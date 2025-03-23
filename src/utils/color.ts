type ColorRGB = { r: number; g: number; b: number }

type ColorVariant = 'light' | 'dark'

export const hexToRgb = (hex: string): ColorRGB | null => {
  const sanitizedHex = hex.replace(/^#/, '')

  if (sanitizedHex.length !== 3 && sanitizedHex.length !== 6) {
    return null
  }

  const bigint = parseInt(sanitizedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

export const getColorVariant = ({ r, g, b }: ColorRGB): ColorVariant => {
  const threshold = r * 0.299 + g * 0.587 + b * 0.114

  return threshold > 186 ? 'light' : 'dark'
}
