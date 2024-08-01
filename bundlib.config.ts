import { BundlibConfig as Config } from 'bundlib';

const config: Config = {
  esModule: 'main',
  interop: 'main',
  min: ['browser', 'module'],
  project: 'tsconfig-build.json',
};

export default config;
