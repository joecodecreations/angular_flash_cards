var Card = require('../../models/card');
var Deck = require('../../models/deck');

module.exports = function (app) {

    /* Grab All Cards By route token */
    app.route('/api/gather/:route')

        .get(function (req, res) {
            //get the deck information
            try {
                Deck.findOne({
                    'route': req.params.route
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
                                'message': "success",
                                'canSkipQuestions': deck.canSkipQuestions,
                                'backgroundColor': deck.backgroundColor,
                                'alexa': deck.alexa,
                                'title': deckTitle,
                                'cards': cards
                            });

                        });
                    } catch (err) {
                        console.log(err);
                        res.json({
                            message: "carderror",
                            title: '',
                            cards: ''
                        });
                    }

                });
            } catch (error) {
                console.log(err);
                res.json({
                    message: "no deck",
                    title: '',
                    cards: ''
                });
            }
        });

};
