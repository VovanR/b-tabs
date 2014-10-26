// See: http://gulpjs.com/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('lint', function () {
    return gulp
        .src(['./index.js', './test/index-test.js', './gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('less', function () {
    gulp.src('./css/style.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8'],
            cascade: false,
        }))
        .pipe(csso())
        .pipe(gulp.dest('./css/build'));
});

gulp.task('test', function () {
    return gulp
        .src('./test/index-test.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec',
        }));
});

gulp.task('watch', function () {
    gulp.watch(['./css/**/*.less'], ['less']);
});

gulp.task('default', ['lint', 'test']);
