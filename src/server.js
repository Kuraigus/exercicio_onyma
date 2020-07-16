//modulo para encontrar variaveis de env para manter seguro a chave de API do firebase
const dotenv = require('dotenv');
dotenv.config({ path: __dirname+'\\..\\.env' });

//modulos necessarios para rodar o codigo, express para facilitar
//o API REST, firebase e firebaseConfig para conversar entre a
//API e o banco de dados, bodyParser para conseguir fazer leitura
//de body e parametros enviados como json e routes para ser possivel
//criar rotas para o express
const express = require('express'); 
const firebase = require(`firebase`);
const firebaseConfig = require('./firebaseConfig');
const bodyParser = require('body-parser');
const routes = require('./routes');

//variavel para usar o express.
var app = express();

//funcao para ser possivel receber formato json como body
app.use(bodyParser.json());

//inicializa o banco de dados
firebase.initializeApp(firebaseConfig);

//usa todas as funcoes criadas no arquivo routes.js
app.use(routes);


const port = process.env.PORT || 3333;
//inicializa o servidor na porta 3333 e manda uma mensagem mostrando o link para
//se comunicar com o servidor
var server = app.listen(port, function () {

  console.log("server listening at http://localhost:%s", port);
});