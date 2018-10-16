$ = window.jQuery = require('jquery');

const {remote, ipcRenderer} = require("electron");

var currentWindow = remote.getCurrentWindow();
var isMoving = false;
var originalPosition = {};

function hide() {
    remote.getCurrentWindow().minimize();
}

function openWindow(urlToOpen){
    $(".bodyContainer").addClass("dark");
    ipcRenderer.send("newWindowRequest", urlToOpen);
}

// TODO
class Popup{
    constructor(obj){
        this.title = obj.title || "Alert";
        this.content = obj.content || "An error has occured";
        this.isHTML = obj.isHTML || false;
        this.buttons = obj.buttons || [{text: "OK", onclick: "close"}];
        this.class = obj.class || "";
    }
}
