'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';
import fs from 'fs'
import {database} from '../db'
import {processEpub} from '../loadEpub'
import {browser} from '../browser'

const isDevelopment = process.env.NODE_ENV !== 'production'

let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "..", "bridge/preload.js") // use a preload script
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  await browser.start()
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on("toMain", async (event, args) => {
  switch (args.type) {
    case "test":
      win.webContents.send("fromMain", {"type": "test", "data": {"dt":"random dt"}})
      database.insertBook('Book Title', 'path/to/bookfiles')
      break;
    case "choose_file":
      dialog.showOpenDialog(win, {
        properties: ['openFile']
      }).then(result => {
        // console.log(result.canceled)
        if(!result.canceled){
          // console.log(result.filePaths)
          processEpub(result.filePaths[0], dt => {
            // console.log(dt);
            win.webContents.send("fromMain", {"type": "new_book", "data": dt})
          })
        }
      }).catch(err => {
        console.log(err)
      })
      break;
    case "toc":
      console.log('toc')
      win.webContents.send("fromMain", {"type": "toc", "data": '123'})
      break;
    case "choose_chapter":
      console.log('chapter', args.data)
      let content = fs.readFileSync(args.data, 'utf-8');
      let tokens = JSON.parse(content)
      // console.log(tokens)
      win.webContents.send("fromMain", {"type": "chapter", "data": tokens})
      break;
    case "word":
      console.log(args)
      let t = await browser.translate(args.data)
      console.log(t)
      // database.insertWord(args.data)
      break;
    default:
      break;
  }
});