$(document).ready(function () {
    // Appel du socket et connexion au serveur
    serverIP = '41.213.190.93';
    const io = require('socket.io-client');
    var socket = io.connect('http://' + serverIP);


    const c3 = require("c3"); // Module pour les graphiques

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
    // CONVENTION : e_{ID-DE-ELEMENT} pour désigner un objet DOM jQuery
    var e_currentStatus = $('#currentStatus');
    var e_eventsC1 = $('#eventsC1');
    var e_eventsC2 = $('#eventsC2');
    var e_totalEvents = $('#totalEvents');
    var e_coincidences = $('#coincidences');
    var e_speed = $('#speed');
    var e_average = $('#average');

    $(e_currentStatus).addClass("colOrange");
    // Colore le texte en orange pour avoir plus d'infos lors du débuggage

    speedGraph = c3.generate({
        bindto: '#speedGraph',
        data: {
            columns: [
                ['Speed', 0]
            ]
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true,
            }
        }
    });

    // Fonction de mise à jour de l'affichage
    function updateDisplay() {
        $(e_currentStatus).text(currentStatus);
        if (currentStatus == "ON") $(e_currentStatus).removeClass("colOrange");
        else $(e_currentStatus).addClass("colOrange");

        $(e_eventsC1).text(eventsObject.eventsC1);
        $(e_eventsC2).text(eventsObject.eventsC2);
        $(e_totalEvents).text(eventsObject.eventsC1 + eventsObject.eventsC2);
        $(e_coincidences).text(eventsObject.coincidences);
        $(e_speed).text(speed);

        var averageSpeed = Math.round(averageObject.average * 10) / 10;
        $(e_average).text(averageSpeed);
        speedGraph.ygrids([{
            value: averageSpeed,
            text: "x̄",
            class: "math"
        }]);
    }

    // Quand un message de type 'newData' est reçu, ajout des nouvelles valeurs,
    // calcul de la vitesse puis appel de la fonction de mise à jour de l'affichage
    socket.on('newData', function (message) {
        data = JSON.parse(message);

        eventsObject.eventsC1 += data.newEventsC1;
        eventsObject.eventsC2 += data.newEventsC2;
        eventsObject.coincidences += data.newCoincidence;
        currentStatus = data.status;

        speed = data.newCoincidence;
        averageObject.speedArray.push(speed);
        var pointsToHide = averageObject.speedArray.length > 10 ? 1 : 0; // Déplace le graphique d'un point à partir de 10 valeurs
        speedGraph.flow({
            columns: [["Speed", speed]],
            length: pointsToHide // ==> Enlever x points pour afficher la nouvelle valeur
        })


        averageObject.somme += speed;
        averageObject.average = averageObject.somme / averageObject.speedArray.length;

        updateDisplay();
    });

    // Get the modal
    var e_modal = document.getElementById('statusBox');
    var span = document.getElementsByClassName("close")[0];
    var e_serverIP = $('#serverIP');
    var e_connectionStatus = $('#connectionStatus');

    $(e_currentStatus).on('click', function () {
        e_modal.style.display = "block";

        $(e_serverIP).text(serverIP);

        if (socket.connected) $(e_connectionStatus).text("CONNECTED");
        else $(e_connectionStatus).text("DISCONNECTED");

        var startTime;
        
        setInterval(function () {
            startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        socket.on('pong', function () {
            latency = Date.now() - startTime;
            console.log(latency);
        });
    });

    span.onclick = function () {
        e_modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == e_modal) {
            e_modal.style.display = "none";
        }
    };
});