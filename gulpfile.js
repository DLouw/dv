var gulp = require('gulp');
var pug = require('gulp-pug');
var beautify = require('gulp-html-beautify');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('dist/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/fontawesome-free/*css/all.css',
      './node_modules/@fortawesome/fontawesome-free/*webfonts/**/*'
    ])
    .pipe(gulp.dest('dist/vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('dist/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('dist/vendor/jquery-easing'))

  //Gsap
    gulp.src(['node_modules/gsap/src/minified/TweenMax.min.js'])
    .pipe(gulp.dest('dist/vendor/gsap'))
  
  //Scrollmagic
    gulp.src(['node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
             'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
             'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'])
    .pipe(gulp.dest('dist/vendor/scrollmagic'))


  // Simple Line Icons
  gulp.src([
      './node_modules/simple-line-icons/fonts/**',
    ])
    .pipe(gulp.dest('dist/vendor/simple-line-icons/fonts'))

  gulp.src([
      './node_modules/simple-line-icons/css/**',
    ])
    .pipe(gulp.dest('dist/vendor/simple-line-icons/css'))

});

//Compile Pug
gulp.task('pug', function() {
    return gulp.src('app/pug/**/*.pug')
     .pipe(pug())
     .pipe(beautify())
     .pipe(gulp.dest('dist'))
     .pipe(browserSync.stream());
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      'app/css/*.css'
      //'!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      'app/js/*.js'
      //'!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

gulp.task('copy', function() {

       gulp.src(['app/img/**/*'])
      .pipe(gulp.dest('dist/img'))
});

// Default task
gulp.task('default', ['css', 'js', 'vendor', 'copy', 'pug']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index: 'about.html'
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'copy', 'pug', 'browserSync'], function() {
  gulp.watch('app/scss/*.scss', ['css']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
});
