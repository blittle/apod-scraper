module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.initConfig({
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'dist/',
                options: {
                    module: "commonjs"
                }
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

        jasmine_node: {
//            specNameMatcher: "./Spec", // load only specs containing specNameMatcher
            projectRoot: "./spec"
        },

        lint: {
            all: ['dist/**/*.js', 'grunt.js']
        }
    });

    grunt.registerTask('default', 'typescript');
    grunt.registerTask('test', 'typescript jasmine_node');
};
