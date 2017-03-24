var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = mongoose.Schema({
    'title': String,
    'route': String,
    'backgroundColor': String,
    'canSkipQuestions': Boolean,
    'alexa': String

});
module.exports = mongoose.model('deck', deckSchema);
