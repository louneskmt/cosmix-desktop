const io = require('socket.io-client');

var socket = io.connect('http://41.213.190.93');

setTimeout(function() {
    socket.emit('startConfig', 'GO');
    socket.emit('config_GPS', 400);
    socket.emit('config_BAROMETRE', 800);
    socket.emit('config_THERMOMETRE', 900);
    socket.emit('config_START', 300);
    socket.emit('config_END', 200);
    socket.emit('stopConfig', 'STOP');
}, 5000);
