const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const clientesMaquinasSchema = new Schema({

    codigo: String,
    cliente: String,
    modelo: String,
    MAQUINA: String,
    fecha_venta: String,
    velocidad: String,
    voltaje: String,
    uso: String,
    garantia: String,
    precio: String

});

module.exports = mongoose.model('clientes', clientesMaquinasSchema);