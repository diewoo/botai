'use strict'
const API_AI_TOKEN = '1f5e146444b740f69146b962bf48262e';
const apiAiClient = require('apiai')(API_AI_TOKEN);
//puerto de conexion
const port = process.env.PORT || 5000;
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    methodOverride = require('method-override'),
    logger=require('morgan'),
    cool = require('cool-ascii-faces'),
    mongoose = require('mongoose'),
    cors=require('cors'),
    cookieParser = require('cookie-parser');
//conexion a mongo lab
const database = process.env.MONGO_URL || 'mongodb://diewoo:webcamdelima123@ds129030.mlab.com:29030/bot-ai';
mongoose.connect(database, function(err, res) {
    if (err) throw err;
    console.log(`Connected to Database!! `);
});

const maquina=require('./routes/maquina');


/******************************/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.locals.pretty = true;
/********router***************/
app.use('/maquina', maquina);


/**********************************cool*******/
app.get('/cool', function(req, res) {
    res.status(200).send(`<h1>Todo ok papus!</h1>` + cool());
});

app.listen(port, function() {
    console.log(`Servidor ejecutandose en el puerto: ${port}`);
});
module.exports=app;