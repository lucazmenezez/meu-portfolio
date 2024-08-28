const { spawn } = require("child_process");
const { flatten } = require("lodash");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        copy: {
            development: {
                files: [
                    // Copia os arquivos CSS e outros arquivos necessários para o ambiente dev
                    { expand: true, cwd: 'src/styles/', src: ['**/*.css'], dest: 'dev/styles/' },
                    { expand: true, cwd: 'src/scripts/', src: ['**/*.js'], dest: 'dev/scripts/' },
                    { expand: true, cwd: 'src/images/', src: ['**/*.{png,jpg,gif,svg}'], dest: 'dev/images/' },
                    { expand: true, cwd: 'src/', src: ['index.html', 'thanks.html'], dest: 'dev/' },
                ]
            },
            dist: {
                files: [
                    // Copia o HTML final para a pasta dist
                    { expand: true, cwd: 'prebuild/', src: ['index.html', 'thanks.html'], dest: 'dist/' },
                    { expand: true, cwd: 'src/images/', src: ['**/*.{png,jpg,gif,svg}'], dest: 'dist/images/' },
                ]
            },
            favicon: {
                expand: true,
                cwd: 'src/images/',
                src: ['code_slash.svg'],
                dest: 'dist/images/'
            }
        },

        cssmin: {
            production: {
                options: {
                    compress: true,
                    rebase: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.css'
                }
            }
        },
        watch: {
            copy: {
                files: ['src/styles/**/*.css', 'src/scripts/**/*.js', 'src/index.html', 'src/thanks.html'],
                tasks: ['copy:development', 'replace:dev']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.js'
                        },
                        {
                            match: 'ENDERECO_DO_THANKS',
                            replacement: 'http://127.0.0.1:5501/dev/thanks.html'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html', 'src/thanks.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        },
                        {
                            match: 'ENDERECO_DO_THANKS',
                            replacement: 'http://127.0.0.1:5501/dist/thanks.html'
                        },
                        {
                            match: /url\(\.\.\/images\//g,
                            replacement: 'url(images/'
                        },
                        {
                            match: /src\/images\//g,
                            replacement: 'images/'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html', 'prebuild/thanks.html'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['dist/styles/*.css'],
                        dest: 'dist/styles/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html',
                    'prebuild/thanks.html': 'src/thanks.html'
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'dist/images/'
                }]
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['cssmin:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify',  'copy:dist', 'copy:favicon', 'imagemin:dist'])
}