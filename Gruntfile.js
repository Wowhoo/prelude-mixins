'use strict';

module.exports = function(grunt) {
    var compatibility_pkg = grunt.file.readJSON('src/compatibility/table.json'),
        images_pkg = grunt.file.readJSON('src/images/table.json'),
        typography_pkg = grunt.file.readJSON('src/typography/table.json'),
        utilities_pkg = grunt.file.readJSON('src/utilities/table.json'),
        compatibility_table = '', images_table = '', typography_table = '', utilities_table = '',
        compatibility_src = [], images_src = [], typography_src = [], utilities_src = [];
        var table = function(value_table, value_pkg) {
          for (var i in value_pkg.table) {
            value_table += '  \// ' + value_pkg.table[i] + "\n";
          }
          return value_table;
        };
        var src = function(value_src, value_pkg, menu) {
          for (var i in value_pkg.table) {
            value_src.push(menu + value_pkg.table[i] + '.less');
          }
          return value_src;
        };
        compatibility_table = table(compatibility_table, compatibility_pkg);
        compatibility_src = src(compatibility_src, compatibility_pkg, 'src/compatibility/');
        images_table = table(images_table, images_pkg);
        images_src = src(images_src, images_pkg, 'src/images/');
        typography_table = table(typography_table, typography_pkg);
        typography_src = src(typography_src, typography_pkg, 'src/typography/');
        utilities_table = table(utilities_table, utilities_pkg);
        utilities_src = src(utilities_src, utilities_pkg, 'src/utilities/');
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },
        concat: {
            options: {
              separator: '\n\n\n',
            },
            compatibility: {
              options: {
                banner: '\//TABLE OF MIXINS\n' + compatibility_table + '\n\n',
              },
              src: compatibility_src,
              dest: 'dist/compatibility.less',
            },
            images: {
              options: {
                banner: '\//TABLE OF MIXINS\n' + images_table + '\n\n',
              },
              src: images_src,
              dest: 'dist/images.less',
            },
            typography: {
              options: {
                banner: '\//TABLE OF MIXINS\n' + typography_table + '\n\n',
              },
              src: typography_src,
              dest: 'dist/typography.less',
            },
            utilities: {
              options: {
                banner: '\//TABLE OF MIXINS\n' + utilities_table + '\n\n',
              },
              src: utilities_src,
              dest: 'dist/utilities.less',
            },
            variables: {
              src: 'src/variables.less',
              dest: 'dist/variables.less',
            }
        },
        lessimportfile: {
          options: {},
          files: {
            src: [  'dist/variables.less',
                    'dist/compatibility.less',
                    'dist/images.less',
                    'dist/typography.less',
                    'dist/utilities.less'
                  ],
            dest: 'dist/prelude-mixins.less',
          },
        },
        jsbeautifier: {
            files: ["Gruntfile.js"],
            options: {
                "indent_size": 4,
                "indent_char": " ",
                "indent_level": 0,
                "indent_with_tabs": true,
                "preserve_newlines": true,
                "max_preserve_newlines": 10,
                "jslint_happy": false,
                "brace_style": "collapse",
                "keep_array_indentation": false,
                "keep_function_indentation": false,
                "space_before_conditional": true,
                "eval_code": false,
                "indent_case": false,
                "unescape_strings": false
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-lessimportfile');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'lessimportfile']);

    grunt.registerTask('js', ['jsbeautifier']);
};
