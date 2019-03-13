const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

let readData, finalData;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Welcome to rrweb api');
});

app.get('/record', (req, res, next) => {
    res.sendFile(__dirname + '/event-recorder.html');
});

app.get('/replay', (req, res, next) => {
    res.sendFile(__dirname + '/event-replay.html');
});

app.get('/read', (req, res, next) => {
    fs.readFile('./events.json', (err, data) => {
        if(err)
        throw err;
        readData = data;
        res.send(readData);
    });
});

app.post('/api', (req, res) => {
    fs.appendFile('events.json', JSON.stringify(req.body), (err) => {
        if(err) throw err;
        console.log('events updated');
    })
    res.send("event received");
});

app.listen(8102, () => {
    console.log('Server started on port 8102');
});