// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/
var bufferShim = require('safe-buffer').Buffer;
/*</replacement>*/

require('../common');
var assert = require('assert/');
var Duplex = require('../../').Duplex;

var stream = new Duplex({ objectMode: true });

assert(Duplex() instanceof Duplex);
assert(stream._readableState.objectMode);
assert(stream._writableState.objectMode);

var written = void 0;
var read = void 0;

stream._write = function (obj, _, cb) {
  written = obj;
  cb();
};

stream._read = function () {};

stream.on('data', function (obj) {
  read = obj;
});

stream.push({ val: 1 });
stream.end({ val: 2 });

process.on('exit', function () {
  assert.strictEqual(read.val, 1);
  assert.strictEqual(written.val, 2);
});