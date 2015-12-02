/**
 * Created by iguest on 12/1/15.
 */
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');


gulp.task('connect', function() {
    connect.server({
        root: 'dawg-coffee',
        livereload: true
    });
});

gulp.task('sass', function() {
    gulp.src('dawg-coffee/scss/*.scss')
        //creates a new stream
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dawg-coffee/css/'))
        .pipe(connect.reload());
});

gulp.task('uglify', function() {
    gulp.src('dawg-coffee/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('minify', function() {
    gulp.src('dawg-coffee/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
    gulp.watch('dawg-coffee/scss/*.scss', ['sass']);
});

gulp.task('copy', function() {
   gulp.src('dawg-coffee/img/*')
       .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass', 'sass:watch', 'uglify', 'connect']);