const express = require('express');
const routes = express.Router();
var firebase = require('firebase');

//funcao para mostrar todos os appointments
//TODO achar um appointment especifico
routes.get('/appointments', function (req, res) {
    console.log("HTTP Get Request");
    var userReference = firebase.database().ref("/appointments");
    
    const specificAppointment = req.query;

    if (specificAppointment != null){
        userReference.orderByKey().equalTo(specificAppointment).on("child_added", function(snapshot) {
            console.log(snapshot.key);
        });
    }
    else{
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
    }
});


//funcao para criar um novo appointment e editar algum state especifico
routes.post('/appointments', function (req, res) {

	console.log("HTTP Put Request");

    const { address, patientName, dateTime, state } = req.body;

	var referencePath = '/appointments/';
	var userReference = firebase.database().ref(referencePath);
	userReference.push({ Address: address, PatientName: patientName, DateTime: dateTime, State:state }, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//TODO funcao para deltar algum appointment especifico
routes.delete('/appointments', function (req, res) {
    console.log("HTTP DELETE Request");
    res.send("HTTP DELETE Request");
});
  

module.exports = routes;