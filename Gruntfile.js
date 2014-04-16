module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    // target.css file: source.less file
                    'build/rednose-ui/css/rednose-ui.css': 'src/rednose-ui/less/rednose-ui.less'
                }
            },

            production: {
                options: {
                    compress: true
                },
                files: {
                    // target.css file: source.less file
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['less', 'copy']);
};
