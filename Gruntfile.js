var exec = require('child_process').spawn,
	path = require('path');

module.exports = function(grunt) {

	grunt.registerTask('build', 'Building RedNoseUI', function() {
		grunt.log.ok('Building all modules with yogi');

		var meta = grunt.file.readJSON('package.json'),
			done = this.async(),
			yogi = path.join(process.cwd(), 'node_modules/yogi/bin/yogi.js'),
			args = [
				yogi,
				'build',
				'--replace-version=' + meta.version,
			],
			child;

		child = exec(process.execPath, args, {
			cwd: path.join(process.cwd(), 'src'),
			stdio: 'inherit',
			env: process.env
		});

		child.on('exit', function(code) {
			if (code) {
				grunt.fail.fatal('yogi build exited with code: ' + code);
			}
			done();
		});
	});

	grunt.registerTask('test', 'Testing RedNoseUI', function() {
		grunt.log.ok('Testing all modules with yogi');

		var done = this.async(),
			yogi = path.join(process.cwd(), 'node_modules/yogi/bin/yogi.js'),
			args = [
			yogi,
				'test'
			],
			child;

		child = exec(process.execPath, args, {
			cwd: path.join(process.cwd(), 'src'),
			stdio: 'inherit',
			env: process.env
		});

		child.on('exit', function(code) {
			if (code) {
				grunt.fail.fatal('yogi test exited with code: ' + code);
			}
			done();
		});
	});
};
