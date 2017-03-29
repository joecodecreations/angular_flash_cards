var Card = require('../../models/card');
var Deck = require('../../models/deck');

module.exports = function (app) {

    /* Grab All Cards By Alexa Phrase */
    app.route('/api/alexa/:alexa_phrase')

        .get(function (req, res) {
            //get the deck information

            try {
                Deck.findOne({
                    'alexa': req.params.alexa_phrase
                }, function (err, deck) {
                    if (err) {
                        throw (err);
                    }

                    try {
                        var deck_ID = deck.id,
                            canSkipQuestions = deck.canSkipQuestions,
                            deckTitle = deck.title;

                        //get all the cards with this deck
                        Card.find({
                            'group_id': deck_ID
                        }, function (err, cards) {

                            res.json({
                                message: "success",
                                title: deckTitle,
                                cards: cards
                            });

                        });
                    } catch (err) {
                        console.log(err);
                        res.json({
                            message: "carderror",
                            title: deckTitle,
                            cards: cards
                        });
                    }

                });
            } catch (error) {
                console.log(err);
                res.json({
                    message: "deckerror",
                    title: deckTitle,
                    cards: cards
                });
            }
        });

};
