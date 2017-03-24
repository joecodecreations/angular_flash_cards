module.exports = function (app) {

    app.get('/api', function (req, res) {
        res.json({
            message: 'Welcome to our API!'
        });
    });

};
