module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.97.33.178',
        changeOrigin: true
      }
    },
    // overlay: {
    //   warnings: false,
    //   errors: false
    // },
    // lintOnSave: false
  }
}
