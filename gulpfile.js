`use strict`;

const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const mqpacker = require(`css-mqpacker`);
const del = require(`del`);
const gulp = require(`gulp`);
const rollup = require(`gulp-better-rollup`);
const minhtml = require(`gulp-htmlmin`);
const minjs = require(`gulp-uglify`);
const mincss = require(`gulp-csso`);
const imagemin = require(`gulp-imagemin`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const posthtml = require(`gulp-posthtml`);
const rename = require(`gulp-rename`);
const sass = require(`gulp-sass`);
const sourcemaps = require(`gulp-sourcemaps`);
const include = require(`posthtml-include`);
const run = require(`run-sequence`);
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

gulp.task(`style`, () => {
  gulp.src(`sass/style.scss`)
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer(),
    mqpacker({sort: true})
    ]))
  .pipe(gulp.dest(`build/css`))
  .pipe(server.stream())
  .pipe(mincss())
  .pipe(rename(`style.min.css`))
  .pipe(gulp.dest(`build/css`))
  .pipe(server.stream());
});

gulp.task(`scripts`, () => {
  return gulp.src(`js/application.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, `iife`))
    .pipe(sourcemaps.write(``))
    .pipe(rename(`output.js`))
    .pipe(gulp.dest(`build/js`));
});

gulp.task(`htmlmin`, () => {
  return gulp.src(`*.html`)
  .pipe(posthtml([
    include()
    ]))
  .pipe(minhtml({collapseWhitespace: true}))
  .pipe(gulp.dest(`build`))
  .pipe(server.stream());
});

gulp.task(`imagemin`, () => {
  return gulp.src(`images/**/*.{png,jpg,svg}`)
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    ]))
  .pipe(gulp.dest(`images`));
});

gulp.task(`js-watch`, [`scripts`], (done) => {
  server.reload();
  done();
});

gulp.task(`serve`, () => {
  server.init({
    server: `./build`,
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch(`sass/**/*.{scss,sass}`, [`style`]);
  gulp.watch(`*.html`, [`htmlmin`]);
  gulp.watch(`js/**/*.js`, [`js-watch`]);
});

gulp.task(`copy`, () => {
  return gulp.src([
    `fonts/**/*.{woff,woff2}`,
    `images/**`,
    ], {
    base: `.`
    })
  .pipe(gulp.dest(`build`));
})

gulp.task(`clean`, () => {
  return del(`build`)
});

gulp.task(`build`, (done) => {
  run(
    `clean`,
    `imagemin`,
    `copy`,
    `style`,
    `htmlmin`,
    `scripts`,
    done);
});
