var Deck = require('../../data/models/deck');

module.exports = function (app) {

    app.route('/api/decks/delete')
        .delete(function (req, res) {
            Deck.remove({

            }, function (err, deck) {
                if (err) res.send(err);
                res.json({
                    message: 'All decks Deleted'
                });
            });
        });
    app.route('/api/decks')
        /* Create a new deck using POST*/
        .post(function (req, res) {
            var deck = new Deck(); // create a new instance of the model

            if (req.body.title !== undefined && req.body.route !== undefined && req.body.canSkipQuestions !== undefined) {
                deck.title = req.body.title;
                deck.route = req.body.route;
                deck.backgroundColor = req.body.backgroundColor;
                deck.canSkipQuestions = req.body.canSkipQuestions;
                deck.alexa = req.body.alexa;

                // save the bear and check for errors
                deck.save(function (err, success) {
                    if (err)
                        res.send(err);
                    res.json({
                        message: 'Deck created!',
                        id: success.id
                    });
                });
            } else {
                res.json({
                    message: 'Error!'
                });
            }

        });

    /* GET A DECK BY UNIQUE ID */
    app.route('/api/decks/:deck_id')

        .get(function (req, res) {
            Deck.findById(req.params.deck_id, function (err, deck) {
                if (err)
                    res.send(err);
                res.json(deck);
            });


        })

        .put(function (req, res) {
            Deck.findById(req.params.deck_id, function (err, deck) {

                if (err) res.send(err);
                if (req.body.title !== undefined && req.body.route !== undefined && req.body.canSkipQuestions !== undefined) {
                    deck.title = req.body.title;
                    deck.route = req.body.route;
                    deck.backgroundColor = req.body.backgroundColor;
                    deck.canSkipQuestions = req.body.canSkipQuestions;
                    deck.alexa = req.body.alexa;
                    // save the bear
                    deck.save(function (err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'Deck updated!'
                        });
                    });

                } else {
                    res.json({
                        message: 'Error!'
                    });
                }
            });
        })
        .delete(function (req, res) {
            Deck.remove({
                _id: req.params.deck_id
            }, function (err, deck) {
                if (err) res.send(err);
                res.json({
                    message: 'Deck successfully deleted'
                });
            });
        });



};
