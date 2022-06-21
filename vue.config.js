const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {  
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


