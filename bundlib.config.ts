import { BundlibConfig as Config } from 'bundlib';

const config: Config = {
  esModule: true,
  interop: true,
  min: ['api', '!main'],
  project: 'tsconfig-build.json',
};

export default config;
