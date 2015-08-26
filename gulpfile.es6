import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import del from 'del';

gulp.task('compile:scripts', () => {
  return gulp.src('src/scripts/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(babel({stage: 0}))
    .pipe(gulp.dest('.tmp/scripts'))
  ;
});

gulp.task('bundle', ['compile:scripts'], () => {
  return browserify('.tmp/scripts/bundle/bootstrap.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('app/scripts'))
  ;
});

gulp.task('copy:scripts', ['compile:scripts'], () => {
  return gulp.src('.tmp/scripts/*.js')
    .pipe(gulp.dest('app/scripts'))
  ;
});

gulp.task('scripts', ['bundle', 'copy:scripts']);

gulp.task('watch', () => {
  gulp.watch('src/scripts/**/*.{js,jsx}', ['scripts']);
});

gulp.task('clean', (done) => del(['app/scripts', '.tmp'], done.bind(this)));

