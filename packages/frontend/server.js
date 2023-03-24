const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const express = require('express');
const app = express();

app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:8000'
    })
);

app.use('/static', express.static(path.join(__dirname, 'build', 'static')));

app.get('/manifest.json', (req, res) => {
    express.sendFile(path.join(__dirname, 'build', 'manifest.json'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('500 Internal Server Error');
});

app.listen(3000, () => {
    console.log('server listening on: 3000');
});

