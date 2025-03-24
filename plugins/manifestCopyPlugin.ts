import fs from 'fs'
import path from 'path'

export default {
  name: 'manifest-copy-plugin',
  closeBundle: async () => {
    fs.copyFileSync('manifest.json', path.join('dist', 'manifest.json'))
  }
}
