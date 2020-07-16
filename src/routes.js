//modulo express para deixar a API RESTful, routes recebendo o express.router
//para enviar como get, push, put e delete, firebase para funcoes utilizadas
//para conversar com o banco de dados
const express = require('express');
const routes = express.Router();
const firebase = require('firebase');


//funcao para mostrar todos os appointments
routes.get('/appointments', (req, res) => {
    console.log("HTTP Get Request");
    
    //variavel de referencia para o link
    var userReference = firebase.database().ref("/appointments");
    
    //mostra todos os valores de chaves encontradas
    userReference.on("value",
        function(snapshot){
            console.log(snapshot.val()); //mostra no console os valores(nao e necessario)
            res.json(snapshot.val()); //manda como resposta os valores
            userReference.off("value");
        },
        function(errorObject){ //caso a funcao de mostrar os appointments nao funcione, enviara uma mensagem de error como resposta
            console.log(`The read failed: ${errorObject.code}`);
            res.send(`The read failed: ${errorObject.code}`);
        });
});

//Funcao para achar um appointment especifico
routes.get('/appointments/:id', (req, res) => {
    console.log("HTTP Get Request");    
    
    //variavel de referencia para o link
    var userReference = firebase.database().ref("/appointments/");
    
    //variavel recebe o parametro enviado pelo link, procurando especificamente como id
    var specificAppointment = req.params.id;
    
    //funcao usa a variavel com o id guardado anteriormente para procurar sua ocorrencia
    userReference.orderByKey().equalTo(specificAppointment).on("child_added", function(snapshot) {
        console.log(snapshot.val()); //mostra no console os valores do id encontrado(nao e necessario)
        res.json(snapshot.val()); //manda como resposta os valores do id encontrado
        userReference.off("child_added");
    }, 
    function(errorObject){ //caso a funcao de mostrar o appointment especifico nao funcione, enviara uma mensagem de error
        console.log(`The read failed: ${errorObject.code}`);
        res.send(`The read failed: ${errorObject.code}`);
    });
});

//funcao para criar um novo appointment e editar algum state especifico
routes.post('/appointments', (req, res) => {

	console.log("HTTP Post Request");

    //essas variaveis recebem os parametros enviados via body
    const { address, patientName, dateTime, state } = req.body;

    //Essas variaveis criam a referencia do firebase
	var referencePath = '/appointments/';
	var userReference = firebase.database().ref(referencePath);
    
    //funcao para salvar o dado(automaticamente gerando um id)
    userReference.push({ address, patientName, dateTime, state })
        .then(function(){  //caso a funcao de salvar o dado funcione normalmente, ele manda uma resposta de sucesso
			res.send("Data saved successfully.");
        })
        .catch(function(error){ //caso a funcao de salvar um dado de algum erro, ele mandara uma mensagem de erro mais o motivo
            res.send("Data could not be saved." + error);    
		});
});

//funcao para atualizar um estado de um appointment especifico 
routes.post('/appointments/state', (req, res) => {
    console.log("HTTP Post Request");
    
    //variavel de referencia para o link
    userReference = firebase.database().ref('/appointments');

    //pego o que foi mandando pelo body e guardo nas duas variaveis
    const { id, state } = req.body;

    //procuro o id que me foi enviado pelo body para mudar seu state
    userReference.child(id).update({ state })
        .then(function() { //caso a funcao de atualizar um estado funcione normalmente, ele manda uma resposta de sucesso
            res.send("Data updated successfully.")
        })
        .catch(function(error) { //caso a funcao de atualizar um estado de algum erro, ele mandara uma mensagem de erro mais o motivo
            res.send("Data Coult not be updated." + error)
        });
});

//funcao para deletar algum appointment especifico
routes.delete('/appointments/:id', (req, res) => {
    console.log("HTTP DELETE Request");

    //essa variavel recebe o parametro especificado no link
    var specificAppointment = req.params.id;

    //variavel de referencia e criada com o link de appointments + o caminho especificado no parametro
    var userReference = firebase.database().ref('appointments/'+specificAppointment);
    userReference.remove()
        .then(function() { //caso a funcao de remove funcione normalmente, ele manda uma resposta de sucesso
            res.send("Remove succeeded.")
        })
        .catch(function(error) { //caso a funcao de remove de algum erro, ele mandara uma mensagem de erro mais o motivo
            res.send("Remove failed: " + error.message)
        });

});
  
//exportando todas as rotas criadas
module.exports = routes;