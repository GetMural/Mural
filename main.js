const { app, BrowserWindow, Tray, Menu, dialog } = require("electron");
const path = require("path");
const fs = require("fs-extra");
const nativeImage = require("electron").nativeImage;
const USER_DATA_FOLDER = app.getPath("userData");
const DATA_DIR = path.join(USER_DATA_FOLDER, "data");
const STORIES_DIR = path.join(DATA_DIR, "stories");
const DIST_DIR = path.join(USER_DATA_FOLDER, "dist");

const Preferences = require("./models/preferences");
const preferences = new Preferences();

// copy the data folder for new users.
function checkDirectories(directory) {
  try {
    fs.statSync(DATA_DIR);
  } catch (e) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.copySync(path.join(__dirname, "data"), DATA_DIR);
  }

  try {
    fs.statSync(DIST_DIR);
  } catch (e) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
}

checkDirectories();

var server = require("./app");

var mainWindow = null;

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open Story",
        accelerator: "CmdOrCtrl+O",
        click() {
          dialog
            .showOpenDialog({
              defaultPath: STORIES_DIR,
              properties: ["openFile"],
              filters: [{ name: "Stories", extensions: ["json"] }],
            })
            .then(function (fileObj) {
              if (!fileObj.canceled) {
                const filename = path.basename(fileObj.filePaths[0]);

                preferences.readFile(null, function (err, data) {
                  data.storyboard = filename;
                  preferences.writeFile(null, data, function (err, data) {
                    if (!err) {
                      mainWindow.webContents.send("STORY_OPEN", filename);
                    }
                  });
                });
              }
            })
            .catch(function (err) {
              console.error(err);
            });
        },
      },
      {
        label: "Exit",
        accelerator: "CmdOrCtrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    role: "editMenu",
  },
  {
    role: "viewMenu",
  },
  {
    role: "windowMenu",
  },
  {
    label: "Story",
    submenu: [
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+Shift+C",
        click: function () {
          mainWindow.webContents.send("story-copy");
        },
      },
      {
        label: "Delete",
        accelerator: "CmdOrCtrl+Shift+D",
        click: function () {
          mainWindow.webContents.send("story-delete");
        },
      },
      {
        label: "Download",
        accelerator: "CmdOrCtrl+Shift+E",
        click: function () {
          mainWindow.webContents.send("story-download");
        },
      },
    ],
  },
  {
    label: "Preview",
    submenu: [
      {
        label: "Phone",
        accelerator: "Option+P",
        click: function () {
          mainWindow.webContents.send("preview-phone");
        },
      },
      {
        label: "Tablet",
        accelerator: "Option+T",
        click: function () {
          mainWindow.webContents.send("preview-tablet");
        },
      },
      {
        label: "Desktop",
        accelerator: "Option+D",
        click: function () {
          mainWindow.webContents.send("preview-desktop");
        },
      },
    ],
  },
];

app.on("ready", function () {
  var iconPath = path.join(__dirname, "public", "img", "favicon.png");
  let nimage = nativeImage.createFromPath(iconPath);
  const appIcon = new Tray(nimage);
  mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: false,
    useContentSize: true,
    resizable: true,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.maximize();
  mainWindow.show();

  var port = process.env.MURAL_PORT || 3000;
  mainWindow.loadURL(`http://localhost:${port}/`);

  const menu = Menu.buildFromTemplate(template);
  appIcon.setToolTip("Mural");
  appIcon.setContextMenu(menu);
  Menu.setApplicationMenu(menu);

  mainWindow.focus();
});

// shut down all parts to app after windows all closed.
app.on("window-all-closed", function () {
  app.quit();
});
