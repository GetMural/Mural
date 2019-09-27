var app = require('electron').app;
var Window = require('electron').BrowserWindow; // jshint ignore:line
var Tray = require('electron').Tray; // jshint ignore:line
var Menu = require('electron').Menu; // jshint ignore:line
var path = require('path');
const fs = require('fs-extra')
var nativeImage = require('electron').nativeImage;
const USER_DATA_FOLDER = app.getPath('userData');

// copy the data folder for new users.
function checkDirectories(directory) {
    const DATA_DIR = path.join(USER_DATA_FOLDER, 'data')
    const DIST_DIR = path.join(USER_DATA_FOLDER, 'dist')
  try {
    fs.statSync(DATA_DIR);
  } catch(e) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
    fs.copySync(path.join(__dirname, 'data'), DATA_DIR);
  }

  try {
    fs.statSync(DIST_DIR);
  } catch(e) {
    fs.mkdirSync(DIST_DIR, {recursive: true});
  }
}

checkDirectories();

var server = require('./app');

var mainWindow = null;

app.on('ready', function () {
    'use strict';

    var iconPath = path.join(__dirname, 'public', 'img', 'favicon.png');
    let nimage = nativeImage.createFromPath(iconPath);
    const appIcon = new Tray(nimage);
    mainWindow = new Window({
        width: 1280,
        height: 1024,
        autoHideMenuBar: false,
        useContentSize: true,
        resizable: true,
        icon: iconPath
        //  'node-integration': false // otherwise various client-side things may break
    });

    var port = process.env.MURAL_PORT || 3000;
    mainWindow.loadURL(`http://localhost:${port}/`);

    var template = [
        {
            label: 'Application',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.reload();
                        }
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function() {
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F';
                        } else {
                            return 'F11';
                        }
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function() {
                        if (process.platform === 'darwin') {
                            return 'Alt+Command+I';
                        } else {
                            return 'Ctrl+Shift+I';
                        }
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                },
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
            ]
        },
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
    ];

    var menu = Menu.buildFromTemplate(template);
    appIcon.setToolTip('Mural');
    appIcon.setContextMenu(menu);
    Menu.setApplicationMenu(menu);

    mainWindow.focus();

});

// shut down all parts to app after windows all closed.
app.on('window-all-closed', function () {
    'use strict';
    app.quit();
});