const {remote} = require("electron");

function hide(){
    remote.getCurrentWindow().minimize();
}