module.exports = function() {
  var public = './public/';
  var temp = './.tmp/';
  var views = './views/';

  var config = {
    /**
    * File paths
    */

    // all js to vet
    alljs: [
      './**/*.js',
      './*.js',
      '!' + './node_modules/**/*.*',
      '!' + public + 'dist/**/*.*',
      '!' + public + 'javascript/lib/**/*.*',
    ],

    build: './build/',
    fonts: './bower_components/font-awesome/fonts/**/*.*',
    images: public + 'images/**/*.*',
    index: views + 'index.html',
    js: [
      public + '**/*.js',
    ],
    css: temp + 'styles.css',

    sass: public + 'stylesheets/index.scss',
    server: './app.js',
    temp: temp,

    browserReloadDelay: 1000,


    /**
    * Bower and NPM locations
    **/

    bower: {
      json: require('./bower.json'),
      directory: './bower_components',
      ignorePath: '../..'
    },

    /**
    * Node settings
    */

    defaultPort: 3001,
    nodeServer: './app.js'
  };

  return config;
};
