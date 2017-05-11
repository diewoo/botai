'use strict'

var axios=require('axios');
var mongoose = require('mongoose');

const storage=require("../storage/maquina");

var rptalogin = function( user, mensaje, codigo,password) {
    return {
        status: {
            msg: mensaje,
            cod: codigo
        },
        user: {
            username: user,
            password: password,
 
        }
    }
}
var Maquina = mongoose.model('usuarios');
exports.obtenerMaquina = function(req, res) {
    var tipo = req.query.tipo;
    storage.getMaquinas(tipo, (err, docs) => {
        if (err) {
            res.status(500).send({
                msg: "Error bd"
            });
            return;
        }
        if (!docs) {
            res.send({
                cod: 0,
                msg: "No hay maquinas"
            });
        }
        res.send({
            cod: 1,
            data: docs
        });
    });
}

exports.obtenerUsuarios=function(req,res){
    

  
  //var db = mongoose.connection;
  Maquina.find(function(err,usuario){
    if(err) res.send(500,err.message);
    console.log(usuario);
    console.log('GET/usuarios')
        res.status(200).jsonp(usuario);
        
      });
};
exports.validLogin = function(req, res) {
       var username=req.body.username;
       var password=req.body.password;
       console.log(req.body.username);
        Maquina.findOne({username:username}, (err, user) => {
            var  rpta = {};
            console.log("usuario "+user);	
            if (user) {
                if (user.password = password) {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin( req.body.username ,"Login exitoso", 1,req.body.password)
                    res.status(200).jsonp(rpta);
                } else {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin( req.body.username, "Contraseña incorrecta", 0,req.body.password)
                    res.status(200).jsonp(rpta);
                }
            } else {
                if (err) return res.status(500).send(err.message);
                rpta = rptalogin(req.body.username, "No existe el usuario ", 0,req.body.password);
                res.status(200).jsonp(rpta);
            }
        });

    }

//cargar entities al api

exports.cargarEntities=function(req,res){
 res.status(200);
}
//obtener entities del api
exports.obtenerEntities=function(req,res){
    var config = {
  headers: {'Authorization': 'Bearer 0511eed9bbce47fb877d7edc87710c40'}
};
    axios.get('https://api.api.ai/v1/entities?v=20150910',config)
    .then(function(response){
        console.log(response.data); 
        console.log(response.status);
        res.status(200).jsonp(response.data);
    })
   
}   
