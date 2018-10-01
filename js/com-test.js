const http = require('http');
const url = require("url");
const fs = require("fs");

// Création du serveur HTTP et envoi de la page lors de la requête
server = http.createServer();

// Démarrage du Serveur
var port = 8080, adresse = "0.0.0.0"; // L'adresse 0.0.0.0 écoute toutes les IPs (locales et externes)
server.listen(port, adresse, function(){
    console.log("The server is serving. Waiter is waiting for a request.");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    setInterval(function() {
        var data = {
            newEventsC1: Math.floor(Math.random() * 10),
            newEventsC2: Math.floor(Math.random() * 10),
            status: 'ON'
        }
        socket.emit('newData', JSON.stringify(data));

    }, 2000);
});