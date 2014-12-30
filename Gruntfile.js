module.exports = function (grunt) {

    var sassDefaultFiles = [
        'css/default.scss'
    ]
    var jsDefaultFiles = [
        'js/_init.js',
        'js/**/*.js',
        'partials/**/**.js'
    ]

    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto'
                },
                files: {
                    'build/default.css': 'css/default.scss'
                }
            },
            prod: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    'build/default.css': 'css/default.scss'
                }
            }
        },
        uglify:{
            dev: {
                options: {
                    sourceMap: false,
                    mangle: false
                },
                files: {
                    'build/default.js': jsDefaultFiles
                }
            },
            prod: {
                options: {
                    sourceMap: false,
                    mangle: true
                },
                files: {
                    'build/default.js': jsDefaultFiles
                }
            }
        },
        ngtemplates: {
            app: {
                options: {
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
                },
                src: 'partials/**.html',
                dest: 'partials/template.js'

            }
        },
        watch: {
            sassFiles: {
                files: sassDefaultFiles,
                tasks: ['sass:dev'],
                options: {nospawn: true}
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default',
        [
            'sass:dev',
            'ngtemplates',
            'uglify:dev',
            'watch'
        ]
    );
    grunt.registerTask('prod',
        [
            'sass:prod',
            'ngtemplates',
            'uglify:prod'
        ]
    );
}