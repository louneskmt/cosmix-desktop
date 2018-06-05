const tempsAffichageSplash = 4000;




/** Début du programme **/


const electron = require('electron')
const ansi = require("ansi-colors")

console.log(ansi.green("Démarrage du programme"))
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let splashWindow = null // Variable globale

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    transparent: true, 
    width: 900, 
    height: 600, 
    show: false, 
    titleBarStyle: 'false', 
    frame: false,  
    resizable: false, 
    maximizable: false,
    hasShadow: false})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on("ready-to-show", function(){
    switchFromSplashToMain();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', splash) //Démarre un le splash

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// Fonction pour afficher le splash
function splash(){
  splashWindow = new BrowserWindow({
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
  })

  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'pages/splash.html'),
    protocol: 'file:',
    slashes: true
  }))

  setTimeout(function () { 
    createWindow();
  }, tempsAffichageSplash);
}

function switchFromSplashToMain(){
  if(splashWindow === null) return false;

  mainWindow.show();  
  splashWindow.destroy();
  console.log(ansi.green("Aucun problème détecté. Page d'accueil ouverte..."))
}

console.log(ansi.yellow("Ouverture du splash"));
