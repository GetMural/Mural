const { app, globalShortcut, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs-extra");
const nativeImage = require("electron").nativeImage;
const USER_DATA_FOLDER = app.getPath("userData");

// copy the data folder for new users.
function checkDirectories(directory) {
  const DATA_DIR = path.join(USER_DATA_FOLDER, "data");
  const DIST_DIR = path.join(USER_DATA_FOLDER, "dist");
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

  const template = [
    {
      role: "fileMenu",
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
          accelerator: "Shift+C",
          click: function () {
            mainWindow.webContents.send("story-copy");
          },
        },
        {
          label: "Delete",
          accelerator: "Shift+D",
          click: function () {
            mainWindow.webContents.send("story-delete");
          },
        },
        {
          label: "Download",
          accelerator: "Shift+E",
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

  globalShortcut.register("Option+P", () => {
    mainWindow.webContents.send("preview-phone");
  });

  globalShortcut.register("Option+T", () => {
    mainWindow.webContents.send("preview-tablet");
  });

  globalShortcut.register("Option+D", () => {
    mainWindow.webContents.send("preview-desktop");
  });

  globalShortcut.register("Shift+C", () => {
    mainWindow.webContents.send("story-copy");
  });

  globalShortcut.register("Shift+D", () => {
    mainWindow.webContents.send("story-delete");
  });

  globalShortcut.register("Shift+E", () => {
    mainWindow.webContents.send("story-download");
  });

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
