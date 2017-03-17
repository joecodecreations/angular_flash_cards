module.exports = function (grunt, pkg, paths, connect) {

    grunt.config.merge({
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },

            files: {
                src: "public_html/assets/js/app.js",
                dest: "public_html/assets/js/app.min.js"
            }

        },
        browserify: {
            files: {
                src: 'src/app/app.js',
                dest: 'public_html/assets/js/app.js',
            }
        }
    });
}
