var express = require('express');
var bodyParser = require('body-parser');
var urlStatus = require('url-status');
var nodemailer = require('nodemailer');
var fs = require('fs');
var http = require('http');
var https = require('https');
var helmet = require('helmet');
var mongoose = require('mongoose');
var resources = require('./private/resources.js');
// var mongoose = require('mongoose');
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
/* Stricter HTTPS */
app.use(helmet({
  hsts: true
}));

/////////////////////////////////////////
//           Mongo Database            //
////////////////////////////////////////
mongoose.connect('mongodb://' + resources.USERNAME + ':' + resources.PASSWORD + '@localhost:' + resources.PORT + '/admin');
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
  console.log(req.protocol + '://' + req.get('Host') + req.url);

  next(); // make sure we go to the next routes and don't stop here
});



/////////////////////////////////////////
//       SPECIALIZED REDIRECTS         //
////////////////////////////////////////
require('./routes/www'); // remove WWW and send to HTTPS
/////////////////////////////////////////
//            API    ROUTES            //
////////////////////////////////////////
require('./API/routes/root')(app);
require('./API/routes/cards')(app);
require('./API/routes/decks')(app);
require('./API/routes/alexa')(app);
require('./API/routes/gather')(app);
/////////////////////////////////////////
//            Standard Routes          //
////////////////////////////////////////
require('./routes/standard')(app, './angular_flash_cards/views');
/////////////////////////////////////////
//            Directive Routes         //
////////////////////////////////////////
require('./routes/directives')(app, './angular_flash_cards/views');

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

/* email uses this */
app.post(resources.EMAILROUTE, function (req, res) {

  var name = req.body.name,
    email = req.body.email,
    message = req.body.message;

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
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
  var mailOptions = {
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


app.get('/*', function (req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('../angular_flash_cards/views/pages/index', {});
});

module.exports = app; //Export instead of creating server
