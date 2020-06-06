const express = require('express');
// creamos el router para todas nuestras peticiones
const router = new express.Router();

const Usuario = require('../models/usuario');

// registar Usuario
router.post('/usuario/registrar', async (req, res) => {
    const usuario = Usuario(req.body);

    try {
        // guardamos al usuario
        await usuario.save();

        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login Usuario
router.post('/usuario/login', async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;

    try {
        const usuario = await Usuario.encontrarUsuario( correo, password );

        res.send( usuario );
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;