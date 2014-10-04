module.exports = function(grunt) {
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
        }
    });

    grunt.registerTask('test', 'shell:test');
    grunt.registerTask('build', ['copy', 'shell:build']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build-seed', 'Builds the rednose-ui seed files', function() {
        var append = 'YUI.Env.core.push("rednose-base");';

        var parts = [
            grunt.config.get('banner'),
            grunt.file.read('build/yui/yui.js').replace(/\(yui\(/g, '(rednose('),
            grunt.file.read('build/rednose-base/rednose-base.js'),
            append
        ];

        var minified = [
            grunt.config.get('banner'),
            grunt.file.read('build/yui/yui-min.js').replace(/\(yui\(/g, '(rednose('),
            grunt.file.read('build/rednose-base/rednose-base-min.js'),
            append
        ];

        grunt.file.write('build/rednose/rednose.js', parts.join('\n'));
        grunt.file.write('build/rednose/rednose-min.js', minified.join('\n'));
    });

    grunt.registerTask('build-css', 'Builds the rednose-ui CSS files', function() {
       var parts = [
            grunt.config.get('banner'),
            grunt.file.read('build/rednose-bootstrap/rednose-bootstrap.css'),
            grunt.file.read('build/rednose-base/rednose-base.css')
        ];

        var minified = [
            grunt.config.get('banner'),
            grunt.file.read('build/rednose-bootstrap/rednose-bootstrap-min.css'),
            grunt.file.read('build/rednose-base/rednose-base-min.css')
        ];

        grunt.file.write('build/rednose/rednose.css', parts.join('\n'));
        grunt.file.write('build/rednose/rednose-min.css', minified.join('\n'));
    });
};