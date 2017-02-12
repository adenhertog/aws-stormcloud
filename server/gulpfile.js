var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var mocha = require('gulp-mocha');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var cp = require('child_process');
var tsb = require('gulp-tsb');

// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('./src/server/styles/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./dist/public/stylesheets'));
});


// run mocha tests in the ./tests folder
gulp.task('test', function () {

    return gulp.src('./tests/test*.js', { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha());
});

// run browser-sync on for client changes
gulp.task('browser-sync', ['buildAll', 'nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["dist/public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});

// run nodemon on server file changes
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'dist/www.js',
        watch: ['dist/**/*.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});

// TypeScript build for /src folder, pipes in .d.ts files from typings folder 
const transpiler = tsb.create('tsconfig.json');
gulp.task('build', function () {
    return gulp.src(['src/**/*.ts'])
        .pipe(transpiler()) 
        .pipe(gulp.dest('dist'));
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts 
var tsConfigTests = tsb.create('src/tests/tsconfig.json');
gulp.task('buildTests', function () {
    // pipe in all necessary files
    return gulp.src(['src/tests/**/*.ts'])
        .pipe(tsConfigTests()) 
        .pipe(gulp.dest('tests'));
});

// watch for any TypeScript or LESS file changes
// if a file change is detected, run the TypeScript or LESS compile gulp tasks
gulp.task('watch', ['build', 'buildTests', 'less'], function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('tests/**/*.ts', ['buildTests']);
    gulp.watch('src/server/styles/**/*.less', ['less']);
}); 

gulp.task('buildAll', ['build', 'buildTests', 'less']);
gulp.task('default', ['browser-sync']);
