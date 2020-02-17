const autoprefixer = require("autoprefixer");

module.exports = () => ({
  plugins: [
    autoprefixer({
      //  browsers: ["last 2 versions"]
      overrideBrowserslist: ["last 2 versions"]
    })
  ]
});
