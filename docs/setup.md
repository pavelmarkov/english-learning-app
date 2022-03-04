### Modules

[Install Electron.js](https://www.techomoro.com/how-to-install-and-set-up-electron-on-windows-10/)
[Epub.js (to read epub files)](https://www.npmjs.com/package/epub)

### About Electron Security Warning (Insecure Content-Security-Policy)
[Electron security tutorial](https://electronjs.org/docs/tutorial/security)
[Electron secure communication](https://stackoverflow.com/questions/66266205/how-to-read-a-local-file-in-javascript-running-from-an-electron-app)
[electron-security-warning-after-updating](https://stackoverflow.com/questions/48854265/why-do-i-see-an-electron-security-warning-after-updating-my-electron-project-t)
[meta tag: Content-Security-Policy](https://7d3.ru/wiki/897)
[turn off](https://github.com/electron/electron/issues/19775)

### Install Vue, Vuetify
- vue create . (create app in current folder)
- vue add vuetify (choose vuetify 3)
- npm install vuetify --save
- vue add electron-builder
- npm run electron:serve

### Connect Electron + Vue
Electron - "background.js", vue - ".vue files"
- [Question (github)](https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1041)
- [ipcMain](https://www.electronjs.org/docs/latest/api/ipc-main)
- [Essence of how to do it](https://stackoverflow.com/questions/55164360/with-contextisolation-true-is-it-possible-to-use-ipcrenderer/59675116#59675116)