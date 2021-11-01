module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@main': './src/main',
        '@shared': './src/shared',
        '@modules': './src/modules'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
