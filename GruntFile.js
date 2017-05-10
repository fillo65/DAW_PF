module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        style: 'expanded'
      },
      dist: {
        files: {
          'public/css/master.css': 'public/scss/master.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: 'public/scss/*.scss',
        tasks: ['sass'],
        options: {
          interrupt: false,
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['watch']);
};
