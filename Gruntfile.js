module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
      , concat: {
            js : {
                src : [
                    'js/*'
                ],
                dest : 'combined.min.js'
            }
        }
      , uglify: {
            options: {
               mangle: false
            }
          , js: {
                files: {
                    'combined.min.js': ['combined.min.js']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['concat:js', 'uglify:js']);
};