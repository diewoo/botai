'use strict'

var mongoose = require('mongoose');
var Maquina = mongoose.model('users');

const processMessage = require('../helpers/processMessage');

exports.obtenerMaquina = function(req, res) {
    res.status(200).end();
}
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




   
