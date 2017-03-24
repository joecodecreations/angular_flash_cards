module.exports = function (app, path) {

    app.get('/insertDirective', function (req, res) {
        res.render('.' + path + '/partials/insertCardForm.ejs', {});
    });

};
