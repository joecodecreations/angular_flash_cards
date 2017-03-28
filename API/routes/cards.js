var Card = require('../../models/card');

module.exports = function (app) {


    app.route('/api/cards/delete')
        /* Create a new card using POST*/
        .delete(function (req, res) {
            Card.remove({

            }, function (err, card) {
                if (err) res.send(err);
                res.json({
                    message: 'All Cards Deleted'
                });
            });
        });



    app.route('/api/cards')
        /* Create a new card using POST*/
        .post(function (req, res) {
            var card = new Card(); // create a new instance of the model

            if (req.body.answer !== undefined && req.body.question !== undefined && req.body.group_id !== undefined) {
                card.category = req.body.category;
                card.answer = req.body.answer;
                card.question = req.body.question;
                card.group_id = req.body.group_id;

                card.save(function (err, success) {
                    if (err)
                        res.send(err);
                    res.json({
                        message: 'Card created!',
                        'id': success.id
                    });
                });
            } else {
                res.json({
                    message: 'Error!'
                });
            }

        });

    /* GET A CARD BY UNIQUE ID */
    app.route('/api/cards/:card_id')

        .get(function (req, res) {
            Card.findById(req.params.card_id, function (err, card) {
                if (err)
                    res.send(err);
                res.json(card);
            });


        })

        .put(function (req, res) {
            Card.findById(req.params.card_id, function (err, card) {

                if (err) res.send(err);
                if (req.body.answer !== undefined && req.body.question !== undefined && req.body.group_id !== undefined) {
                    card.category = req.body.category;
                    card.answer = req.body.answer;
                    card.question = req.body.question;
                    card.group_id = req.body.group_id;

                    // save the bear
                    card.save(function (err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'Card updated!'
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
            Card.remove({
                _id: req.params.card_id
            }, function (err, card) {
                if (err) res.send(err);
                res.json({
                    message: 'Card successfully deleted'
                });
            });
        });



};
