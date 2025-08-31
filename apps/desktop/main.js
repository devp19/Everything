const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    transparent: true,
    frame: false,
    vibrancy: "fullscreen-ui",
    visualEffectState: "active",
    backgroundColor: "#00000000",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    const devUrl = "http://localhost:3000";
    console.log("Loading dev URL:", devUrl);
    win.loadURL(devUrl);
    // win.webContents.openDevTools();
  } else {
    const prodPath = path.join(__dirname, "../web/out/index.html");
    console.log("Loading prod file:", prodPath);
    win.loadFile(prodPath);
  }
}

app.whenReady().then(createWindow);
