/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifestCopyPlugin from './plugins/manifestCopyPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss(), svgr(), manifestCopyPlugin()],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: ['**/index.ts']
    }
  }
})
