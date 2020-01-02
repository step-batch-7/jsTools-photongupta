const assert = require('chai').assert;
const {spy, restore, fake} = require('sinon');
const {performTail, loadFromStdin} = require('../src/performAction');

describe('loadFromStdin', function() {
  afterEach(() => {
    restore();
  });
  it('should give the last 10 lines of the standard input', (done) => {
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: 'John'}));
      done(); 
    });
    const stream = {setEncoding: fake(), on: fake()};
    loadFromStdin(stream, displayMsg, '10');
    assert(stream.setEncoding.calledWith('utf8'));
    assert.isTrue(stream.on.firstCall.args.includes('data'));
    assert.isTrue(stream.on.secondCall.args.includes( 'end'));
    assert.strictEqual(stream.on.callCount, 2);
    stream.on.firstCall.args[1]('John');
    stream.on.secondCall.args[1]();    
    
  });
});

describe('performTail', function() {
  afterEach(() => {
    restore();
  });

  it('should perform tail operation if given file is present', (done) => {
    const userOptions = ['path'];
    const readFile = fake();
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: 'hi'}));
      done();
    });
    performTail(userOptions, {stdin: null, readFile}, displayMsg);
    assert.strictEqual(readFile.firstCall.args[0], 'path');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2](null, 'hi');
  });

  it('should give 10 lines if file contain more than 10 lines', (done) => {
    const userOptions = ['path'];
    const readFile = fake();
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'}));
      done();
    });
    performTail(userOptions, {stdin: null, readFile}, displayMsg);
    assert.strictEqual(readFile.firstCall.args[0], 'path');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2](null, 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('should give error if the file does not exists', (done) => {
    const userOptions = ['path'];
    const errorMsg = 'tail: path: No such file or directory';
    const readFile = fake();
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: errorMsg, output: ''}));
      done();
    });
    performTail(userOptions, {stdin: null, readFile}, displayMsg);
    assert.strictEqual(readFile.firstCall.args[0], 'path');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2]('err', null);

  });

  it('should give error when option is invalid', (done) => {
    const userOptions = ['-path'];
    const error = 'tail: illegal option -- path\nusage: ';
    const usage = 'tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
    const readFile = fake();
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: `${error}${usage }`, output: ''}));
      done();
    });
    performTail(userOptions, {stdin: null, readFile}, displayMsg);
    assert.strictEqual(readFile.firstCall.args[0], 'path');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2]('err', null);
    
  });

  it('should give error when argument of -n option is invalid', (done) => {
    const userOptions = ['-n', 'r', 'path'];
    const readFile = fake();
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: 'tail: illegal offset -- r', output: ''}));
      done();
    });
    performTail(userOptions, {stdin: null, readFile}, displayMsg);
    assert.strictEqual(readFile.firstCall.args[0], 'path');
    assert.strictEqual(readFile.firstCall.args[1], 'utf8');
    readFile.firstCall.args[2]('err', null);
  });

  it('should give last 10 lines of stdin if lines is not given', (done) => {
    const stream = {setEncoding: fake(), on: fake()};
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'}));      
      done();
    });
    performTail([], {stdin: stream, readFile: null}, displayMsg);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.callCount, 2);
    stream.on.firstCall.args[1]('a\nb\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    stream.on.secondCall.args[1]();    
   
  });

  it('should give all lines of stdin for less than N lines', (done) => {
    const stream = {setEncoding: fake(), on: fake()};
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'}));      
      done();
    });
    performTail([], {stdin: stream, readFile: null}, displayMsg);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.callCount, 2);
    stream.on.firstCall.args[1]('a\nb\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    stream.on.secondCall.args[1]();    
   
  });

  it('should give last N lines of stdin', (done) => {
    const stream = {setEncoding: fake(), on: fake()};
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: 'rohan\nrita'}));      
      done();
    });
    performTail(['-n', '2'], {stdin: stream, readFile: null}, displayMsg);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.callCount, 2);
    stream.on.firstCall.args[1]('John\nrohan\nrita');
    stream.on.secondCall.args[1]();    
   
  });

  it('should give all lines of except initial N of stdin if option has plus sign', (done) => {
    const stream = {setEncoding: fake(), on: fake()};
    const displayMsg = spy(() => {
      assert(displayMsg.calledWith({error: '', output: 'rita'}));      
      done();
    });
    performTail(['-n', '+3'], {stdin: stream, readFile: null}, displayMsg);
    assert(stream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stream.on.firstCall.args[0], 'data');
    assert.strictEqual(stream.on.secondCall.args[0], 'end');
    assert.strictEqual(stream.on.callCount, 2);
    stream.on.firstCall.args[1]('John\nrohan\nrita');
    stream.on.secondCall.args[1]();    
   
  });
});

// describe('parseOptions', function() {
//   it('should filePath, no. of lines even if option is not given', function() {
//     assert.deepStrictEqual(parseOptions(['a.txt']), {
//       filePath: 'a.txt',
//       noOfLines: '10'
//     });
//   });

//   it('should give the object containing filePath, no. of lines ', function() {
//     assert.deepStrictEqual(parseOptions(['-n', '3', 'a.txt']), {
//       filePath: 'a.txt',
//       noOfLines: '3'
//     });
//   });
// });
