const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const api = require('./router');

// Controllers (route handlers)
// import * as homeController from './controllers/home';

// Create Express server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', 3333);

app.use('/api', api);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports.server;
