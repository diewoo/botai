'use strict'
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    methodOverride = require('method-override');
const cool = require('cool-ascii-faces');
const mongoose=require('mongoose');    
//conexion a mongo lab
const database = process.env.MONGO_URL || 'mongodb://diewoo:webcamdelima123@ds129030.mlab.com:29030/bot-ai';
    mongoose.connect(database,function(err,res){
        if(err) throw err;
             console.log(`Connected to Database!! `);
        });
//puerto de conexion
const port = process.env.PORT || 5000;
//ruta de los routers
const maquina = require('./routes/maquina');

//middleware para la web
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
    //fin del middlware
});
//ruta de los paths
app.use('/maquina', maquina);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.locals.pretty = true;

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
app.get('/cool',function(req,res){
    res.status(200).send(`<h1>Todo ok papus!</h1>`+ cool());
});

app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(port, function() {
    console.log(`Servidor ejecutandose en el puerto: ${port}`);
});