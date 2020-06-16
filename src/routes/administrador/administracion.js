const express = require('express');
const router = new express.Router();
const User = require('../../models/usuario');

router.post('/administracion/user/registro', async (req, res) => {
    const { NombreCompleto, Email, Password, Telefono, Direccion, Genero, Estado } = req.body;
    //const user = User(req.body);
    try {
        const newUser = new User({ NombreCompleto, Email, Password, Telefono, Direccion, Genero, Estado });
        newUser.Password = await newUser.encryptPassword(Password);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/administracion/users', async (req, res) => {
    try {
        const usuarios = await User.find();

        res.status(200).send(usuarios);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/administracion/user/editar/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreCompleto', 'Email', 'Telefono', 'Direccion', 'Genero'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const usuario = await User.findOne({ _id: req.params.id });

        if (!usuario) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            usuario[update] = req.body[update];
        });
        await usuario.save();

        res.send(usuario);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/administracion/user/eliminar/:id', async (req, res) => {
    try {
        const usuario = await User.findOneAndDelete({ _id: req.params.id });
        if (!usuario) {
            return res.status(404).send();
        }
        res.send({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/administracion/user/permisos', async (req, res) => {
    res.send('Estamos en administracion permisos de usuari')
});

router.post('/administracion/user/crearrol', async (req, res) => {
    res.send('Estamos en administracion Crear nuevo rol')
});
module.exports = router;
