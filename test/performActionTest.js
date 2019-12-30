const {stub, spy, restore} = require('sinon');
const {performTail, parseOptions, readStdin} = require('../src/performAction');
const assert = require('chai').assert;

describe('readStdin', function() {
  afterEach(() => {
    restore();
  });
  it('should give the last 10 lines of the standard input', function() {
    const displayMsg = spy();
    const stream ={};
    stream.setEncoding = spy();
    const eventHandlers ={ data: '', end: ''};
    stream.on = stub((name, callback) => {
      eventHandlers[name] = callback;
    });
    readStdin(stream, displayMsg, '10');
    eventHandlers.data('john');
    eventHandlers.end();
    assert(stream.setEncoding.calledWith('utf8'));
    assert(displayMsg.calledWith({error: '', output: 'john'}));
  });
});

describe('performTail', function() {
  afterEach(() => {
    restore();
  });

  it('should perform tail operation if given file is present', function() {
    const userOptions = ['path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback(null, 'hi');
    };
    const displayMsg = spy();
    performTail(userOptions, null, reader, displayMsg);
    assert(displayMsg.calledWith({error: '', output: 'hi'}));
  });

  it('should give error if the file does not exists', function() {
    const userOptions = ['path'];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, 'path');
      assert.strictEqual(encoding, 'utf8');
      callback('err', null);
    };
    const displayMsg = spy();
    performTail(userOptions, null, reader, displayMsg);
    const contentToPrint = {error: 'tail: path: No such file or directory', output: ''};
    assert(displayMsg.calledWith(contentToPrint));
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
    const displayMsg = spy();
    performTail(userOptions, null, reader, displayMsg);
    const contentToPrint = {error: 'tail: illegal offset -- r', output: ''};
    assert(displayMsg.calledWith(contentToPrint));
  });

  it('should give last 10 lines of stdin if lines is not specified', function() {
    const displayMsg = spy();
    const stream ={};
    stream.setEncoding = spy();
    const callBacks ={ data: '', end: ''};
    stream.on = stub((name, callback) => {
      callBacks[name] = callback;
    });
    performTail([], stream, null, displayMsg);
    callBacks.data('john');
    callBacks.end();
    assert(stream.setEncoding.calledWith('utf8'));
    assert(displayMsg.calledWith({error: '', output: 'john'}));
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
