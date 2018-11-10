$(document).ready(function(){
    var DOM = {
        modal: {
            cosmixInfos: {
                modal: $("#cosmixInfosModal"),
                div: $("#cosmixInfosDiv"),
                h2: $(""),
                p: $(""),
                button: $(""),
                close: document.getElementsByClassName("close")[0]
            },
            openFile: {
                modal: $("#openFileModal"),
                div: $("#openFileDiv"),
                h2: $(""),
                p: $(""),
                button: $(""),
                close: document.getElementsByClassName("close")[1]
            },
            quickMeasurement: {
                modal: $("#quickMeasurementModal"),
                div: $("#quickMeasurementDiv"),
                h2: $(""),
                p: $(""),
                button: $("#startQuickMeasurement"),
                close: document.getElementsByClassName("close")[2]
            }
        },
        infosCosmix: $("#infosCosmix"),
        openFile: $("#openFile"),
        quickMeasurement: $("#quickMeasurement")
    };
    
    // Ouverture et fermeture du modal infosCosmix
    $(DOM.infosCosmix).on('click', function () {
        $(DOM.modal.cosmixInfos.modal).addClass("show block");
    });
    $(DOM.modal.cosmixInfos.close).on('click', function () {
        $(DOM.modal.cosmixInfos.modal).removeClass("show block");
    });
    
    // Ouverture et fermeture du modal openFile
    $(DOM.openFile).on('click', function () {
        $(DOM.modal.openFile.modal).addClass("show block");
    });
    $(DOM.modal.openFile.close).on('click', function () {
        $(DOM.modal.openFile.modal).removeClass("show block");
    });
    
    // Ouverture et fermeture du modal quickMeasurement
    $(DOM.quickMeasurement).on('click', function () {
        new Modal({
            title: "Quick measurement",
            content: `
                <h3>Start a new measurement with :</h3>
                <p>
                  <input type="checkbox" name="" id="">Default parameters
                  <br/><input type="checkbox" name="" id="">Last used parameters
                </p>
            `,
            buttons: [
                {text: "Start", onclick: function(){
                    openWindow("pages/livepanel.html")
                }},
            ]
        })
    });

    $(DOM.openFile).click(function(){
        var fileModal = new Modal({
            title: "Open a file",
            content: `
                <input type="file" id="fileToOpen" accept=".csmx"/>
            `,
            buttons: [
                {text: "Open", onclick: function(){
                    alert("TODO : Open file");
                    fileModal.kill();
                }},
            ]
        })
    })
})