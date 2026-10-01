const mongoose = require('mongoose');

// Definición del esquema para los usuarios
const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

// Crear el modelo Usuario
module.exports = mongoose.model('Usuario', usuarioSchema);