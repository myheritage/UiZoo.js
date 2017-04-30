'use strict';

let gulp 		= require('gulp'),
    spawn       = require('child_process').spawn,
	server 		= require('gulp-develop-server'),
	rollup		= require('rollup'),
	rConfig		= require('./rollup.config'),
	chalk		= require('chalk');

// Server start
gulp.task("server:start", () => {
    startServerWhenReady();
});

gulp.task("compile:client", bundleClient);

// WATCH
// =====
gulp.task("default", ["server:start", "compile:client"], () => {
	gulp.watch(["src/**/*"], [ "compile:client"]);
});

function bundleClient () {
	rollup.rollup(rConfig)
	.then(bundle => {
		bundle.write({
			format: 'iife',
			dest: 'build/index.js',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM'
			}, 
		});
	})
	.catch(err => {
		console.error(chalk.red(err.message));
		console.error(chalk.grey(err.formatted.replace('Error: ' + err.message + '\n', '')));
	});
}

function startServerWhenReady () {
	server.listen({path: './src/server/app.js'});
	startServerWhenReady = () => {
		server.restart();
	};
};