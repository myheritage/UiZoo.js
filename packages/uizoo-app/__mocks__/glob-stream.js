const events = require('events');
const util = require('util');

let MockReadStream = function (){};
util.inherits(MockReadStream, events.EventEmitter);
MockReadStream.prototype.write = function (msg) {
    this.emit('data', msg);
};
MockReadStream.prototype.end = function () {
    this.emit('end');
};
let stream = new MockReadStream();
let gs = () => stream;
gs.stream = stream;
module.exports = gs;