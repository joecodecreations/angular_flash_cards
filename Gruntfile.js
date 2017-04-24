'use strict';
module.exports = function (grunt) {
  var pkg = require('./package.json'),
    paths = {
      src: './src',
      dist: './public_html'
    };

  /* Local Server Variables Information */
  var connect = {
    port: 3000,
    liveReloadPort: 35729,
    hostname: '127.0.0.1',
    localHost: '127.0.0.1'
  };

  // Note: The following is not loaded by 'load-grunt-tasks'.
  //grunt.loadNpmTasks('gruntify-eslint');
  require('./grunt_tasks/sass.js')(grunt, pkg, paths, connect);
  require('./grunt_tasks/server.js')(grunt, pkg, paths, connect);
  require('./grunt_tasks/watch.js')(grunt, pkg, paths, connect);
  require('./grunt_tasks/clean.js')(grunt, pkg, paths, connect);
  require('./grunt_tasks/javascript.js')(grunt, pkg, paths, connect);

  grunt.config.merge({
    pkg: grunt.file.readJSON('package.json')
  });

  require('load-grunt-tasks')(grunt);


  grunt.registerTask('processSass', 'Process sass code.', [
    'sass_globbing',
    'sass',
    'postcss'

  ]);

  grunt.registerTask('processJavascript', 'Process sass code.', [
    'browserify',
    'exec:ngAnnotate',
    'uglify'


  ]);

  grunt.registerTask('default', 'Clean the dist directory, compile Sass, minify the results.', [
    'clean',
    'processSass',
    'processJavascript'

  ]);

  // grunt.registerTask('lint', 'Lint the JS code.', [
  //   'eslint'
  // ]);

  grunt.registerTask('custom', 'Roll your own task order', function (additionalTasks) {
    var tasks = [],
      n = 0,
      e = 0;
    if (additionalTasks !== undefined) {
      var taskList = additionalTasks.split(',');
      taskList.forEach(function (taskName) {
        e = (n < 1) ? '\n\n\n' : '';
        n++;
        if (grunt.task.exists(taskName)) {
          tasks.push(taskName);
          grunt.log.writeln(e + '[SUCCESS] Registering task:' + taskName);
        } else {
          grunt.log.writeln(e + '[ERROR] Could not find grunt task:' + taskName);
        }
      });
    }
    if (tasks.length) {
      grunt.log.writeln('\n\n Starting tasks...');
      grunt.task.run(tasks);
    } else {
      grunt.log.writeln('you have not added any tasks.....terminating');
    }

  });

  grunt.registerTask('watcher', 'Compiles your sass and watches for changes', function (additionalTasks) {
    var tasks = [];

    if (additionalTasks !== undefined) {
      var taskList = additionalTasks.split(',');
      taskList.forEach(function (taskName) {
        if (grunt.task.exists(taskName)) {
          tasks.push(taskName);
          grunt.log.writeln('[SUCCESS] Pushing Task for use:' + taskName);
        } else {
          grunt.log.writeln('[ERROR] Could not Find Grunt Task:' + taskName);
        }
      });
    }
    tasks.push(
      'processSass',
      'processJavascript',
      'watch'
    );

    // Kick off the task runs
    grunt.task.run(tasks);
  });

  grunt.registerTask('startServer', 'start server', function (additionalTasks) {
    var tasks = [];

    if (additionalTasks !== undefined) {
      var taskList = additionalTasks.split(',');
      taskList.forEach(function (taskName) {
        if (grunt.task.exists(taskName)) {
          tasks.push(taskName);
          grunt.log.writeln('[SUCCESS] Pushing Task for use:' + taskName);
        } else {
          grunt.log.writeln('[ERROR] Could not Find Grunt Task:' + taskName);
        }
      });
    }

    tasks.push('watch');
    // Kick off the task runs
    grunt.task.run(tasks);
  });
};
