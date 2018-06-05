$ = window.jQuery = require('jquery');

const {remote} = require("electron");
var currentWindow = remote.getCurrentWindow();
var isMoving = false;
var originalPosition = {};

<<<<<<< HEAD
function hide(){
    currentWindow.minimize();
}
function setWindowPosition(x,y){
    currentWindow.setPosition(x,y);
}
function getWindowPosition(){
    var pos = currentWindow.getPosition();
    return {x: pos[0], y: pos[1]};
}
function autoMoveWindow(ev){
    var mouseX = ev.pageX, mouseY = ev.pageY;
    var pageX = getWindowPosition().x, pageY = getWindowPosition().y;

    if(!isMoving){
        originalPosition = getWindowPosition();
        originalMousePosition = {x: mouseX, y: mouseY};
    }

    var coeffX = originalMousePosition.x - mouseX; 
    var coeffY = originalMousePosition.y - mouseY; 

    var finalPositionX = originalPosition.x + coeffX;
    var finalPositionY = originalPosition.y + coeffY;

    setWindowPosition(finalPositionX, finalPositionY);
    
    

    setWindowPosition(mouseX, mouseY);

}

$(document).ready(function(){
    $(".closeButtons").click(autoMoveWindow);

})
=======
function hide() {
    remote.getCurrentWindow().minimize();
}

var drag = require('electron-drag');
 
// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
var clear = drag('.closeButtons');
 
// Call the returned function to make the element undraggable again.
clear();
>>>>>>> f96c6702aeab53cea83a10ec0c87f0e3cdca0d25
