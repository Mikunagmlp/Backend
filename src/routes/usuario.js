const express = require('express');
// creamos el router para todas nuestras peticiones
const router = new express.Router();

const User = require('../models/usuario');

// registar Usuario
router.post('/user/registrar', async (req, res) => {
    const user = User(req.body);

    try {
        // guardamos al usuario
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login Usuario
router.post('/user/login', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    try {
        const user = await User.encontrarUsuario( email, password );

        res.send( user );
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;
