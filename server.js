const express = require('express');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const port = 3069;
const app = express();  

const public = path.join(__dirname, 'client', 'index.html');

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) =>  res.sendFile(public));

app.get('/dir', (req, res) => res.end(__dirname));

app.get('/scripts', (req, res) => {
  fs.readFile(path.join(__dirname, 'client', 'data.json'), 'utf-8', (err, json) => {
    if (err) {
      res.status(500).end(JSON.stringify(err));
      return;
    }
    res.end(json);
  });
});

app.post('/script', (req, res) => {
  const { scriptName, script/*[bashScript, bashScript]*/ } = req.body;
  fs.readFile(path.join(__dirname, 'client', 'data.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).end(JSON.stringify(err));
      return;
    }

    let parsedJson = JSON.parse(data);
    parsedJson[scriptName] = script;
    let stringifedJson = JSON.stringify(parsedJson);
    fs.writeFile(path.join(__dirname, 'client', 'data.json'), stringifedJson, (err) => {
      if (err) {
        res.status(500).end(JSON.stringify(err));
        return;
      } else {
        
      }
      res.end();
    });
  });
});

app.post('/run', (req, res) => {
  const { scriptName } = req.body;
  if (!scriptName) {
    res.status(500).end('no scriptName')
    return;
  }

  fs.readFile(path.join(__dirname, 'client', 'data.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).end(JSON.stringify(err));
      return;
    }
    let parsedJson = JSON.parse(data);
    let scriptString = parsedJson[scriptName];
    exec(scriptString);
    res.end(__dirname);
  });
});

app.post('/kill', (req, res) => {
  exec(`kill -9 $(lsof -t -i:${req.body.port})`);
  res.end();
});

app.post('/remove', (req, res) => {
  const { scriptName/*[bashScript, bashScript]*/ } = req.body;
  fs.readFile(path.join(__dirname, 'client', 'data.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).end(JSON.stringify(err));
      return;
    }

    let parsedJson = JSON.parse(data);
    delete parsedJson[scriptName];
    let stringifedJson = JSON.stringify(parsedJson);
    fs.writeFile(path.join(__dirname, 'client', 'data.json'), stringifedJson, (err) => {
      if (err) {
        res.status(500).end(JSON.stringify(err));
        return;
      } else {
        
      }
      res.end();
    });
  });
});

app.listen(port, () => console.log('Listening on port: ', port));