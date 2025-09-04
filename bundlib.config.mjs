import { defineConfig } from 'bundlib'

export default defineConfig({
  esModule: true,
  interop: true,
  min: ['module', 'browser'],
  project: './tsconfig.build.json',
})
