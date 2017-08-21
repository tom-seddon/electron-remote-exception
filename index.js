'use strict';

const electron = require('electron');
const url = require('url');
const path = require('path');


let win;

function createWindow() {
    win = new electron.BrowserWindow({ width: 1440, height: 850 });

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}

function isMac() {
    return process.platform === 'darwin';
}

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', () => {
    if (isMac()) {
        // On OS X it's usual for the program to stick around after its last
        // window was closed.
    } else {
        electron.app.quit();
    }
});

electron.app.on('activate', () => {
    if (isMac()) {
        if (!win) {
            createWindow();
        }
    }
});
