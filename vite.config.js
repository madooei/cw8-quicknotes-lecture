import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cw8-quicknotes-lecture/",
  plugins: [react()]
})
