module.exports = function (gulp, plugins) {
    return function (cb) {
        plugins.del(['client/dist/**'], cb);
    };
};
