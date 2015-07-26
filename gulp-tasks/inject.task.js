module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./client/app/index-test.html')
            .pipe(plugins.inject(gulp.src('client/dist/css/vendor.css', {read: false}), {name: 'bower'}))
            .pipe(plugins.inject(gulp.src('client/dist/css/tutors.css', {read: false}), {name: 'tutorscss'}))
            .pipe(plugins.inject(gulp.src('client/dist/js/vendor.js', {read: false}), {name: 'bower'}))
            .pipe(plugins.inject(gulp.src('client/dist/js/tutors.js', {read: false}), {name: 'tutorsjs'}))
            .pipe(plugins.inject(gulp.src('client/dist/html/tutor-templates.js', {read: false}), {name: 'templates'}))
            .pipe(gulp.dest('./client/dist'));
    };
};
