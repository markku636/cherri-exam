const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        './src/assets/style/variable.scss'
      ]
    },
    i18n: {
      locale: 'tw',
      fallbackLocale: 'tw',
      localeDir: 'langs',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
})


