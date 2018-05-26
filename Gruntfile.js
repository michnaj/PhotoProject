
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  sass: {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'css/style.css': 'sass/style.sass'
      }
    }
  },
  watch: {
    sass: {
      files: ['sass/*.sass'],
      tasks: ['sass'],
      options: {
        spawn: false,
      },
    },
    js: {
      files: ['js/*.js'],
      tasks: ['jshint'],
      options: {
        spawn: false,
      },
    }
  },
  jshint: {
    options: {
      esversion: 6,
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
        jQuery: true
      },
    },
    all: ['js/*.js']
  },
  browserSync: {
    dev: {
      bsFiles: {
        src : [
          'css/*.css',
          'js/*.js',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: './'
      }
    }
  }
  });

  //Load the plugins tasks}
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default tasks
  grunt.registerTask('default', ['sass', 'jshint', 'browserSync', 'watch']);
};