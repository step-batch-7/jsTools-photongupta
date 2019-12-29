const eventEmitter = require('events');
const {
  performTail,
  parseOptions,
  loadFile,
  readStdin
} = require('../src/performAction');
const assert = require('chai').assert;

describe('loadFile', function() {
  it('should load the content of given file', function() {
    const userOptions = { filePath: 'path', noOfLines: '10' };
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback(null, 'h\nhow\nare');
    };
    const displayMsg = function(message) {
      assert.deepStrictEqual(message.output, 'h\nhow\nare');
      assert.deepStrictEqual(message.error, '');
    };
    loadFile(userOptions, reader, displayMsg);
  });

  it('should give error if the file is not present', function() {
    const userOptions = { filePath: 'path', noOfLines: '10' };
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback('err', null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, '');
      assert.strictEqual(
        message.error,
        `tail: ${userOptions.filePath}: No such file or directory`
      );
    };
    loadFile(userOptions, reader, displayMsg);
  });
});

describe('readStdin', function() {
  it('should give the last 10 lines of the standard input', function() {
    const noOfLines = '1';
    let flag = false;
    const displayMsg = function(contentToPrint) {
      flag = true;
      assert.deepStrictEqual(contentToPrint, {error: '', output: 'john'});
    };
    const stream = new eventEmitter();
    readStdin(stream, displayMsg, noOfLines);
    stream.emit('data', 'john');
    stream.emit('end', '');
    assert.isTrue(flag);
  });
});

describe('performTail', function() {
  it('should perform tail operation if given file is present', function() {
    const userOptions = ['path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback(null, 'hi');
    };
    const displayMsg = function(message) {
      assert.deepStrictEqual(message.output, 'hi');
      assert.strictEqual(message.error, '');
    };
    performTail(userOptions, null, reader, displayMsg);
  });

  it('should perform tail operation if given file is present', function() {
    const userOptions = ['path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback('err', null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, '');
      assert.strictEqual(
        message.error,
        'tail: path: No such file or directory'
      );
    };
    performTail(userOptions, null, reader, displayMsg);
  });

  it('should give error when option is not valid', function() {
    const userOptions = ['-path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback('err', null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, '');
      const error = 'tail: illegal option -- path\nusage: ';
      const use = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
      assert.strictEqual(message.error, `${error}${use}`);
    };
    performTail(userOptions, null, reader, displayMsg);
  });

  it('should give error when argument of -n option is invalid', function() {
    const userOptions = ['-n', 'r', 'path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback('err', null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, '');
      assert.strictEqual(message.error, 'tail: illegal offset -- r');
    };
    performTail(userOptions, null, reader, displayMsg);
  });

  it('should give last 10 lines of stdin if lines is not specified', function() {
    const userOptions = [];
    let flag= false;
    const stream = new eventEmitter();
    const displayMsg = function(message) {
      flag = true;
      assert.strictEqual(message.output, 'hello');
      assert.strictEqual(message.error, '');
    };
    performTail(userOptions, stream, null,  displayMsg);
    stream.emit('data', 'hello');
    stream.emit('end');
    assert.isTrue(flag);
  });
  
});

describe('parseOptions', function() {
  it('should filePath, no. of lines even if option is not given', function() {
    assert.deepStrictEqual(parseOptions(['a.txt']), {
      filePath: 'a.txt',
      noOfLines: '10'
    });
  });

  it('should give the object containing filePath, no. of lines ', function() {
    assert.deepStrictEqual(parseOptions(['-n', '3', 'a.txt']), {
      filePath: 'a.txt',
      noOfLines: '3'
    });
  });
});
