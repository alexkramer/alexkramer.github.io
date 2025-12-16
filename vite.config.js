import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get all blog HTML files
const blogDir = resolve(__dirname, 'blog')
const blogFiles = {}
try {
  const files = readdirSync(blogDir).filter(f => f.endsWith('.html'))
  files.forEach(file => {
    const name = file.replace('.html', '')
    blogFiles[`blog/${name}`] = resolve(blogDir, file)
  })
} catch (e) {
  // Blog directory might not exist yet
}

export default defineConfig({
  root: __dirname,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...blogFiles
      },
    },
  },
  base: '/',
})
