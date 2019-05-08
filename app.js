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

let fileName = 'events';

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

// to read the file placed inside recordings folder
app.post('/read', (req, res, next) => {
    fs.readFile('recordings/' + req.body.fileName + '.json', (err, data) => {
        if(err){
            res.status(400).send('error on reading');
        }else{
            readData = makePlayableString(data);
            res.send(readData);
        }
        
    });
});

// to record all the events in json file
app.post('/api', (req, res) => {
    fs.appendFile('recordings/' + fileName + '.json', JSON.stringify(req.body) + ',', (err) => {
        if(err){
            console.log(err);
            res.status(400).send('error on recording');
        }else{
            console.log('events updated');
            res.send("event received");
        }  
    })
});

// to get the username of the user from given token to record the file under his email
app.post('/user', (req, res) => {
    if(req.body.token !== undefined){
        connection.query(`SELECT user_id FROM temp_users WHERE token = ?`,[req.body.token], (error, userIds) => {
            if (error){
                res.status(400).send('mysql error');
                console.log(error);
            } else{
                if(userIds[0] !== undefined){
                    connection.query(`SELECT email from users WHERE id = ?`, userIds[0].user_id, (error, email) => {
                        if(error){
                            res.status(400).send('mysql error');
                            console.log(error);
                        }
                        res.send(email);
                        // giving email first part as filename
                        let arrFileName = email[0].email.split('@');
                        fileName = arrFileName[0];
                    });
                }else{
                    res.status(400).send('no user with the token');
                    console.log(error);
                }
                
            }
        });
    }else{
        res.status(400).send('no token error');
    } 
});

// take the string from file and remove additional comma and add front back brackets to make valid json array
function makePlayableString(argument){
    let stringArgument = argument.toString();
    stringArgument = stringArgument.substring(0, stringArgument.length - 1);
    let playableString = '[' + stringArgument + ']';
    return playableString;
}

app.listen(8102, () => {
    console.log('Server started on port 8102');
});