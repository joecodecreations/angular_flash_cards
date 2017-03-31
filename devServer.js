var express = require('express');
var bodyParser = require('body-parser');
var urlStatus = require('url-status');
var nodemailer = require('nodemailer');
var fs = require('fs');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');
// var csrf = require('csurf');
// var cookieParser = require('cookie-parser');
var portnumber = 5000; //server port number
var mongoose = require('mongoose');
var resources = require('./private/resources.js');

// /* Security Token */
// var csrfProtection = csrf({
//     cookie: true
// });
// var parseForm = bodyParser.urlencoded({
//     extended: false
// });


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
/* Use Cookie Parser for security tokens*/
// FINISH THIS SETUP LATER CSRF!!!
// app.use(cookieParser());
// app.use(csrf());
// app.use(function (req, res, next) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     return next();
// });

/////////////////////////////////////////
//           Mongo Database            //
////////////////////////////////////////
mongoose.connect('mongodb://' + resources.USERNAME + ':' + resources.PASSWORD + 'localhost:' + resources.PORT + '/admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/////////////////////////////////////////
//            Database Models          //
////////////////////////////////////////
var Card = require('./models/card');
var Deck = require('./models/deck');

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
require('./API/routes/alexa')(app);
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
