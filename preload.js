const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sfd", {
    toggle: (enabled) => ipcRenderer.send("toggle-sfd", enabled) 
});