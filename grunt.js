module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.initConfig({
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'dist/apod-scraper.js'
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        min: {
            dist: {
                src: ['dist/apod-scraper.js'],
                dest: 'dist/apod-scraper.min.js'
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "dist",
                    name:"apod-scraper",
                    mainConfigFile: "config.js",
                    out: "dist/apod-scraper-amd.js",
                    optimize: "none",
                    shim: {
                        "apod-scraper" : {
                            "deps": [],
                            "exports" : "apod"
                        }
                    }
                }
            }
        },

        lint: {
            all: ['dist/**/*.js', 'grunt.js']
        }
    });

    grunt.registerTask('default', 'typescript lint');
    grunt.registerTask('amd', 'typescript lint requirejs');
    grunt.registerTask('test', 'typescript requirejs qunit');
};
