module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                files: [
                    { expand: true, src: 'bower_components/history.js/scripts/bundled-uncompressed/html5/jquery.history.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true },
                    { expand: true, src: 'bower_components/jquery/dist/jquery.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/underscore/underscore.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/modernizr/modernizr.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/requirejs/require.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/sockjs-client/dist/sockjs.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/text/text.js', dest: 'scripts/lib/', filter: 'isFile', flatten: true  },
                    { expand: true, src: 'bower_components/normalize.css/normalize.css', dest: 'styles/', filter: 'isFile', flatten: true  }
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    // grunt.registerTask('copy');
};
