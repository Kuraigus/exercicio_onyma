const express = require('express');
const routes = express.Router();
var firebase = require('firebase');



//funcao para mostrar todos os appointments
routes.get('/appointments', function (req, res) {
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

//Funcao para achar um appointment especifico
routes.get('/appointments/:id', function(req, res){
    console.log("HTTP Get Request");    
    var userReference = firebase.database().ref("/appointments/");
        
    var specificAppointment = req.params.id;
    console.log(specificAppointment)

    userReference.orderByKey().equalTo(specificAppointment).on("child_added", function(snapshot) {
        console.log(snapshot.val());
        res.json(snapshot.val());
        userReference.off("child_added");
    }, 
    function(errorObject){
        console.log(`The read failed: ${errorObject.code}`);
        res.send(`The read failed: ${errorObject.code}`);
    });
});

//funcao para criar um novo appointment e editar algum state especifico
routes.post('/appointments', function (req, res) {

	console.log("HTTP Post Request");

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

//TODO funcao para atualizar um estado especifico 
routes.post('/appointments/state', function(req, res){
    console.log("HTTP Post Request");
    userReference = firebase.database().ref('appointments');

    const { id, State } = req.body;
    console.log(req.body);

    userReference.child('appointment').child(id).update({ 'State': state })

});

//funcao para deletar algum appointment especifico
routes.delete('/appointments/:id', function (req, res) {
    console.log("HTTP DELETE Request");

    var specificAppointment = req.params.id;

    var userReference = firebase.database().ref('appointments/'+specificAppointment);
    userReference.remove()
        .then(function() {
            res.send("Remove succeeded.")
        })
        .catch(function(error) {
            res.send("Remove failed: " + error.message)
        });

});
  

module.exports = routes;