'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      sass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['postcss:dev']
      },
      js: {
        files: ['js/{,**/}*.js'],
        tasks: ['jshint']
      }
    }, //watch
    sass: {
      dev: {
        options: {
          compass: false
        },
        files: {
          'stylesheets/style.css': 'sass/style.scss'
        }
      }
    }, //sass
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions']}),
          require('cssnano')()
        ]
      },
      dev: {
        files: {
          'stylesheets/style.css' : 'stylesheets/style.css'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/functions.js']
    }, //jshint
    modernizr: {
      dist: {
        "devFile" : "js/vendor/modernizr.custom.86229.js",
        "outputFile" : "js/vendor/modernizr-custom.js",
        "extra" : {
          "shiv" : false,
          "printshiv" : true,
          "load" : true,
          "mq" : true,
          "cssclasses" : true
        },
        // Define any tests you want to implicitly include.
        // "tests" : [
        //   'css_mediaqueries',
        //   'rgba',
        //   'touch',
        //   'svg',
        //   'csstransforms'
        // ],
        "matchCommunityTests" : true,
        // This task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        "files" : {
          "src": [
            'sass/**/*.scss',
            'js/functions.js'
          ]
        }
      }
    }, //modernizr
    connect: {
      server: {
        options: {
          livereload: true,
          port: 9009,
          open: true
        }
      }
    } //connect
  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);
};