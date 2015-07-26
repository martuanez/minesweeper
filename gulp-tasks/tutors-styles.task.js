module.exports = function (gulp, plugins) {
    return function () {
        plugins.sass (['client/app/main.scss'], { sourcemap: true })
            .on('error', function (err) {
                console.error('Error', err.message);
            })
            .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
            .pipe(plugins.minifyCss())
            .pipe(plugins.concat('tutors.css'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/css/'))
            .pipe(plugins.livereload());

    };
};