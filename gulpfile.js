var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: 'true'});
var del = require('del');
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
	log('Analyzing source with JSHint and JSCS');

	return gulp
			.src(config.alljs)
			.pipe($.if(args.verbose, $.print()))
			.pipe($.jscs())
			.pipe($.jshint())
			.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
			.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
	log('Compiling Sass --> CSS');

	return gulp
			.src(config.sass)
			.pipe($.plumber())
			.pipe($.if(args.verbose, $.print()))
			.pipe($.sass())
			.pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%']}))
			.pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
	clean(config.temp + '**/*.css', done);
});

gulp.task('sass-watcher', function() {
	gulp.watch([config.sass], ['styles']);
});

///////////////////////////////

function clean(path, done) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path, done());
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
