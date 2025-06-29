const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

ipcMain.handle("print-to-pdf", async () => {
  //   const pdfData = await win.webContents.printToPDF({
  //     printBackground: true,
  //     pageSize: "A4",
  //   });

  //   const { filePath } = await dialog.showSaveDialog(win, {
  //     title: "Save PDF",
  //     defaultPath: "page.pdf",
  //     filters: [{ name: "PDF Files", extensions: ["pdf"] }],
  //   });

  //   if (filePath) {
  //     fs.writeFileSync(filePath, pdfData);
  //     return { success: true, path: filePath };
  //   }

  //   return { success: false };

  const options = {
    silent: false,
    landscape: true,
    pagesPerSheet: 1,
    pageSize: "A5",
  };
  win.webContents.print(options, (success, errorType) => {
    if (!success) console.log(errorType);
    if (success) console.log("printing...");
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
