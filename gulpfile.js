const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const server = require('gulp-webserver');

const {series} = gulp;
sass.compiler = require('node-sass');

gulp.task('server', () => {
    return gulp.src('./')
        .pipe(server({
            livereload: true,
            open: true,
            port: 3000
        }));
});

gulp.task('sass', () => {
    return gulp.src('src/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/*.sass', series('sass'));
});

gulp.task('default', series('server', 'sass', 'watch'));