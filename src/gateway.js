const express = require('express');
const crud = require('./connection.js');

const app = express();

app.get('/search/:name', (req, res) => {
  crud.search(req.params.name).then(res => console.log(res));
  return res.send('completed');
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

app.listen('3000', () =>
  console.log(`Example app listening on port 3000}!`),
);
