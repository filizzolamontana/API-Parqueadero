const express = require('express');
const router = express.Router();

const Registro = require('../models/Registro');

// CREAR - POST
router.post('/', async(req, res) => {
    try {
        const registro = new Registro(req.body);
        const registroGuardado = await registro.save();

        res.status(201).json({
            mensaje: 'Registro creado correctamente',
            registro: registroGuardado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el registro',
            error: error.message
        });
    }
});

// CONSULTAR TODOS - GET
router.get('/', async(req, res) => {
    try {
        const registros = await Registro.find();

        res.json(registros);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar los registros',
            error: error.message
        });
    }
});

// CONSULTAR UNO - GET
router.get('/:id', async(req, res) => {
    try {
        const registro = await Registro.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({
                mensaje: 'Registro no encontrado'
            });
        }

        res.json(registro);
    } catch (error) {
        res.status(400).json({
            mensaje: 'ID no válido',
            error: error.message
        });
    }
});

// ACTUALIZAR - PUT
router.put('/:id', async(req, res) => {
    try {
        const registroActualizado = await Registro.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true
            }
        );

        if (!registroActualizado) {
            return res.status(404).json({
                mensaje: 'Registro no encontrado'
            });
        }

        res.json({
            mensaje: 'Registro actualizado correctamente',
            registro: registroActualizado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el registro',
            error: error.message
        });
    }
});

// ELIMINAR - DELETE
router.delete('/:id', async(req, res) => {
    try {
        const registroEliminado = await Registro.findByIdAndDelete(
            req.params.id
        );

        if (!registroEliminado) {
            return res.status(404).json({
                mensaje: 'Registro no encontrado'
            });
        }

        res.json({
            mensaje: 'Registro eliminado correctamente',
            registro: registroEliminado
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al eliminar el registro',
            error: error.message
        });
    }
});

module.exports = router;