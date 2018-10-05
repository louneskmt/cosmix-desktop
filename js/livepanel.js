$(document).ready(function () {
    const c3 = require("c3"); // Module pour les graphiques
    const io = require('socket.io-client');

    var DOM = {
        modal: {
            popup: {
                div: $("#popup"),
                h2: $("#popup_h2"),
                p: $("#popup_p"),
                button: $("#popup_button"),
            }
        },
        currentStatus: $('#currentStatus'),
        eventsC1: $('#eventsC1'),
        eventsC2: $('#eventsC2'),
        totalEvents: $('#totalEvents'),
        coincidences: $('#coincidences'),
        speed: $('#speed'),
        average: $('#average'),

        serverIP: $('#serverIP'),
        connectionStatus: $('#connectionStatus'),
        latency: $('#latency'),

        tabSelectors: {
            measurementsDiv: $('#measurementsDiv'),
            speedDiv: $('#speedDiv'),
            otherDiv: $('#otherDiv'),
            statusDiv: $('#statusDiv')
        },

        tabs: {
            measurements: $('#measurementsTab'),
            speed: $('#speedTab'),
            other: $('#otherTab'),
            status: $('#statusTab')
        },
        
    };

    var serverIP = '41.213.190.93';
    var serverPort = '80';
    var socket = -1;

    try{
        socket = io.connect('http://' + serverIP + ':' + serverPort);
    }catch(except) {
        console.error(except);

        $(DOM.modal.popup.h2).text("Connection failed")
        $(DOM.modal.popup.p).html(`<pre>${except}</pre>`)
        $(DOM.modal.popup.button).text("OK")
        $(DOM.modal.popup.button).text("OK")
        $(DOM.modal.popup).addClass("show");

        setTimeout(function(){
            $(DOM.modal.popup).removeClass("show"); // TO BE CHANGED
        }, 3000)
    }
    

    var measurements = {
        status: "OFF",
        startTime: 0,
        events:{
            C1: 0,
            C2: 0,
            coincidences: 0,
            speed: {
                array: [],
                average: 0,
                somme: 0
            }
        },
        environnement:{
            temp: 0,
            GPSx: 0,
            GPSy: 0,
        },
    }

    // Création des élements DOM
    // CONVENTION : e_{ID-DE-ELEMENT} pour désigner un objet DOM jQuery

    $(DOM.currentStatus).addClass("colOrange");
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
        $(DOM.currentStatus).text(measurements.status);
        if (measurements.status == "ON") $(DOM.currentStatus).removeClass("colOrange");
        else $(DOM.currentStatus).addClass("colOrange");

        $(DOM.eventsC1).text(measurements.events.C1);
        $(DOM.eventsC2).text(measurements.events.C2);
        $(DOM.totalEvents).text(measurements.events.C1 + measurements.events.C2);
        $(DOM.coincidences).text(measurements.events.coincidences);
        $(DOM.speed).text(speed);

        var averageSpeed = Math.round(measurements.events.speed.average * 10) / 10;
        $(DOM.average).text(averageSpeed);
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
        var speedObject = measurements.events.speed
        speedObject.array.push(speed);
        var pointsToHide = speedObject.array.length > 10 ? 1 : 0; // Déplace le graphique d'un point à partir de 10 valeurs
        speedGraph.flow({
            columns: [["Speed", speed]],
            length: pointsToHide // ==> Enlever x points pour afficher la nouvelle valeur
        })


        speedObject.sum += speed;
        speedObject.average = speedObject.somme / speedObject.array.length;

        updateDisplay();
    });





    // Définition des éléments jQuery de la page (onglet et boutons indicateurs latéraux)
    var currentTab = 'speed';

    // Au clic sur un des boutons latéraux, affichage de l'onglet correspondant (appel de la fontion updateTab)
    /*$(e_measurementsDiv).on('click', function () {
        currentTab = 'measurements';
        updateTab(e_measurementsTab, e_measurementsDiv);
    });
    $(e_speedDiv).on('click', function () {
        currentTab = 'speed';
        updateTab(e_speedTab, e_speedDiv);

    });
    $(e_otherDiv).on('click', function () {
        currentTab = 'other';
        updateTab(e_otherTab, e_otherDiv);
    });
    $(e_statusDiv).on('click', function () {
        currentTab = 'status';
        updateTab(e_statusTab, e_statusDiv);
    });*/

    // Fontion updateTab 
    function updateTab(newTabToDisplay, currentDiv) {
        $('.currentTab').hide();
        $('.currentTab').removeClass('currentTab');
        $('.selected').removeClass('selected');
        $(currentDiv).addClass('selected');
        $(newTabToDisplay).addClass('currentTab');
        $(newTabToDisplay).show();
    }
    

    setInterval(function () {
        if (socket.connected) {
            $(DOM.connectionStatus).text("CONNECTED");
            $('#connectionStatusDisplay').css('background-color', 'rgb(89, 243, 28)');
            $('#connectionStatusDisplay').css('border-color', 'rgb(89, 243, 28)');
        } else {
            $(DOM.connectionStatus).text("DISCONNECTED");
            $('#connectionStatusDisplay').css('background-color', 'rgb(255, 43, 43)');
            $('#connectionStatusDisplay').css('border-color', 'rgb(255, 43, 43)');
        }

        measurements.startTime = Date.now();
        socket.emit('ping');
    }, 1000);

    $(DOM.serverIP).text(serverIP);

    socket.on('pong', function () {
        latency = Date.now() - startTime;
        $(DOM.latency).text(latency);
    });

    console.log(socket);

});