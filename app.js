'use strict'
const API_AI_TOKEN = '1f5e146444b740f69146b962bf48262e';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    methodOverride = require('method-override');
const cool = require('cool-ascii-faces');
const mongoose = require('mongoose');
//conexion a mongo lab
const database = process.env.MONGO_URL || 'mongodb://diewoo:webcamdelima123@ds129030.mlab.com:29030/bot-ai';
mongoose.connect(database, function(err, res) {
    if (err) throw err;
    console.log(`Connected to Database!! `);
});

const maquina=require('./routes/maquina');
const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/maquina', maquina);
app.use(methodOverride());
app.locals.pretty = true;


app.get('/cool', function(req, res) {
    res.status(200).send(`<h1>Todo ok papus!</h1>` + cool());
});

app.get('/', verificationController);
app.post('/', messageWebhookController);
//puerto de conexion
const port = process.env.PORT || 5000;
//ruta de los routers

app.listen(port, function() {
    console.log(`Servidor ejecutandose en el puerto: ${port}`);
});
