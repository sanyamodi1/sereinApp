const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// 1. Get default Expo Metro config
const config = getDefaultConfig(__dirname);

// 2. Apply SVG transformer first
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// 3. Apply NativeWind transformer last
module.exports = withNativeWind(config, { input: './global.css' });