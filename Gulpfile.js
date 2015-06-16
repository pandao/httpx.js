"use strict";

var os           = require("os");
var gulp         = require("gulp");
var gutil        = require("gulp-util");
var jshint       = require("gulp-jshint");
var uglify       = require("gulp-uglifyjs");
var rename       = require("gulp-rename");
var concat       = require("gulp-concat");
var notify       = require("gulp-notify");
var header       = require("gulp-header");
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

gulp.task("js", function() { 
  return gulp.src(srcFile)
            .pipe(jshint("./.jshintrc"))
            .pipe(jshint.reporter("default"))
            .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
                var name = file.path.split(file.base);
                return name[1].replace(/[\\\/]?/, "");
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(rename({ suffix: ".min" }))
            .pipe(uglify()) //{outSourceMap: true}
            .pipe(gulp.dest(distPath))	
            .pipe(header(headerMiniComment, {pkg : pkg, fileName : function(file) {
                var name = file.path.split(file.base + ( (os.platform() === "win32") ? "\\" : "/") );
                return name[1].replace(/[\\\/]?/, "");
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(notify({ message: "httpx.js task complete" }));
}); 

gulp.task("watch", function() {
	gulp.watch(srcFile, ["js"]);
});

gulp.task("default", function() {
    gulp.run("js");
});