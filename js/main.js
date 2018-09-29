$ = window.jQuery = require('jquery');

const {remote, ipcRenderer} = require("electron");

var currentWindow = remote.getCurrentWindow();
var isMoving = false;
var originalPosition = {};

function hide() {
    remote.getCurrentWindow().minimize();
}

function openWindow(urlToOpen){
    ipcRenderer.send("newWindowRequest", urlToOpen);
}

