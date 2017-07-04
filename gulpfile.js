/* globals process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const constants = require('./utils/constants');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || constants.port;

gulp.task('server', () => {
    const app = require('./app');

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'app.js',
    });
});
