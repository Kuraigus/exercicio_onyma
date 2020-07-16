const dotenv = require('dotenv');
dotenv.config({ path: __dirname+'\\..\\.env' });

const express = require('express'); 
const firebase = require(`firebase`);
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');
const routes = require('./routes');


console.log(process.env);

var app = express();
app.use(bodyParser.json());

firebase.initializeApp(firebaseConfig);

app.use(routes);

var server = app.listen(3333, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://localhost:%s", port);
});