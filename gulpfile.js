const gulp = require('gulp');
const twig = require('gulp-twig');
const watch = require('gulp-watch');

gulp.task('compile-main-template', () => gulp.src('./source/pages/index.html')
  .pipe(twig())
  .pipe(gulp.dest('./source'))
);

gulp.task('compile-catalog-template', () => gulp.src('./source/pages/catalog.html')
  .pipe(twig())
  .pipe(gulp.dest('./source'))
);

gulp.task('compile-form-template', () => gulp.src('./source/pages/form.html')
  .pipe(twig())
  .pipe(gulp.dest('./source'))
);

gulp.task('watch-templates', () => {
  gulp.watch('./source/**/*.html', [
    'compile-main-template',
    'compile-catalog-template',
    'compile-form-template'
  ]);
});
