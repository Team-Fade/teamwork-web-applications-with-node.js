const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('server', () => {
    const app = require('./server');

    app.start();
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'server.js',
    });
});
