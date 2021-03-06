"use strict";

const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const jpegtran = require("imagemin-jpegtran");
const optipng = require("imagemin-optipng");
const svgo = require("imagemin-svgo");
const svgstore = require("gulp-svgstore");
const rsp = require("remove-svg-properties").stream;
const webp = require("gulp-webp");
const twig = require("gulp-twig");
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const server = require("browser-sync").create();

const spriteSvg = [
  "build/img/**/icon-*.svg",
  "build/img/logo-footer.svg",
  "build/img/logo-htmlacademy.svg"
];

gulp.task("css", () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("copy", () =>
  gulp.src(["source/fonts/**"], { base: "source" })
  .pipe(gulp.dest("build")));

gulp.task("images-opti", () =>
  gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    jpegtran({ progressive: true }),
    optipng({ optimizationLevel: 3 }),
    svgo()
  ]))
  .pipe(gulp.dest("build/img"))
);

gulp.task("sprite", () =>
  gulp.src(spriteSvg)
  .pipe(svgstore({ inlineSvg: true, emptyFills: true }))
  .pipe(rsp.remove({
    properties: [rsp.PROPS_FILL]
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"))
);

gulp.task("webp", () =>
  gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({ quality: 90 }))
  .pipe(gulp.dest("build/img"))
);

gulp.task("template", () =>
  gulp.src("source/pages/*.html")
  .pipe(twig())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"))
);

gulp.task("js", () =>
  gulp.src("source/js/*.js")
  .pipe(minify())
  .pipe(gulp.dest("build/js"))
);

gulp.task("build", gulp.series(
  gulp.parallel("css", "js", "copy"),
  "images-opti",
  "sprite",
  gulp.parallel("webp", "template")
));

gulp.task("server", () => {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(["source/less/**/*.less", "source/blocks/**/*.less"], gulp.series("css"));

  gulp.watch("source/img/icon-*.svg", gulp.series("sprite"));

  gulp.watch("source/**/*.html", gulp.series("template"));

  gulp.watch("source/img/**", gulp.series("images-opti"));

  gulp.watch("build/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("build", "server"));
