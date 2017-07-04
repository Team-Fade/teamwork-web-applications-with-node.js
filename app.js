const express = require('express');
const app = express();

require('./config/app.config')(app);
require('./routers')(app);

// app.get('/404', (req, res) => {
//     return res.send('<h1>Error</h1>');
// });

// app.get('/', (req, res) => {
//     return res.render('home');
// });

// app.get('*', (req, res) => {
//     res.redirect('/404');
// });

module.exports = app;
