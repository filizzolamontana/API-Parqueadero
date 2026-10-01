const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Importar rutas
const registrosRoutes = require('./routes/registros');
const usuariosRoutes = require('./routes/usuarios');

// Middleware
app.use(bodyParser.json());

// Conexión con MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/parqueadero')
    .then(() => {
        console.log('MongoDB conectado correctamente.');
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
    });

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API del Parqueadero funcionando correctamente'
    });
});

// Rutas de registros
app.use('/api/registros', registrosRoutes);

// Rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});