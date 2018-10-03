"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
const twig = require("gulp-twig");
const htmlbeautify = require("gulp-html-beautify");
var server = require("browser-sync").create();

const htmlbeautifyOptions = { indent_size: 2 };

gulp.task("main-css", function () {
  return gulp.src("source/less/pages/index.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("catalog-css", function () {
  return gulp.src("source/less/pages/catalog.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("form-css", function () {
  return gulp.src("source/less/pages/form.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("main-template", () => gulp.src('./source/pages/index.html')
  .pipe(twig())
  .pipe(htmlbeautify(htmlbeautifyOptions))
  .pipe(gulp.dest('./source'))
);

gulp.task("catalog-template", () => gulp.src('./source/pages/catalog.html')
  .pipe(twig())
  .pipe(htmlbeautify(htmlbeautifyOptions))
  .pipe(gulp.dest('./source'))
);

gulp.task("form-template", () => gulp.src('./source/pages/form.html')
  .pipe(twig())
  .pipe(htmlbeautify(htmlbeautifyOptions))
  .pipe(gulp.dest('./source'))
);

gulp.task('watch-templates', () => {
  gulp.watch('./source/**/*.html', [
    'main-template',
    'catalog-template',
    'form-template'
  ]);
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(["source/less/**/*.less", "source/blocks/**/*.less"], gulp.series("main-css", "catalog-css", "form-css"));
  gulp.watch(["source/blocks/**/*.html", "source/pages/*.html"], gulp.series("main-template", "catalog-template", "form-template"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("server"));
