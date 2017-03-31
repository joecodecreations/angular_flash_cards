/* secured resources not shared on github */
require('./private/resources.js');


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://' + resources.USERNAME + ':' + resources.PASSWORD + 'localhost:' + resources.PORT + '/flashcardquiz';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});
