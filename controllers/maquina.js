'use strict'



const processMessage = require('../helpers/processMessage');

exports.obtenerMaquina=function(req,res){
	res.status(200),end();
}


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
}