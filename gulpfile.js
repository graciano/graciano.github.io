'use strict';

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

var config = {
    "buildFolder" : "build"
};

config.sass = {
    //"files" : "sass/**/*.scss",
    "files" : "sass/style.scss",
    "buildFolder" : config.buildFolder+"/css",
    "compiled" : "all.min.css"
};

config.js = {
    "files" : "js/**/*.js",
    "buildFolder" : config.buildFolder+"/js",
    "compiled" : "all.min.js"
};
gulp.task('default', function(){
    gulp.src(config.sass.files)
        .pipe(scss())
        .pipe(concat(config.sass.compiled))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.sass.buildFolder))
        .pipe(livereload());
    gulp.src(config.js.files)
        .pipe(concat(config.js.compiled))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.buildFolder))
        .pipe(livereload());
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(config.sass.files, ['default']);
});
