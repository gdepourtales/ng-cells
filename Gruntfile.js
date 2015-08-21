module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



        html2js: {
            options: {
                module: 'ngc-template'
            },
            main: {
                src: ['src/**/*.tpl.html'],
                dest: 'generated/template.js'
            }
        },

        concat: {
            options: {
                separator: ''
            },

            dist: {
                src: ['src/table.js', 'generated/template.js', 'bower_components/ng-scrollable/src/ng-scrollable.js' ],
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.js'
            },

            dist_latest: {
                src: ['src/table.js', 'generated/template.js', 'bower_components/ng-scrollable/src/ng-scrollable.js'],
                dest: 'dist/latest/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright 2013,2014 Guy de Pourtalès. Licensed under the Apache License, Version 2.0 */\n'
            },

            build: {
                src: 'dist/<%= pkg.version %>/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.version %>/<%= pkg.name %>.min.js'
            },

            build_latest: {
                src: 'dist/latest/<%= pkg.name %>.js',
                dest: 'dist/latest/<%= pkg.name %>.min.js'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.version %>/<%= pkg.name %>.css': ['css/table.css', 'bower_components/ng-scrollable/min/ng-scrollable.min.css'],
                    'dist/latest/<%= pkg.name %>.css': ['css/table.css', 'bower_components/ng-scrollable/min/ng-scrollable.min.css']
                }
            },

            minify: {
                expand: true,
                cwd: 'dist/',
                src: ['<%= pkg.name %>-<%= pkg.version %>.css'],
                dest: 'dist/',
                ext: '.min.css'
            }
        }

    });

    // Load the plugin that provides the "concat" and "uglify" tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');

    // Default task(s).
    grunt.registerTask('default', ['html2js:main', 'concat:dist', 'concat:dist_latest', 'uglify', 'uglify:build_latest',  'cssmin' ]);

};