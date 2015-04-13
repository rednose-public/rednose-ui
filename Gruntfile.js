module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
            ' * RedNoseUI v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

        buildDir: 'build',

        copy: {
            yui: {
                files: [
                    {expand: true, cwd: 'node_modules/yui', src: '**/*', dest: '<%= buildDir %>'}
                ]
            },

            lib: {
                files: [
                    {expand: true, cwd: 'lib', src: '**/*', dest: '<%= buildDir %>'}
                ]
            },

            fonts: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: '**/*', dest: '<%= buildDir %>/fonts'},
                    {expand: true, cwd: 'bower_components/fontawesome/fonts', src: '**/*', dest: '<%= buildDir %>/fonts'}
                ]
            }
        },

        shell: {
            test: {
                command: './../node_modules/.bin/yogi test',
                stderr: false,
                options: {
                    execOptions: {
                        cwd: 'src'
                    }
                }
            },

            build: {
                command: './../node_modules/.bin/yogi build --replace-version=<%= pkg.version %>',
                stderr: false,
                options: {
                    execOptions: {
                        cwd: 'src'
                    }
                }
            }
        },

        watch: {
            css: {
                files: 'src/rednose-base/css/**/*',
                tasks: 'css'
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', 'shell:test');
    grunt.registerTask('build', ['copy', 'shell:build', 'seed', 'css']);
};
