'use strict'

const express = require('express'),
    app = express(),
    mongoose=require('mongoose');

//models
var models=require('../models/maquina')(app, mongoose);

//controller
var maquinaCTRL=require('../controllers/maquina');

//router de la maquina
var maquina = express.Router();


maquina.route('/obtenerMaquina')
        .get(maquinaCTRL.obtenerMaquina);

        
maquina.route('/obtenerUsuarios')
        .get(maquinaCTRL.obtenerUsuarios);        

/*

maquina.route('/webhook')
		.get(maquinaCTRL.obtenerWebHook)
		.post(maquinaCTRL.enviarWebHook)
//post

*/
maquina.route('/login')
		.post(maquinaCTRL.validLogin);


module.exports = maquina;