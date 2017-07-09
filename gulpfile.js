const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

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

// gulp.task('default', ['browser-sync'], () => {
// });

// gulp.task('browser-sync', ['nodemon'], () => {
//     browserSync.init(null, {
//         proxy: 'http://localhost:3000',
//         port: 8080,
//         notify: true,
//     });
// });

// gulp.task('nodemon', (cb) => {
//     const started = false;

//     return nodemon({
//         script: 'server.js',
//     }).on('start', () => {
//         if (!started) {
//             cb();
//             started = true;
//         }
//     });
// });
