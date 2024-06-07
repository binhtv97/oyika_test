module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@hook': './src/hook',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@themes': './src/themes',
          '@types': './src/types',
          '@utilities': './src/utilities',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@common': './src/common',
          '@networking': './src/networking',
          '@services': './src/services',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
