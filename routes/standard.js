module.exports = function (app, path, csrProtection) {

    app.get('/', function (req, res) {
        var who_is_access_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('access IP:' + who_is_access_ip);
        res.render('.' + path + '/pages/index', {});
    });

};
