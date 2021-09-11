const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const htmlmin = require('gulp-html-minifier');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const jsmin = require('gulp-jsmin');
// const squoosh = require('gulp-libsquoosh');
const webp = require('gulp-webp');
const svgStore = require('gulp-svgstore');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

// build tasks

const buildHtml = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

const buildStyles = () => {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
      csso ()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build'));
}

const buildJs = () => {
  return gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('build'));
}

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
}

const createWebp = () => {
  return gulp.src('source/img/**/*{img,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}

const createSprite = () => {
  return gulp.src('source/img/icon/*.svg')
    .pipe(svgStore({
      inlineSvg: true
    }))
    .pipe(rename('sprite_v2.svg'))
    .pipe(gulp.dest('build/img'));
}

const copyOther = () => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico",
    "source/img/*.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest('build/img'));
  // done();
}

const build = () => {
  buildHtml();
  buildStyles();
  buildJs();
  copyImages();
  // optimizeImages();
  createWebp();
  createSprite();
  copyOther();

  return new Promise(function(resolve, reject) {
    resolve();
  });
}

exports.default = gulp.series(
  styles, server, watcher
);

exports.build = build;
// exports.build = gulp.series(
//   build
// );
