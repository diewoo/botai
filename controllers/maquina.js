'use strict'

var axios = require('axios');
var mongoose = require('mongoose');
var nodemailer = require("nodemailer");

const storage = require("../storage/maquina");
require('mongoose').Promise = global.Promise




var rptalogin = function(user, mensaje, codigo, password) {
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
    //respuesta del registro al agregar un usuario
var rptaregistro = function(mensaje, codigo) {
    return {
        status: {
            msg: mensaje,
            cod: codigo
        }
    }

};
var Maquina = mongoose.model('users');
var clienteMaquina = mongoose.model('clientes');
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

exports.obtenerUsuarios = function(req, res) {



    //var db = mongoose.connection;
    Maquina.find(function(err, usuario) {
        if (err) res.send(500, err.message);
        console.log(usuario);
        console.log('GET/usuarios')
        res.status(200).jsonp(usuario);

    });
};
exports.validLogin = function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body.username);
        Maquina.findOne({ username: username }, (err, user) => {
            var rpta = {};
            console.log("usuario " + user);
            if (user) {
                if (user.password = password) {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin(req.body.username, "Login exitoso", 1, req.body.password)
                    res.status(200).jsonp(rpta);
                } else {
                    if (err) return res.status(500).send(err.message);
                    rpta = rptalogin(req.body.username, "Contraseña incorrecta", 0, req.body.password)
                    res.status(200).jsonp(rpta);
                }
            } else {
                if (err) return res.status(500).send(err.message);
                rpta = rptalogin(req.body.username, "No existe el usuario ", 0, req.body.password);
                res.status(200).jsonp(rpta);
            }
        });

    }
    /*****registro usuario */
exports.registrarUsuario = function(req, res) {

    var rpta = {};
    //var usuario=new User(req.body);

    var empresa = req.body.empresa;
    var username = req.body.username;
    var password = req.body.password;
    var telefono = req.body.telefono;

    var correo = req.body.correo;
    var mensaje = req.body.mensaje;

    //res.status(200).jsonp(user);
    Maquina.findOne({ "username": username, "correo": correo }, function(err, usuario) {
        if (!usuario) {
            var user = new Maquina({

                "empresa": empresa,
                "username": username,
                "password": password,
                "telefono": telefono,
                "mensaje": mensaje,
                "correo": correo
            })




            user.save((err) => {
                if (err) return res.status(500).send(err.message);
                rpta = rptaregistro("Registro realizado!", 1);
                res.status(200).jsonp(rpta)
                console.log(rpta);
                let smtpTransport = nodemailer.createTransport({
                    service: "Gmail", // sets automatically host, port and connection security settings
                    auth: {
                        user: "diegoalonso.renteria@gmail.com",
                        pass: "webcamdelima123"
                    }
                });
                smtpTransport.sendMail({ //email options
                    from: "diegoalonso.renteria@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
                    to: user.correo, // receiver
                    subject: "Registro exitoso", // subject
                    text: "Su registro para el servicio de packbot de CRENTERIA S.A.C se ha realizado con éxito!" // body
                }, function(error, response) { //callback
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + response.message);
                    }

                    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                });;
            });



        } else {
            res.status(200).jsonp(rpta);
        }

    })


}
exports.procesarMensaje = function(req, res) {


    var nombre = "Hola" + " " + "me da gusto verte!, soy el packbot en que te puedo ayudar?";
    // console.log(nombre)
    try {
        var speech = 'empty speech';
        if (req.body) {
            console.log('hook request');

            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;

                    speech += '';
                }

                if (requestBody.result.action === 'greetings') {
                    speech += nombre;
                }
            }
            var data = [{ "Model": "Volumen de tolva ", "CRLW-2A": "2.0 L", "CRLW-4A": "2.0 L", "CRLW-6A": "2.0 L" },
                { "Model": "Módulos de pesaje", "CRLW-2A": "6", "CRLW-4A": "6", "CRLW-6A": "6" },
                { "Model": "Peso máx descarga por tolva", "CRLW-2A": "5.0 kg", "CRLW-4A": "5.0 kg", "CRLW-6A": "5.0 kg" },
                { "Model": "Peso máx descarga en combinación", "CRLW-2A": "10.0 kg", "CRLW-4A": "20.0 kg", "CRLW-6A": "30.0 kg" },
                { "Model": "Velocidad max", "CRLW-2A": "30 ppm", "CRLW-4A": "50 ppm", "CRLW-6A": "70 ppm" },
                { "Model": "Exactitud", "CRLW-2A": "+/- 0.2 %", "CRLW-4A": "+/- 0.2 %", "CRLW-6A": "+/- 0.2 %" },
                { "Model": "Alimentación", "CRLW-2A": "220VAC/50Hz", "CRLW-4A": "220VAC/50Hz", "CRLW-6A": "220VAC/50Hz" },
                { "Model": "Potencia", "CRLW-2A": "0.5 kW", "CRLW-4A": "0.8 kW", "CRLW-6A": "1.0 kW" },
                { "Model": "Dimensiones", "CRLW-2A": "940 x 700 x 1580 mm", "CRLW-4A": "1100 x 1000 x 1820 mm", "CRLW-6A": "1300 x 1300 x 1500 mm" },
                { "Model": "Peso", "CRLW-2A": "300 kg", "CRLW-4A": "400 kg", "CRLW-6A": "450 kg" }
            ]
        }
        return res.json({
            speech: data,
            displayText: speech,
            source: 'apiai-webhook-sample',
            data: {}
        });



    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }


};

//cargar entities al api

exports.cargarEntities = function(req, res) {
        res.status(200);
    }
    //obtener entities del api
exports.obtenerEntities = function(req, res) {
    var config = {
        headers: { 'Authorization': 'Bearer 0511eed9bbce47fb877d7edc87710c40' }
    };
    axios.get('https://api.api.ai/v1/entities?v=20150910', config)
        .then(function(response) {
            console.log(response.data);
            console.log(response.status);
            res.status(200).jsonp(response.data);
        })

}
exports.enviarInformacion = function(req, res) {

    /************/
    var config = {
        headers: {
            'Authorization': 'Bearer 40ed04452fc84c90809b007967864bfa'

        }
    };
    axios.post('https://api.api.ai/v1/query?v=20150910', {
        query: req.params.mensaje,
        lang: "es",
        sessionId: "packbot"
    }, config)

    .then(function(response) {
            console.log(response.data);
            res.status(200).jsonp(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })


}