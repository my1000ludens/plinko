import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: { port: 8080 },
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  publicDir: '../public',
  root: 'src',
  plugins: [tsconfigPaths(), viteSingleFile()],
})
