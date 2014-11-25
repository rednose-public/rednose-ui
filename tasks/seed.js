module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    grunt.registerTask('seed', 'Builds the rednose-ui seed files', function() {
        var buildDir = path.resolve('build'),
            append = 'YUI.Env.core.push("rednose-base");';

        var parts = [
            grunt.config.get('banner'),
            grunt.file.read(buildDir + '/yui/yui.js').replace(/\(yui\(/g, '(rednose-ui('),
            grunt.file.read(buildDir + '/rednose-base/rednose-base.js'),
            append
        ];

        var minified = [
            grunt.config.get('banner'),
            grunt.file.read(buildDir + '/yui/yui-min.js').replace(/\(yui\(/g, '(rednose-ui('),
            grunt.file.read(buildDir + '/rednose-base/rednose-base-min.js'),
            append
        ];

        grunt.file.write(buildDir + '/rednose-ui/rednose-ui.js', parts.join('\n'));
        grunt.file.write(buildDir + '/rednose-ui/rednose-ui-min.js', minified.join('\n'));
    });
};
