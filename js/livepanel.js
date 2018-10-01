const io = require('socket.io-client');
var socket = io.connect('http://41.213.190.93');

// Variables
var currentStatus = "ON";
var coincidences = 0;
var eventsC1 = 04;
var eventsC2 = 10;

// Elements DOM
var statusElt = document.getElementById('currentStatus');
var C1EventsElt = document.getElementById('eventsC1');
var C2EventsElt = document.getElementById('eventsC2');
var totalEventsElt = document.getElementById('totalEvents');

function updateCounters() {
    statusElt.textContent = currentStatus;
    C1EventsElt.textContent = eventsC1;
    C2EventsElt.textContent = eventsC2;
    totalEventsElt.textContent = eventsC1 + eventsC2;
}

socket.on('newData', function(message) {
    data = JSON.parse(message);

    eventsC1 += data.newEventsC1;
    eventsC2 += data.newEventsC2;

    updateCounters();
});
