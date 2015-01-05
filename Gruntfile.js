module.exports = function (grunt) {

    var sassDefaultFiles = [
        'css/default.scss',
        'css/calendar.scss'
    ]
    var jsDefaultFiles = [
        'module/**/**.js',
        //'module/partials/**/**.js',
       // 'js/_init.js',
       // 'src/**/*.js',
       // 'partials/**/**.js'
    ]

    var htmlFiles = [
        'module/partials/**/**.html'
        //'partials/**/**.html'
    ]

    grunt.initConfig({
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto'
                },
                files: {
                    'build/default.css': 'css/default.scss',
                    'build/calendar.css': 'css/calendar.scss'
                }
            },
            prod: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    'build/default.css': 'css/default.scss',
                    'build/calendar.css': 'css/calendar.scss'
                }
            }
        },
        uglify:{
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'build/calendar.js': jsDefaultFiles
                }
            },
            prod: {
                options: {
                    sourceMap: false,
                    mangle: true
                },
                files: {
                    'build/calendar.js': jsDefaultFiles
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

            },
            calendarModule: {
                options: {
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
                },
                src: 'module/partials/**.html',
                dest: 'module/partials/template.js'
            }
        },
        watch: {
            sassFiles: {
                files: sassDefaultFiles,
                tasks: ['sass:dev'],
                options: {nospawn: true}
            },
            jsDefault: {
                files: jsDefaultFiles,
                tasks: ['ngtemplates','uglify:dev'],
                options: {nospawn: true}
            },
            htmlFiles: {
                files:htmlFiles,
                tasks: ['ngtemplates','uglify:dev'],
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