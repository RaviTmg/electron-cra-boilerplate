const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { shell } = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');
var signalR = require('signalr-client');
var client  = new signalR.client(

	//signalR service URL
	"http://localhost:1234",

	// array of hubs to be supported in the connection
	['TestHub']
    //, 10 /* Reconnection Timeout is optional and defaulted to 10 seconds */
    //, false /* doNotStart is option and defaulted to false. If set to true client will not start until .start() is called */
);
client.on(
	// Hub Name (case insensitive)
	'TestHub',	

	// Method Name (case insensitive)
	'HelloGalaincha',	

	// Callback function with parameters matching call from hub
	function(name, message) { 
		console.log("revc => " + name + ": " + message); 
	});
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1600, height: 900});
  mainWindow.loadURL(isDev ? 'http://localhost:51538/MultiShot/index.html?designname=Untitled&port=50662&multishot=true&vr=true&lighting=true' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});