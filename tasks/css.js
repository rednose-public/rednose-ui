module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    grunt.registerTask('css', 'Builds the rednose-ui CSS files', function() {
        var buildDir = path.resolve('build');

        var parts = [
            grunt.config.get('banner'),
            grunt.file.read(buildDir + '/rednose-bootstrap/rednose-bootstrap.css'),
            grunt.file.read(buildDir + '/rednose-base/rednose-base.css')
        ];

        var minified = [
            grunt.config.get('banner'),
            grunt.file.read(buildDir + '/rednose-bootstrap/rednose-bootstrap-min.css'),
            grunt.file.read(buildDir + '/rednose-base/rednose-base-min.css')
        ];

        grunt.file.write(buildDir + '/rednose-ui/rednose-ui.css', parts.join('\n'));
        grunt.file.write(buildDir + '/rednose-ui/rednose-ui-min.css', minified.join('\n'));
    });
};
