module.exports = function (gulp, plugins, jsFiles) {
    return function () {
        gulp.src(jsFiles)
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.jshint.reporter('fail'));
    };
};
