module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    { expand: true, src: 'bower_components/jquery/dist/jquery.js', dest: 'scripts/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/modernizr/modernizr.js', dest: 'scripts/', filter: 'isFile', flatten: true  },
                    //{ expand: true, src: 'bower_components/normalize/normalize.css', dest: '', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/requirejs/require.js', dest: 'scripts/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/qunit/qunit/qunit.js', dest: 'scripts/', filter: 'isFile', flatten: true  }
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('copy', ['copy']);

    grunt.registerTask('default', ['copy']);
};
