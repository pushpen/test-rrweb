const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api', (req, res) => {
    fs.appendFile('events.json', JSON.stringify(req.body) + ',', (err) => {
        if(err) throw err;
        console.log('events updated');
    })
    res.send(req.body);

});

app.listen(8102, () => {
    console.log('Server started on port 8102');
});