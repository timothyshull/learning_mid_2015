module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    { expand: true, src: 'bower_components/backbone/backbone.js', dest: 'app/js/lib', filter: 'isFile', flatten: true },
                    { expand: true, src: 'bower_components/jquery/dist/jquery.js', dest: 'app/js/lib', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/lodash/lodash.js', dest: 'app/js/lib', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/modernizr/modernizr.js', dest: 'app/js/lib', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/requirejs/require.js', dest: 'app/js/lib', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/text/text.js', dest: 'app/js/lib', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/normalize.css/normalize.css', dest: 'app/css', filter: 'isFile', flatten: true  }                                        
                ],
            },
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            }
        },
        jslint: {
            server: {
                src: [
                    'server/lib/*.js',
                    'server/routes/*.js',
                    'server/*.js',
                    'server/test/*.js'
                ],
                exclude: [
                    'server/config.js'
                ],
                directives: {
                    node: true,
                    todo: true
                },
                options: {
                    edition: 'latest',
                    junit: 'server-junit.xml',
                    log: 'server-lint.log',
                    jslintXml: 'server-jslint.xml',
                    errorsOnly: true,
                    failOnError: false,
                    checkstyle: 'server-checkstyle.xml'
                }
            },
            client: {
                src: [
                    'Gruntfile.js', 'app/**/*.js', 'test/**/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery', 'console', 'module', 'document', 'define', 'require'
                    ]
                },
                options: {
                    junit: 'out/client-junit.xml'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jslint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    
    grunt.registerTask('test', ['jslint', 'grunt-mocha-test']);

    grunt.registerTask('default', ['jslint', 'grunt-mocha-test', 'concat', 'uglify']);

};
