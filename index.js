const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var window = null;

app.on("ready", () => {
    console.info('Ready');
    window = new BrowserWindow({
        fullscreen: true,
        frame: false,
        titleBarStyle: "hidden",
        autoHideMenuBar: true,
        //kiosk: true,
        //alwaysOnTop: true,
        //hasShadow: false
    });

    window.loadURL("http://shake.kurisubrooks.com/embed");
    window.openDevTools();
    window.focus();

    window.on("closed", () => {
        app.quit();
    });
});
