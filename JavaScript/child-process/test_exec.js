var TEST_EXEC = './test';

var spawn = require('child_process').spawn;
var test = spawn(TEST_EXEC);

test.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

test.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

// Simulate entering data for getchar() after 1 second
setTimeout(function() {
  test.stdin.write('\n');
}, 1000);

var TEST_EXEC = 'test';
var spawn = require('child_process').spawn;
var test = spawn(TEST_EXEC);

test.stdin.pipe(process.stdin);
test.stdout.pipe(process.stdout);
test.stderr.pipe(process.stderr);
