/*global require*/
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var browserify = require("browserify");
var uglify = require("gulp-uglify");

gulp.task("copy", function () {
    "use strict";
    gulp.src("./bower_components/jquery/dist/jquery.js").pipe(gulp.dest("./public/lib"));
    gulp.src("./bower_components/modernizr/modernizr.js").pipe(gulp.dest("./public/lib"));
    gulp.src("./node_modules/react/dist/react.js").pipe(gulp.dest("./public/lib"));
    gulp.src("./node_modules/react/dist/JSXTransformer.js").pipe(gulp.dest("./public/lib"));
    gulp.src("./node_modules/marked/lib/marked.js").pipe(gulp.dest("./public/lib"));
    gulp.src("./bower_components/normalize.css/normalize.css").pipe(gulp.dest("./public/css"));
});

gulp.task("browserify", function() {
    return browserify("./public/scripts/jsx-main.js")
        .bundle()
        .pipe(source("script.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./gulp_build/"));
});

gulp.task("css", function () {
    gulp.src("./public/css/*.css")
        .pipe(concat("style.css"))
        .pipe(minifyCss())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./gulp_build/"));
});

gulp.task("default", ["browserify", "css"]);