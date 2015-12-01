'use strict';
const electron = require('electron');
const app = electron.app;

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// add some command line arguments
app.commandLine.appendArgument('--disable-pinch');

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	var winOptions = {width: 1920, height: 1080};
	if(process.env['NODE_ENV'] != 'dev'){
		winOptions.kiosk = true;
		winOptions.frame = false;
		winOptions.resizable = false;
		winOptions.fullScreen = true;
		winOptions.alwaysOnTop = true;
	}
	const win = new electron.BrowserWindow(winOptions);

	win.loadURL(`file://${__dirname}/dist/index.html`);
	win.on('closed', onClosed);

	if(process.env['NODE_ENV'] == 'dev'){
		win.openDevTools();
	}

	return win;
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
