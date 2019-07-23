import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import api from './router';

// Controllers (route handlers)
// import * as homeController from './controllers/home';

// Create Express server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', 3333);

app.use('/api', api);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

export default app;
