/* jshint node: true */
"use strict";

var os           = require("os");
var opn          = require("opn");
var gulp         = require("gulp");
var gutil        = require("gulp-util");
var jshint       = require("gulp-jshint");
var uglify       = require("gulp-uglifyjs");
var rename       = require("gulp-rename");
var concat       = require("gulp-concat");
var notify       = require("gulp-notify");
var header       = require("gulp-header");
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var pkg          = require("./package.json");
var dateFormat   = require("dateformatter").format;

pkg.name         = "httpx.js";
pkg.today        = dateFormat;

var headerComment = ["/*",
					" * <%= pkg.name %>",
                    " *",
					" * @file        <%= fileName(file) %> ",
					" * @version     <%= pkg.version %> ",
					" * @description <%= pkg.description %>",
					" * @license     MIT License",
					" * @author      <%= pkg.author %>",
					" * {@link       <%= pkg.homepage %>}",
					" * @updateTime  <%= pkg.today('Y-m-d') %>",
					" */",
					"\r\n"].join("\r\n");

var headerMiniComment = "/*! <%= pkg.name %> v<%= pkg.version %> | <%= fileName(file) %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%=pkg.today('Y-m-d') %> */\r\n";

var srcFile  = "./src/httpx.js";
var distPath = "./dist";

gulp.task("build", function() {
  return gulp.src(srcFile)
            .pipe(jshint("./.jshintrc"))
            .pipe(jshint.reporter("default"))
            .pipe(header(headerComment, {pkg : pkg, fileName : function(file) {
                var name = file.path.split(file.base);
                return name[1].replace(/[\\\/]?/, "");
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest(distPath))
            .pipe(uglify()) //{outSourceMap: true}
            .pipe(gulp.dest(distPath))
            .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
                var name = file.path.split(file.base + ( (os.platform() === "win32") ? "\\" : "/") );
                return name[1].replace(/[\\\/]?/, "");
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(notify({ message: "httpx.js task complete" }));
});

gulp.task("dev", function() {
    var port = 3000;

    browserSync.init({
        server : "./",
        open   : false,
        port   : port  // default
    });

    gulp.watch(["src/**/*.js"], ["build"]);
    gulp.watch(["./examples/**/*", "./dist/**/*.js"]).on("change", reload);

    opn("http://localhost:" + port + "/examples/");
});

gulp.task("watch", function() {
    gulp.watch(srcFile, ["build"]);
});

gulp.task("default", ["build"]);