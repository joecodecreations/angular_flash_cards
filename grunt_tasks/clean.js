module.exports = function (grunt, pkg, paths, connect) {
    grunt.config.merge({
        // https://www.npmjs.com/package/grunt-contrib-clean
        clean: {
            dist: ['./public_html/assets/css/styles.css', './public_html/assets/js/app.js']
        }

    });
};
