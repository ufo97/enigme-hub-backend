const fs = require("fs");
const express = require("express");
const cors = require ("cors");
const _ = require("lodash");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/getTop', (req, res) => {
    fs.readFile('./scores.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        console.log('/getTop called');
        const scores = JSON.parse(jsonString);
        scores.scores = scores.scores.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));
        console.log(scores);
        scores.scores = scores.scores.slice(0, 5);
        console.log(scores);
        res.send(JSON.stringify(scores));
    })
});

app.post('/addScore', (req, res) => {
    let scores = require('./scores.json');
    const newScore = {"nickname": req.body.nickname, "score": req.body.score};
    scores.scores.push(newScore);
    const jsonString = JSON.stringify(scores);
    fs.writeFile('./scores.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    })

    console.log("requête reçue");

    res.sendStatus(200);
});

app.listen(2999, () => console.log('App started'));