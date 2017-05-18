const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    empresa: String,
    username: String,
    password: String,
    telefono: Number,
    mensaje: String,
    correo: String

});

module.exports = mongoose.model('users', usuarioSchema);