const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');

// REGISTRO DE USUARIO - POST
router.post('/registro', async(req, res) => {
    try {
        const { usuario, password } = req.body;

        // Crear un nuevo usuario con los datos recibidos
        const nuevoUsuario = new Usuario({
            usuario,
            password
        });

        // Guardar el usuario en MongoDB
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: usuarioGuardado.usuario
        });

    } catch (error) {

        // Verificar si el usuario ya existe
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            });
        }

        res.status(400).json({
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
});

// INICIO DE SESIÓN - POST
router.post('/login', async(req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar el usuario en MongoDB
        const usuarioEncontrado = await Usuario.findOne({ usuario });

        // Verificar usuario y contraseña
        if (!usuarioEncontrado || usuarioEncontrado.password !== password) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        // Autenticación correcta
        res.json({
            mensaje: 'Autenticación satisfactoria'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
});

module.exports = router;