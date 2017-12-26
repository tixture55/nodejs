var fs = require('fs');

function f (flag, eventEmitter) {
    if (flag) {
        fs.readFile('textfile.txt', 'utf-8', function (err, data) {
            if (err) {
                eventEmitter.emit('error', err);
            }
            else {
                eventEmitter.emit('loaded', data);
            }
        });
    }
    else {
        eventEmitter.emit('loaded', null);
    }
}


var events = require('events');

var eventEmitter = new events.EventEmitter();
eventEmitter.on('loaded', function (text) {
    if (text) {
        console.log(text);
    }
    else {
        console.log('no data.');
    }
    console.log('data load end.');
});
eventEmitter.on('error', function (err) {
    console.error(err);
    process.exit(1);
});
f(true, eventEmitter);

console.log('data load start.');
