
const gulp = require("gulp");
const htmlmin = require('gulp-html-minifier');
const csso = require('postcss-csso');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const jsmin = require('gulp-jsmin');
const squoosh = require('gulp-libsquoosh');
const webp = require('gulp-webp');
const svgStore = require('gulp-svgstore');


// копирование нужных файлов в папку build;
// минификация стилей;
// сборка спрайтов;
// оптимизация изображений.

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

const style = () => {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
      csso ()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build'));
}

const js = () => {
  return gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('build'));
}

exports.js = js;

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}
exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    // .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

exports.copyImages = copyImages;

const createWebp = () => {
  return gulp.src('source/img/**/*{img,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}

exports.createWebp = createWebp;

const sprite = () => {
  return gulp.src('source/img/icon/*.svg')
    .pipe(svgStore({
      inlineSvg: true
    }))
    .pipe(rename('sprite_v2.svg'))
    .pipe(gulp.dest('build/img'));
}

exports.sprite = sprite;

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico",
    "source/img/*.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest('build/img'));
  done();
}

exports.copy = copy;

exports.default = gulp.series(
  // html,
  // style,
  // js,
  copyImages,
  // createWebp,
  //sprite
);
