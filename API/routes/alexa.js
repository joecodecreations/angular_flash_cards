var Card = require('../../data/models/card');
var Deck = require('../../data/models/deck');

module.exports = function (app) {

    /* Grab All Cards By Alexa Phrase */
    app.route('/api/alexa/:alexa_phrase')

        .get(function (req, res) {
            //get the deck information
            Deck.findOne({
                'alexa': req.params.alexa_phrase
            }, function (err, deck) {
                if (err) {
                    console.log(err);
                }

                var deck_ID = deck.id,
                    canSkipQuestions = deck.canSkipQuestions,
                    deckTitle = deck.title;

                //get all the cards with this deck
                Card.find({
                    'group_id': deck_ID
                }, function (err, cards) {
                    if (err) {
                        console.log(err);
                    }

                    res.json({
                        title: deckTitle,
                        cards: cards
                    });

                });

            });
        });

};
