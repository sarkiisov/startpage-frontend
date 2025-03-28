export const fileToDataURI = async (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }

    reader.onerror = reject

    reader.readAsDataURL(file)
  })
}

export const dataURItoFile = (dataURI: string, filename: string): File => {
  const byteString = atob(dataURI.split(',')[1])

  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length)

  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  const blob = new Blob([ab], { type: mimeString })

  return new File([blob], filename)
}

export const downloadFile = (file: File) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = file.name

  document.body.appendChild(link)

  link.click()

  link.remove()

  URL.revokeObjectURL(link.href)
}
