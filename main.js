const { app, BrowserWindow, ipcMain, screen } = require("electron");

function createWindow() {
    const window = new BrowserWindow({
        width: 400,
        height: 300,
        focusable: true,
        webPreferences: {
            preload: require("path").join(__dirname, "preload.js")
    }
});

window.loadFile("index.html");

window.on("focus", () => {
    window.setAlwaysOnTop(true);
    window.moveTop();
    window.setAlwaysOnTop(false);
});
}

function createDogWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = Math.floor(Math.random() * (width - 250));
    const y = Math.floor(Math.random() * (height - 250));
    const dogWindow = new BrowserWindow({
        width: 250,
        height: 250,
        resizable: false,
        x: x,
        y: y,
        focusable: true
});

dogWindow.loadFile("dog.html");
}

let enabled = true;

app.whenReady().then(() => {
    createWindow();

    setInterval(() => {
     if (enabled) {
        createDogWindow();
     }
    }, 150);
});

ipcMain.on("toggle-sfd", (event, value) => {
    enabled = value;
});