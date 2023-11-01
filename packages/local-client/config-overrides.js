/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // config.resolve.fallback = {
  //   ...config.resolve.fallback,
  //   constants: require.resolve('constants-browserify'),
  //   assert: require.resolve('assert/'),
  //   os: require.resolve('os-browserify/browser'),
  // };
  // config.stats = {
  //   warnings: false,
  // };
  config.watchOptions = {
    ...config.watchOptions,
    ignored: '**/node_modules',
  };
  return config;
};
