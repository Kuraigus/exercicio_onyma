//modulo express para deixar a API RESTful, routes recebendo o express.router
//para enviar como get, push, put e delete, firebase para funcoes utilizadas
//para conversar com o banco de dados
const express = require('express');
const routes = express.Router();
const AppointmentController = require('./controller/AppointmentsController');

//Rota para mostrar todos os appointments
routes.get('/appointments', AppointmentController.getAll);

//Rota para achar um appointment especifico
routes.get('/appointments/:id', AppointmentController.getById);

//Rota para retornar appointments com algum estado especifico
routes.get('/appointments/state/:estado', AppointmentController.getByState);

//Rota para criar um novo appointment
routes.post('/appointments', AppointmentController.CreateAppointment);

//Rota para atualizar um estado de um appointment especifico
routes.post('/appointments/state', AppointmentController.UpdateAppointment);

//Rota para deletar algum appointment especifico
routes.delete('/appointments/:id', AppointmentController.DeleteAppointment);

//exportando todas as rotas criadas
module.exports = routes;