const tempsAffichageSplash = 4000;

/** Début du programme **/

const electron = require('electron');
const {ipcMain} = electron;
const ansi = require("ansi-colors");

console.log(ansi.green("Demarrage du programme"));
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let splashWindow = null; // Variable globale

function createWindow (urlToOpen) {
  // Create the browser window.
  var newWindow = new BrowserWindow({
    transparent: true,
    width: 900,
    height: 600,
    show: false,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    resizable: false,
    maximizable: false,
    hasShadow: true
  })
  console.log(ansi.blue(`Creation de ${urlToOpen}`));

  // and load the index.html of the app.
  newWindow.loadURL(url.format({
    pathname: path.join(__dirname, urlToOpen),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  newWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  newWindow.on("ready-to-show", function(){
    newWindow.show();
    mainWindow.destroy();
    mainWindow = newWindow;
    console.log(ansi.green(`Affichage de ${ansi.bold(mainWindow.webContents.getURL())}`));
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', splash) //Démarre le splash

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    console.log(ansi.yellow("Fin de l'execution"))
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    splash();
  }
})

// Fonction pour afficher le splash
function splash(){
  mainWindow = splashWindow = new BrowserWindow({
    width: 600,
    height: 280,
    movable: false,
    frame: false,
    resizable: false,
    hasShadow: false,
    titleBarStyle: "customButtonsOnHover",
    show: false,
    transparent: true
  });
  splashWindow.on("ready-to-show", function () {
    splashWindow.show();
  });

  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'pages/splash.html'),
    protocol: 'file:',
    slashes: true
  }));

  setTimeout(function () {
    createWindow("pages/dashboard.html");
  }, tempsAffichageSplash);
}

ipcMain.on("newWindowRequest", function (event, urlToOpen) {
  console.log(ansi.gray(`Request to open ${urlToOpen}`));
  createWindow(urlToOpen)
});

console.log(ansi.yellow("Ouverture du splash"));

