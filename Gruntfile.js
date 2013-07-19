module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        destName: 'classical',
        LICENSE: grunt.file.read("LICENSE"),
        concat: {
            options: {
                separator: '\n\n',
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n<%= LICENSE %>\n*/\n\n'
            },
            dist: {
                src: [
                    "libs/objectTools.js/dist/objectTools.js",
                    "src/baseConfig.js",
                    "src/EventEmitter.js",
                    "src/*.js",
                    "src/handleParams.js",
                    "src/Plugins/*.js"
                ],
                dest: 'dist/<%= destName %>.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some' //Licences
            },
            dist: {
                files: {
                    'dist/<%= destName %>.min.js': ['dist/<%= destName %>.js']
                }
            }
        },
        jshint: {
            files: ['src/*.js'],
            options: {
                boss: true,
                globals: {
                    module: true
                }
            }
        },
        watch: {
            src: {
                files: '<%= concat.dist.src %>',
                tasks: ['jshint', 'concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('lint', ['jshint']);

    grunt.registerTask('minify', ['concat', 'uglify']);

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};