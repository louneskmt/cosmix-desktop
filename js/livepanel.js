// Appel de la socket et connexion au serveur
const io = require('socket.io-client');
var socket = io.connect('http://41.213.190.93');

// Variables et objets
var currentStatus = "OFF";
var eventsObject = {
    eventsC1: 0,
    eventsC2: 0,
    coincidences: 0
}
var averageObject = {
    average: 0,
    speedArray: [],
    somme: 0
}
var infosObject = {
    temp: 0,
    altitude: 0,
    GPSx: 0,
    GPSy: 0
}
var speed = 0;

// Création des élements DOM
var statusElt = document.getElementById('currentStatus');
var C1EventsElt = document.getElementById('eventsC1');
var C2EventsElt = document.getElementById('eventsC2');
var totalEventsElt = document.getElementById('totalEvents');
var coincidencesElt = document.getElementById('coincidences');
var speedElt = document.getElementById('speed');
var averageElt = document.getElementById('average');

// Fonction de mise à jour de l'affichage
function updateDisplay() {
    statusElt.textContent = currentStatus;
    C1EventsElt.textContent = eventsObject.eventsC1;
    C2EventsElt.textContent = eventsObject.eventsC2;
    totalEventsElt.textContent = eventsObject.eventsC1 + eventsObject.eventsC2;
    coincidencesElt.textContent = eventsObject.coincidences;
    speedElt.textContent = speed;
    averageElt.textContent = Math.round(averageObject.average * 10) / 10;
}

// Quand un message de type 'newData' est reçu, ajout des nouvelles valeurs,
// calcul de la vitesse puis appel de la fonction de mise à jour de l'affichage
socket.on('newData', function(message) {
    data = JSON.parse(message);

    eventsObject.eventsC1 += data.newEventsC1;
    eventsObject.eventsC2 += data.newEventsC2;
    eventsObject.coincidences += data.newCoincidence;
    currentStatus = data.status;

    speed = data.newCoincidence / 2;
    averageObject.speedArray.push(speed);

    averageObject.somme += speed;
    averageObject.average = averageObject.somme / averageObject.speedArray.length;

    updateDisplay();
});
