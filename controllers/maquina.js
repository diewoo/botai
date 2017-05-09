'use strict'

var mongoose = require('mongoose');
var Maquina = mongoose.model('usuario');

const processMessage = require('../helpers/processMessage');

exports.obtenerMaquina = function(req, res) {
    res.status(200).end();
}
var rptalogin = function(userid, usuario, password, mensaje, codigo, tipo) {
    return {
        status: {
            msg: mensaje,
            cod: codigo
        },
        user: {
            userid: userid,
            usuario: usuario,
            password: password,
            tipo: tipo
        }
    }
}
exports.validLogin = function(req, res) {
        var usuario = req.body.usuario;
        
        var password = req.body.password;
        Maquina.findOne({'usuario':usuario}, (err, user) => {
            var  rpta = {};
            if (user) {
                if (user.password = "123") {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin(id, req.body.usuario, password, "Login exitoso", 1)
                    res.status(200).jsonp(rpta);
                } else {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin(id, req.body.usuario, password, "Contraseña incorrecta", 0)
                    res.status(200).jsonp(rpta);
                }
            } else {
                if (err) return res.status(500).send(err.message);
                rpta = rptalogin(req.body.usuario, "No existe el usuario ", 0);
                res.status(200).jsonp(rpta);
            }
        })

    }
    /*
    exports.obtenerWebHook=function(req, res){
        const hubChallenge = req.query['hub.challenge'];

        const hubMode = req.query['hub.mode'];
        const verifyTokenMatches = (req.query['hub.verify_token'] === 'packbot is cool');

        if (hubMode && verifyTokenMatches) {
            res.status(200).send(hubChallenge);
        } else {
            res.status(403).end();
        }
    }



    exports.enviarWebHook=(req, res) => {
        if (req.body.object === 'page') {
            req.body.entry.forEach(entry => {
                entry.messaging.forEach(event => {
                    if (event.message && event.message.text) {
                        processMessage(event);
                    }
                });
            });

            res.status(200).end();
        }
    }*/
