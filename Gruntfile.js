'use strict';

module.exports = function(grunt) {

    var files = [
        'package.json',
        'Gruntfile.js',
        'src/**/*.js',
        'spec/**/*.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsbeautifier: {
            files: files,
            options: {
                'brace_style': 'collapse',
                'eval_code': false,
                'indent_case': false,
                'indent_char': ' ',
                'indent_level': 0,
                'indent_size': 4,
                'indent_with_tabs': false,
                'jslint_happy': false,
                'keep_array_indentation': false,
                'keep_function_indentation': false,
                'max_preserve_newlines': 10,
                'preserve_newlines': true,
                'space_before_conditional': true,
                'unescape_strings': false
            }
        },

        jshint: {
            files: files,
            options: {
                globals: {
                    describe: true,
                    expect: true,
                    it: true
                },
                boss: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                globalstrict: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                sub: true,
                undef: true
            }
        },

        jasmine_node: {
            specNameMatcher: "spec",
            projectRoot: ".",
            forceExit: true
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['jshint', 'jsbeautifier', 'jasmine_node']);
};
