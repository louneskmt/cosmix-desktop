// PATH, REMOTE already loaded in main.js
const dialog = remote.dialog;

const confFolder = path.join(app.getPath("userData"),"/conf");

$(document).ready(function(){
    $("#saveConf").click(saveConf);
    $("#loadConf").click(loadConf);
});

function loadConf(){
    dialog.showOpenDialog({defaultPath: confFolder, extension: ".csmx"});
}
function saveConf(){
    var savePath = dialog.showSaveDialog({defaultPath: confFolder, title: "conf.json"});

    var confData = JSON.stringify($("#newMeasurementForm").serializeArray());
    fs.writeFileSync(savePath, confData);
}