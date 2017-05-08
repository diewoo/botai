'use strict'

const express = require('express'),
    app = express();

//controller
var maquinaCTRL=require('../controllers/maquina');

//router de la maquina
var maquina = express.Router();


maquina.route('/obtenerMaquina')
        .get(maquinaCTRL.obtenerMaquina);
maquina.route('/webhook')
		.get(maquinaCTRL.obtenerWebHook)
		.post(maquinaCTRL.enviarWebHook)
//post


module.exports = maquina;