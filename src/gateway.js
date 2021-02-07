const express = require('express');
const cors = require('cors');
const crud = require('./connection.js');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search/:name', (req, res) => {
  crud.search(req.params.name).then(resp => {
    res.send(resp);
  });
});

app.get('/add/:name', (req, res) => {
  crud.add(req.params.name);
  return res.send('completed');
});

app.get('/update/:oldname/:newname', (req, res) => {
  crud.update(req.params.oldname, req.params.newname,);
  return res.send('completed');
});

app.get('/delete/:name', (req, res) => {
  crud.delete(req.params.name);
  return res.send('completed');
});

app.post('/save', (req, res) => {
  fs.writeFileSync("../output/output.json", JSON.stringify(req.body), "utf-8");
  res.send('save completed');
})

app.listen('3000', () =>
  console.log(`Example app listening on port 3000!`),
);
