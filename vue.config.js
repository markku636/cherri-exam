const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  pluginOptions: {
    i18n: {
      locale: "tw",
      fallbackLocale: "tw",
      localeDir: "langs",
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true,
    },
  },
});
