module.exports = function (grunt) {

    var sassDefaultFiles = [
        'css/default.scss'
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
            'sass:dev'
        ]
    );
}