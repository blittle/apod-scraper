module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.initConfig({
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'build/apod-scraper.js'
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "build",
                    name:"apod-scraper",
                    mainConfigFile: "config.js",
                    out: "build/apod-scraper-amd.js",
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
            all: ['build/**/*.js', 'grunt.js']
        }
    });

    grunt.registerTask('default', 'typescript lint');
    grunt.registerTask('amd', 'typescript lint requirejs');
    grunt.registerTask('test', 'typescript requirejs qunit');
};
