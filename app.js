const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//Getting the current hour
const currHour = function() {
    const date = new Date();
    const hour = date.getHours();

    return hour;
}

//Get status according to hour
const statusCode = function() {
    const hourNow = currHour();
    let state = '';
    
    if(hourNow < 12) {
        state = 'Morning';
    }else if(hourNow >= 12 && hourNow < 18) {
        state = 'Afternoon';
    }else if(hourNow >= 18) {
        state = 'Evening';
    }

    return state;
}

const dayState = `Good ${statusCode()}`;

app.get('/', (req, res) => {
    res.render('index', {dayState: dayState});
});

app.post('/result', (req, res) => {

    const { username } = req.body;
    res.render('result', {username: username});
});

app.get('/result', (req, res) => {
    res.render('default');
});

app.listen(PORT, function() {
    console.log(`Started at http://localhost:${PORT}`);
});