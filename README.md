# Onyma Project

Exercicio desenvolvido pela onyma com objetivo de praticar nodejs com firebase

## Tecnologias usadas

API feita em node.js utilizando um banco de dados nao relacionavel firebase, modulos utilizados 
para a facilitacao de criar uma API RESTful, eles sendo: express, nodemon, dotenv e bodyparser.
hosting gratuito utilizando heroku-cli

## Maior dificuldade no desenvolvimento

Maior dificuldade em entender funcoes e possibilidades para fazer a utilizacao correta do banco de dados,
depois que o momento de aprendizado do banco de dados foi realizado, os metodos foram completadas mais
facilmente

## O que nao consegui realizar

- Pensar em como criar uma forma de autenticação para acesso aos dados
    - Falta de conhecimento em firebase para desenvolvimente de logica
- Como criptografar os dados do endereço do paciente, por exemplo
    - Falta de conhecimento em firebase para desenvolvimente de logica

## Material de apoio

Artigos sobre firebase, video-aulas de comunicacao entre nodejs e firebase, e colegas mais experientes nas ferramentas
ajudando na perfomance e boas praticas das ferramentas.

# HOW TO

## Node_modules install

Para fazer a instalacao dos modulos so rodar o seguinte comando dentro do diretorio:

```
npm install
```

## DataBase

dentro do .env.examples existe o exemplo do que voce precisa para o arquivo do .env para fazer a conexao com o banco de dados, o banco de dados usado foi o Firebase realtime database

## START SERVER

Existem duas maneiras para se iniciar o servidor, sendo elas:

```
npm run StartServer
npm run start
```

A diferenca entre os dois sao:

- StartServer
    - utiliza o pacote nodemon, logo o servidor atualiza mudancas automaticamente

- start
    - utiliza o start padrao do node, tendo que resetar todo o servidor caso alguma mudanca seja feita

## LOCAL

API esta programada para iniciar o servidor na porta 3333, caso queira mudar, e apenas necessario mudar a variavel encontrado dentro do arquivo server.js:

```javascript
const port = process.env.PORT || PORTA QUE VC DESEJA;
```