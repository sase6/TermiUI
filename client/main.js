const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const port = 3069;

exec('node server.js', (a,b,c) => console.log({a,b,c}));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 450,
    height: 700,
    autoHideMenuBar: true
  });

  win.loadURL(`http://localhost:${port}/`);
  win.on('close', () => {
    exec(`kill -9 $(lsof -t -i:${port})`);
  });
};

app.whenReady()
.then(() => createWindow());