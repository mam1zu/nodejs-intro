const redis = require('./lib/redis');
const express = require('express');
const path = require('path');
const usersHandler = require('./handlers/users');

const app = express();

app.get('/', (req, res) => {

    res.render(path.join(__dirname, 'views', 'index.ejs'));

});

app.get('/user/:id', async (req, res) => {

    try {

        const user = await usersHandler.getUser(req);
        res.status(200).json(user);

    } catch (err) {

        console.error(err);
        res.status(500).send('Internal Server Error');

    }

});

app.get('/api/users', async (req, res) => {
    
    try {

        const users = await usersHandler.getUsers(req);

        res.status(200).json(users);

    } catch (err) {

        console.error(err);
        res.status(500).send('Internal Server Error\n');

    }
});

app.use('/public', express.static(path.join(__dirname, 'public')));

redis.connect()
    .once('ready', async () => {

        try {

            await redis.init();

            app.listen(process.env.PORT, () => {
                console.log('server.js is listening on port:', process.env.PORT);
            });

        } catch (err) {

            console.error(err);
            process.exit(1);

        }

    })
    .on('error', (err) => {

        console.error(err);
        process.exit(1);

    });