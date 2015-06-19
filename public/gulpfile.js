var gulp = require("gulp");

var concat = require("gulp-concat");
var watch = require("gulp-watch");

gulp.task("concat", function () {
    gulp.src(['app/app.js', 'app/*.js', 'app/*/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task("watch", function () {
    gulp.watch(["app/app.js", "app/*.js", "app/*/*.js"], ["concat"]);
});
