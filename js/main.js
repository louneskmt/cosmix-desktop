$ = window.jQuery = require('jquery');

const {remote} = require("electron");
var currentWindow = remote.getCurrentWindow();
var isMoving = false;
var originalPosition = {};

function hide() {
    remote.getCurrentWindow().minimize();
}


