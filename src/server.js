var express = require('express'); //import express 
var firebase = require(`firebase`);


var app = express();
app.use(bodyParser.json());

var firebaseConfig = {
    apiKey: "AIzaSyDdWuSDbKYzmIPGcrPsPLn2otdQkKRK4so",
    authDomain: "exercicio-onyma.firebaseapp.com",
    databaseURL: "https://exercicio-onyma.firebaseio.com",
    projectId: "exercicio-onyma",
    storageBucket: "exercicio-onyma.appspot.com",
    messagingSenderId: "423332353848",
    appId: "1:423332353848:web:b2f2151f98a004e0ec53cd"
};

firebase.initializeApp(firebaseConfig);

app.get('/', function (req, res) {
    console.log("HTTP Get Request");
    var userReference = firebase.database().ref("/appointments");

    userReference.on("value",
                    function(snapshot){
                        console.log(snapshot.val());
                        res.json(snapshot.val());
                        userReference.off("value");
                    },
                    function(errorObject){
                        console.log(`The read failed: ${errorObject.code}`);
                        res.send(`The read failed: ${errorObject.code}`);
                    });
});


app.post('/', function (req, res) {
    console.log("HTTP POST Request");
    
    const { address, patientName, dateTime, state } = req.body;
    
    var referencePath = `/appointments/`+id+`/`;
    var userReference = firebase.database().ref(referencePath);
    userReference.set({ Address: address, PatientName: patientName, DateTime: dateTime, State:state })
    

});
  

app.delete('/', function (req, res) {
    console.log("HTTP DELETE Request");
    res.send("HTTP DELETE Request");
});
  

var server = app.listen(3333, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("server listening at http://localhost:%s", host, port);
});