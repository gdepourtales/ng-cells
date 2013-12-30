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
                src: ['generated/template.js', 'src/table.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright 2013,2014 Guy de Pourtalès. Licensed under the Apache License, Version 2.0 */\n'
            },

            build: {
                src: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.css': ['css/table.css']
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
    grunt.registerTask('default', ['html2js:main', 'concat:dist', 'uglify', 'cssmin' ]);

};