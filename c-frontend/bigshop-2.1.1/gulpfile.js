var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var pug = require('gulp-pug');
var watch = require('gulp-watch');

// =======================
// Move JS Files to src/js
// =======================

gulp.task('js', function () {
    return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/owl.carousel2/dist/owl.carousel.min.js',
      'node_modules/wowjs/dist/wow.min.js',
      'node_modules/jarallax/dist/jarallax.min.js',
      'node_modules/jarallax/dist/jarallax-video.min.js',
      'node_modules/jquery-waypoints/waypoints.min.js',
      'node_modules/counterup/jquery.counterup.min.js',
      'node_modules/jquery.easing/jquery.easing.min.js',
      'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
      'node_modules/jquery-nice-select/js/jquery.nice-select.min.js',
      'node_modules/jquery-ui-slider/jquery-ui.min.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(gulp.dest("src/js"))
});

// ====================================
// Move Font Awesome Fonts to src/fonts
// ====================================

gulp.task('fafonts', function () {
    return gulp.src([
      'node_modules/font-awesome/fonts/*'
    ])
        .pipe(gulp.dest('src/fonts'))
})

// ====================
// Move CSS to src/css
// ====================

gulp.task('css', function () {
    return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/owl.carousel2/dist/assets/owl.carousel.min.css',
      'node_modules/wowjs/css/libs/animate.css',
      'node_modules/jquery-nice-select/css/nice-select.css',
      'node_modules/jquery-ui-slider/jquery-ui.min.css',
      'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(gulp.dest('src/css'))
})

// ====================
// SASS to CSS Convert
// ====================

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('src/'))
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/*.scss', ['sass'])
});

// ====================
// Pug to HTML Convert
// ====================

gulp.task('pug', function buildHTML() {
    gulp.src('./src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('pug:watch', ['pug'], function () {
    gulp.watch(['./src/pug/*.pug'], ['pug']);
});

gulp.task('default', ['js', 'css', 'fafonts', 'sass', 'sass:watch', 'pug', 'pug:watch']);