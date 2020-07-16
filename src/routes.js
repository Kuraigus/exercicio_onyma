//modulo express para deixar a API RESTful, routes recebendo o express.router
//para enviar como get, push, put e delete, firebase para funcoes utilizadas
//para conversar com o banco de dados
const express = require('express');
const routes = express.Router();
const firebase = require('firebase');
const { query } = require('express');


//funcao para mostrar todos os appointments
routes.get('/appointments', (req, res) => {
    console.log("HTTP Get Request");

    //variavel de referencia para o link
    var userReference = firebase.database().ref("/appointments");

    //mostra todos os valores de chaves encontradas
    userReference.once("value")
        .then(function (snapshot) {
            res.json(snapshot.val()); //manda como resposta os valores
            userReference.off("value");
        })
        .catch(function (error) { //caso a funcao de mostrar os appointments nao funcione, enviara uma mensagem de error como resposta
            res.status(500).send('Internal Server Error.');
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
    userReference.orderByKey().equalTo(specificAppointment).once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) { //verifica se o snapshot encontrou o appointment especificado no parametro, caso encontrou, ele mostra seus valores
                res.json(snapshot.val()); //manda como resposta os valores do id encontrado
                userReference.off("value");
            }
            else { //caso nao enctonre o appointmente especificado no parametro, mandara uma mensagem de error
                res.status(404).send("ID not found.")
            }
        })
        .catch(function (error) {
            res.status(500).send("Internal Server Error.")
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
        .then(function () {  //caso a funcao de salvar o dado funcione normalmente, ele manda uma resposta de sucesso
            res.status(201).send("Data saved successfully.");
        })
        .catch(function (error) { //caso a funcao de salvar um dado de algum erro, ele mandara uma mensagem de erro mais o motivo
            res.status(400).send("Data could not be saved." + error);
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
    var query = userReference.orderByKey().equalTo(id);
    query.once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) { //verifica se o snapshot encontrou o id, caso encontrou, ele realiza o update
                snapshot.ref.child(id).update({ state });
                res.send("Data updated Succesfully."); //caso a funcao de atualizar um estado funcione normalmente, ele manda uma resposta de sucesso
            }
            else { //caso o snapshot nao encontre o id, envia um erro 404
                res.status(404).send("ID not found, data could not be updated.");
            }
        })
        .catch(function () {
            res.status(500).send("Internal Server Error."); //caso a funcao de atualizar um estado de algum erro, ele mandara uma mensagem de erro mais o motivo
        });
});

//funcao para deletar algum appointment especifico
routes.delete('/appointments/:id', (req, res) => {
    console.log("HTTP DELETE Request");

    //essa variavel recebe o parametro especificado no link
    var specificAppointment = req.params.id;

    //variavel de referencia e criada com o link de appointments + o caminho especificado no parametro
    var userReference = firebase.database().ref('appointments/');

    //procuro o id que me foi enviado pelo body para mudar seu state
    var query = userReference.orderByKey().equalTo(specificAppointment);
    query.once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) { //verifica se o snapshot encontrou o specificAppointment, caso encontrou, ele realiza o remove
                snapshot.ref.child(specificAppointment).remove();
                res.send("Data removed Succesfully."); //caso a funcao de atualizar um estado funcione normalmente, ele manda uma resposta de sucesso
            }
            else { //caso o snapshot nao encontre o specificAppointment, envia um erro 404
                res.status(404).send("ID not found, data could not be removed.");
            }
        })
        .catch(function () {
            res.status(500).send("Internal Server Error."); //caso a funcao de atualizar um estado de algum erro, ele mandara uma mensagem de erro mais o motivo
        });
});

//exportando todas as rotas criadas
module.exports = routes;