const {remote} = require("electron");

function hide() {
    remote.getCurrentWindow().minimize();
}

var drag = require('electron-drag');
 
// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
var clear = drag('.closeButtons');
 
// Call the returned function to make the element undraggable again.
clear();