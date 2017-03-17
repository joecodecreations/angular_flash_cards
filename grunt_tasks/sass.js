module.exports = function (grunt, pkg, paths, connect) {
    grunt.config.merge({

        sass: {
            options: {
                sourceMap: true
            },
            srcFolder: {
                files: [{
                    expand: false,
                    src: './src/sass/styles.scss',
                    dest: './public_html/assets/css/styles.css'
                }]
            },
        },

        // https://github.com/nDmitry/grunt-postcss
        postcss: {
            options: {
                annotation: true,
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: [
                            'last 2 Chrome versions',
                            'Firefox >= 45',
                            'last 2 Safari versions',
                            'last 3 ie version',
                            'last 1 Edge version',
                            'last 4 iOS versions',
                            'last 3 Android versions'
                        ]
                    }), //end auto prefixer
                    require('cssnano')()
                ]
            },
            dist: {
                expand: false,
                /*update this when moving to dist */
                src: './public_html/assets/css/styles.css',
                dest: './public_html/assets/css/styles.css'
            }
        },
        // https://github.com/DennisBecker/grunt-sass-globbing
        sass_globbing: {
            app: {
                files: {
                    'src/sass/globbed/__components.scss': 'src/sass/components/**/*.scss',
                    'src/sass/globbed/__global.scss': 'src/sass/global/**/*.scss',
                    'src/sass/globbed/__base.scss': 'src/sass/base/**/*.scss'
                },
                options: {
                    useSingleQuotes: false
                }
            }
        }


    });
};
