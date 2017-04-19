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
var portnumber = 3000; //server port number
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

mongoose.connect('mongodb://' + resources.USERNAME + ':' + resources.PASSWORD + '@127.0.0.1:' + resources.PORT + '/admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:' + resources.PORT));
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



/* email uses this */
app.post(resources.EMAILROUTE, function (req, res) {

  var name = req.body.name,
    email = req.body.email,
    message = req.body.message;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //service: 'SMTP',
    host: resources.EMAILHOST,
    port: 25,
    secure: false, // upgrade later with STARTTL
    auth: {
      user: resources.EMAILUSER,
      pass: resources.EMAILPASS
    }
  });

  var mainMessage = '';

  mainMessage += '<b>Name:</b> ';
  if (name) {
    mainMessage += name;
  } else {
    mainMessage += 'No name provided';
  }
  mainMessage += '<br /><b>Email:</b> ';
  if (email) {
    mainMessage += email;
  } else {
    mainMessage += 'No Email Provided';
  }
  mainMessage += '<br /><b>Message:</b><br />';
  if (message) {
    mainMessage += message;
  } else {
    mainMessage += "No Message Attached";
  }

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"👻 Flash Card Quiz 👻" <server@flashcardquiz.com>',
    to: 'help@flashcardquiz.com',
    subject: 'Contact Us Form (Flash Card Quiz)',
    text: 'Hello world ?',
    html: mainMessage
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //return console.log(error);
      res.send('Mail Error');
    }
    res.send('Mail Sent');
  });



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
