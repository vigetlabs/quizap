/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulpfile.js/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

// Enable es6 in all subsequenet requires
require('babel-core/register')
// Require all tasks in gulp/tasks, including subfolders
require('require-dir')('./tasks', { recurse: true });
