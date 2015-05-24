var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/sass/**/*.{sass,scss}",
  dest: config.publicAssets + '/css',
  settings: {
    indentedSyntax: true, // Enable .sass syntax!
    imagePath: 'assets/images' // Used by the image-url helper
  }
}
