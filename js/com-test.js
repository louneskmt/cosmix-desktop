var io = require('socket.io').listen(server);

setInterval(function() {
    var data = {
        newEventsC1: Math.floor(Math.random() * 10),
        newEventsC2: Math.floor(Math.random() * 10),
        status: 'ON'
    }
    socket.emit('newData', JSON.stringify(data));

}, 2000);