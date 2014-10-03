module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
            target: {
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

    grunt.registerTask('build', ['copy', 'shell']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
};