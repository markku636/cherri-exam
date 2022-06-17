const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 僅引入變數類型的 scss
        './src/assets/style/variable.scss',
      ]
    }
  }
})


