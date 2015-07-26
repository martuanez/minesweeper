var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
    pattern: ['gulp-*', 'gulp.*', 'del', 'concat'],
    rename: {
        'gulp-ruby-sass': 'sass',
        'gulp-concat-util': 'concat'
    },
    lazy: false
});
var jsFiles = [
    'client/app/*.js',
    'client/app/**/*.js',
    'client/app/**/**/*.js',
    'client/app/**/**/**/*.js',
    '!client/app/bower_components/**'
];

function getTask(task) {
    return require('./gulp-tasks/' + task + '.task')(gulp, plugins, jsFiles);
}

gulp.task('lint', getTask('lint'));

gulp.task('clean', getTask('clean'));

gulp.task('vendor-styles', getTask('vendor-styles'));

gulp.task('tutors-styles', getTask('tutors-styles'));

gulp.task('vendor-js', getTask('vendor-js'));

gulp.task('tutors-js', getTask('tutors-js'));

gulp.task('html2js', getTask('html2js'));

gulp.task('watch', getTask('watch'));

gulp.task('inject', getTask('inject'));

gulp.task('connect', function () { plugins.connect.server({ root: 'app/', port: 8888 }); });

gulp.task('connectDist', function () { plugins.connect.server({ root: 'dist/', port: 9999 });});

// build task
gulp.task('build',
    ['lint', 'clean', 'vendor-styles', 'tutors-styles', 'vendor-js', 'tutors-js', 'html2js', 'connect']
);