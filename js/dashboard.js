var DOM = {
    modal: {
        cosmixInfos: {
            modal: $("#cosmixInfosModal"),
            div: $(""),
            h2: $(""),
            p: $(""),
            button: $(""),
            close: document.getElementsByClassName("close")[0]
        },
        openFile: {
            modal: $("#openFileModal"),
            div: $(""),
            h2: $(""),
            p: $(""),
            button: $(""),
            close: document.getElementsByClassName("close")[1]
        },
        quickMeasurement: {
            modal: $("#quickMeasurementModal"),
            div: $(""),
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
    $(DOM.modal.cosmixInfos.modal).css("display", "block");
});
$(DOM.modal.cosmixInfos.close).on('click', function () {
    $(DOM.modal.cosmixInfos.modal).css("display", "none");
});

// Ouverture et fermeture du modal openFile
$(DOM.openFile).on('click', function () {
    $(DOM.modal.openFile.modal).css("display", "block");
});
$(DOM.modal.openFile.close).on('click', function () {
    $(DOM.modal.openFile.modal).css("display", "none");
});

// Ouverture et fermeture du modal quickMeasurement
$(DOM.quickMeasurement).on('click', function () {
    $(DOM.modal.quickMeasurement.modal).css("display", "block");
});
$(DOM.modal.quickMeasurement.close).on('click', function () {
    $(DOM.modal.quickMeasurement.modal).css("display", "none");
});
$(DOM.modal.quickMeasurement.button).on('click', function () {
    $(DOM.modal.quickMeasurement.modal).css("display", "none");
});