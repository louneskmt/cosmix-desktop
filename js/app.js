const io = require('socket.io-client');
var socket = io.connect('http://41.213.190.93');

setTimeout(function() {
    var configObject = {
        GPS: 400,
        BAROMETRE: 800,
        THERMOMETRE: 900,
        START: 300,
        END: 200
    };
    socket.emit('startConfig', 'GO');
    socket.emit('configObject', JSON.stringify(configObject));
    socket.emit('stopConfig', 'STOP');
}, 5000);
