var express = require('express'); //import express 
var firebase = require(`firebase`);
const firebaseConfig = require('./firebaseConfig')
var bodyParser = require('body-parser');
const routes = require('./routes')

var app = express();
app.use(bodyParser.json());

firebase.initializeApp(firebaseConfig);

app.use(routes);

var server = app.listen(3333, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://localhost:%s", host, port);
});