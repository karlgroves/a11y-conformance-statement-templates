'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.util.linefeed = '\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        datetime: Date.now(),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' No license expressed or implied  */\n',

        jsonlint: {
            configFiles: {
                src: ['package.json', '.jshintrc', '.prettifyrc']
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            src: ['Gruntfile.js']
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            }
        },

        prettify: {
            options: {
                config: '.prettifyrc'
            },
            dist: {
                expand: true,
                cwd: 'src/',
                ext: '.html',
                src: ['*.html'],
                dest: 'src/'
            }

        },
        
        githooks: {
            all: {
                options: {
                    preventExit: true
                },
                'pre-commit': 'default',
            }
        }
    });

    grunt.registerTask('test', ['jsonlint', 'jshint', 'travis-lint']);
    grunt.registerTask('default', ['test', 'prettify']);

};

