module.exports = function (app) {

    app.get('*', function (req, res, next) {

        if (req.headers.host.match(/^www/) !== null) {
            res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
        } else {
            next();
        }
    });

};
