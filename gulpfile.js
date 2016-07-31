var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    eslint = require('gulp-eslint'),
    jasmine = require('gulp-jasmine');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('test', function() {
  gulp.src('spec/test.js')
    .pipe(jasmine());
});

gulp.task('eslint', function() {
  return gulp.src(['app/script/*.js']) // lint のチェック先を指定
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', ['webserver']);
