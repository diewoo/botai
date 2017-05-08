'use strict'

const express = require('express'),
    app = express();

//controller
var maquinaCTRL=require('../controllers/maquina');

//router de la maquina
var maquina = express.Router();

maquina.route('/obtenerMaquina')
        .get(maquinaCTRL.obtenerMaquina);


module.exports = maquina;