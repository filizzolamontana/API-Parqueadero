const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },

    tipo: {
        type: String,
        required: true
    },

    espacio: {
        type: String,
        required: true
    },

    horaEntrada: {
        type: Date,
        required: true,
        default: Date.now
    },

    horaSalida: {
        type: Date,
        default: null
    },

    estado: {
        type: String,
        required: true,
        default: 'Activo'
    }
});

module.exports = mongoose.model('Registro', registroSchema);