'use strict';

module.exports = function(grunt) {

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
                src: [ 'src/compatibility/table.less',
                       'src/compatibility/animations.less',
                       'src/compatibility/appearance.less',
                       'src/compatibility/backgrounds.less',
                       'src/compatibility/border-image.less',
                       'src/compatibility/border-radius.less',
                       'src/compatibility/bos-shadow.less',
                       'src/compatibility/bos-sizing.less',
                       'src/compatibility/calc.less',
                       'src/compatibility/columns.less',
                       'src/compatibility/filters.less',
                       'src/compatibility/flex.less',
                       'src/compatibility/inline-block.less',
                       'src/compatibility/keyframes.less',
                       'src/compatibility/opacity.less',
                       'src/compatibility/placeholder.less',
                       'src/compatibility/scrollbar.less',
                       'src/compatibility/tab-size.less',
                       'src/compatibility/transform.less',
                       'src/compatibility/transitions.less',
                       'src/compatibility/user-select.less'
                    ],
                dest: 'dist/compatibility.less',
            },
            images: {
                src: [ 'src/images/table.less',
                       'src/images/gradients.less',
                       'src/images/quality.less',
                       'src/images/replace.less',
                       'src/images/responsive.less',
                       'src/images/sprites.less'
                    ],
                dest: 'dist/images.less',
            },
            typography: {
                src: [ 'src/typography/table.less',
                       'src/typography/drop-cap.less',
                       'src/typography/ellipsis.less',
                       'src/typography/font-size.less',
                       'src/typography/fontface.less',
                       'src/typography/hyphens.less',
                       'src/typography/line-height.less',
                       'src/typography/rhythm.less',
                       'src/typography/smoothing.less',
                       'src/typography/text-hide.less'
                    ],
                dest: 'dist/typography.less',
            },
            utilities: {
                src: [ 'src/utilities/table.less',
                       'src/utilities/center-block.less',
                       'src/utilities/clearfix.less',
                       'src/utilities/hidden.less',
                       'src/utilities/margin.less',
                       'src/utilities/padding.less',
                       'src/typography/resizable.less',
                       'src/typography/shapes.less',
                       'src/typography/tab-focus.less'
                    ],
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
