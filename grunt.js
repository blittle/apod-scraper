module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.initConfig({
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'build/apod-scraper.js',
                options: {
                    module: 'amd'
                }
            }
        },

        jasmine_node: {
            specNameMatcher: ".spec",
            projectRoot: "."
        },

        lint: {
            all: ['build/**/*.js', 'grunt.js']
        }
    });

    grunt.registerTask('default', 'typescript lint');
    grunt.registerTask('jasmine', 'typescript lint jasmine_node');

};
