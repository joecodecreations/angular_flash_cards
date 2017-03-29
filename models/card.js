var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Define our model for card */
var cardSchema = mongoose.Schema({
    'category': String,
    'answer': String,
    'question': String,
    'group_id': String

});

module.exports = mongoose.model('card', cardSchema);
