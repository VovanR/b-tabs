// See: http://gulpjs.com/
'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var changedFile = null;

gulp.task('lint', function () {
    return gulp.src(changedFile || ['./static/js/**/*.js', './static/test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify(function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        }))
        .pipe(jscs());
});

gulp.task('test', function () {
    return gulp
        .src('./static/test/**/*-test.html')
        .pipe(mochaPhantomJS({ reporter: 'spec' }));
});

gulp.task('watch', function () {
    gulp.watch(['./static/js/**/*.js', './static/test/**/*.js'], function (e) {
            changedFile = e.path;
            gulp.run('lint');
        });
});

gulp.task('default', ['lint']);
