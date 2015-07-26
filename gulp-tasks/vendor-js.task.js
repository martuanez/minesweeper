module.exports = function (gulp, plugins) {
    var vendorFiles = [
        'client/app/bower_components/jquery/dist/jquery.min.js',
        'client/app/bower_components/angular/angular.min.js',
        'client/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'client/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ];
    return function () {
        gulp.src(vendorFiles)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            .pipe(plugins.order(vendorFiles))
            .pipe(plugins.concat('vendor.js'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/js/'))
            .pipe(plugins.livereload());
    };
};
