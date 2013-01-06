module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'build',
                options: {
                    module: 'commonjs'
                }
            }
        },

        lint: {
            all: ['build/**/*.js', 'grunt.js']
        }
    });

    grunt.registerTask('default', 'typescript lint');

};