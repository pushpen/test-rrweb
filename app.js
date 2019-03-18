const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

let readData;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '135790',
    database : 'tutorwizard_work'
  });

app.use(cors());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



app.get('/', (req, res, next) => {
    res.send('Welcome to rrweb api');
});

app.get('/record', (req, res, next) => {
    res.sendFile(__dirname + '/view/event-recorder.html');
});

app.get('/replay', (req, res, next) => {
    res.sendFile(__dirname + '/view/event-replay.html');
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
    fs.appendFile('events.json', JSON.stringify(req.body) + ',', (err) => {
        if(err) throw err;
        console.log('events updated');
    })
    res.send("event received");
});

app.post('/user', (req, res) => {
    if(req.body.token !== undefined){
        connection.query(`SELECT user_id FROM temp_users WHERE token = ?`,[req.body.token], (error, userIds) => {
            if (error){
                res.status(400).send('mysql error');
                console.log(error);
            } else{
                connection.query(`SELECT email from users WHERE id = ?`, userIds[0].user_id, (error, email) => {
                        if(error){
                            res.status(400).send('mysql error');
                            console.log(error);
                        }
                        res.send(email);
                });
            }
        });
    }else{
        res.status(400).send('no token error');
    } 
});

app.listen(8102, () => {
    console.log('Server started on port 8102');
});