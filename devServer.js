var express = require('express');
var bodyParser = require('body-parser');
var urlStatus = require('url-status');
var nodemailer = require('nodemailer');
var fs = require('fs');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');
var portnumber = 3000; //server port number
/* initiate express server */
var app = express();
/* Allow ejs templating */
app.set('view engine', 'ejs');
/* Allow body variables */
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
/* Allow json */
app.use(bodyParser.json());
/* Set server base directory location */
app.use(express.static(__dirname + '/public_html'));


/////////////////////////////////////////
//           Mongo Database            //
////////////////////////////////////////
mongoose.connect('mongodb://localhost/flashcardquiz');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/////////////////////////////////////////
//            Database Models          //
////////////////////////////////////////
var Card = require('./data/models/card');
var Deck = require('./data/models/deck');

/////////////////////////////////////////
//           Middleware               //
////////////////////////////////////////
app.use(function (req, res, next) {

    next(); // make sure we go to the next routes and don't stop here
});

/////////////////////////////////////////
//            API    ROUTES            //
////////////////////////////////////////
require('./API/routes/root')(app);
require('./API/routes/cards')(app);
require('./API/routes/decks')(app);
/////////////////////////////////////////
//            Standard Routes          //
////////////////////////////////////////
require('./routes/standard')(app, '');
/////////////////////////////////////////
//            Directive Routes         //
////////////////////////////////////////
require('./routes/directives')(app, '');


/////////////////////////////////////////
//           Temporary Routes          //
////////////////////////////////////////
app.get('/api/cards/get/all', function (req, res) {
    Card.find({}, function (err, cards) {
        res.json(cards);

    });
});
app.get('/api/decks/get/all', function (req, res) {
    Deck.find({}, function (err, decks) {
        res.json(decks);
    });
});



module.exports = app;

app.listen(portnumber);
//console.log("Express Server with EJS Running on Port: " + portnumber);
