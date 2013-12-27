'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['src/<%= pkg.name %>.js']
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('sync-src-and-demo',
        'Copies the current version of the source file to the demo lib',
        function() {
            grunt.file.copy('src/backbone-poll-collection.js',
                'demo/public/libs/backbone-poll-collection/backbone-poll-collection.js');
            grunt.log.ok('All done copying the src file to the demo lib folder');
    });

    grunt.registerTask('sync-src-and-dist',
        'Copies the current version of the source file to the dist folder',
        function() {
            grunt.file.copy('src/backbone-poll-collection.js',
                'dist/backbone-poll-collection.js');
            grunt.log.ok('All done copying the src file to the demo lib folder');
        });

    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'sync-src-and-dist', 'uglify', 'sync-src-and-demo']);

};
