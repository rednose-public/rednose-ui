module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    'build/rednose-ui/css/rednose-ui.css': 'src/rednose-ui/less/rednose-ui.less'
                }
            },

            production: {
                options: {
                    compress: true
                },
                files: {
                    'build/rednose-ui/css/rednose-ui-min.css': 'src/rednose-ui/less/rednose-ui.less'
                }
            }
        },

        copy: {
            img: {
                src: ['**'],
                dest: 'build/rednose-ui/img',
                cwd: 'src/rednose-ui/img',
                expand: true
            }
        },

        watch: {
            files: 'src/rednose-ui/less/*',
            tasks: ['less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('loader', 'Build YUI loader metadata', function() {
        var exec = require('child_process').spawn,
            path = require('path');

        var yogi = path.join(process.cwd(), 'node_modules/yogi/bin/yogi.js'),
            done = this.async();

        var child = exec(process.execPath, [
            yogi,
            'loader',
            '--mix',
            '--yes'
        ], {
            cwd: path.join(process.cwd(), 'src'),
            stdio: 'inherit',
            env: process.env
        });

        child.on('exit', function(code) {
            if (code) {
                grunt.fail.fatal('Yogi loader build exited with code: ' + code);
            }
            done();
        });
    });

    grunt.registerTask('default', ['less', 'copy', 'loader']);
};
