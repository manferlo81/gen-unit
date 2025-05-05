import { config } from 'bundlib'

export default config({
  esModule: true,
  interop: true,
  min: ['module', 'browser'],
  project: './tsconfig.build.json',
})
