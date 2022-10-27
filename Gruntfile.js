module.exports = function (grunt) {
	'use strict';

	const pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!node_modules/**',
					'!build/**',
					'!css/sourcemap/**',
					'!.git/**',
					'!.github/**',
					'!bin/**',
					'!.gitlab-ci.yml',
					'!cghooks.lock',
					'!tests/**',
					'!*.sh',
					'!*.map',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!phpunit.xml',
					'!README.md',
					'!sass/**',
					'!vendor/**',
					'!composer.json',
					'!composer.lock',
					'!package-lock.json',
					'!phpcs.xml.dist',
					'!.eslintignore',
					'!.eslintrc.json',
					'!.vscode/**',
					'!*.zip',
					'!webpack.mix.js',
					'!wp-textdomain.js',
				],
				dest: 'package/paw-masonry-gallery/',
			},
		},

		compress: {
			main: {
				options: {
					archive: 'paw-masonry-gallery.zip',
					mode: 'zip',
					level: 5,
				},
				files: [
					{
						expand: true,
						cwd: 'package/',
						src: ['paw-masonry-gallery/**'],
						dest: '/',
					},
				],
			},
		},

		clean: {
			main: ['package'],
			zip: ['*.zip'],
		},
	});

	// Load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('package', [
		'clean:zip',
		'copy:main',
		'compress:main',
		'clean:main',
	]);

	grunt.registerTask('action-package', ['clean:main', 'copy:main']);
};
