'use strict'

const express = require('express'),
    app = express(),
    mongoose=require('mongoose');

//models
var models=require('../models/maquina')(app, mongoose);

//controller
var maquinaCTRL=require('../controllers/maquina');
var verificationController=require('../controllers/verification');
var messageWebhookController=require('../controllers/messageWebhook');
//router de la maquina
var maquina = express.Router();




/****************************/
maquina.route('/getMaquina')
        .get(maquinaCTRL.obtenerMaquina); 
//login
maquina.route('/login')
		.post(maquinaCTRL.validLogin);              
maquina.route('/obtenerUsuarios')
        .get(maquinaCTRL.obtenerUsuarios);
//fb                
maquina.route('/webhook')
		.get(verificationController.obtenerWebHook)
		.post(messageWebhookController.enviarWebHook)
//entities
maquina.route('/entities')
		.post(maquinaCTRL.cargarEntities)
		.get(maquinaCTRL.obtenerEntities)


module.exports = maquina;