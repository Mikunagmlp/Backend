const express = require('express');
const router = new express.Router();
const User = require('../../models/usuario');
const { getSearch, getUsuario, getRolesUsuario, getUsuarioDisabled } = require('../../controllers/administrador.controller');
const Rol = require('../../models/rol');
const passportConfig = require('../../passport/local-auth');

router.post('/administracion/user/registro', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), async (req, res) => {
    const { NombreCompleto, Email, Password, Telefono, Direccion, Genero, Estado, Rols } = req.body;

    try {
        const newUser = new User({ NombreCompleto, Email, Password, Telefono, Direccion, Genero, Estado, Rols });
        newUser.Password = await newUser.encryptPassword(Password);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/administracion/users', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), async (req, res) => {
    try {
        let userPermiso = [];
        await User.find({ Estado: true })
            .populate('Rols.IdRol')
            .exec((err, userRol) => {
                if (!err) {
                    if (userRol && userRol.length && userRol.length > 0) {
                        userRol.forEach(data => {
                            let obj = {
                                _id: data._id,
                                NombreCompleto: data.NombreCompleto,
                                Email: data.Email,
                                Telefono: data.Telefono,
                                Direccion: data.Direccion,
                                Genero: data.Genero,
                                Estado: data.Estado,
                                Rols: data.Rols
                            };

                            userPermiso.push(obj);
                        });
                    }
                }
                res.status(200).json(userPermiso);
            });

    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/administracion/user/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreCompleto', 'Email', 'Telefono', 'Direccion', 'Genero', 'Rols', 'Estado'];
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

router.put('/administracion/user/eliminar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), async (req, res) => {
    try {
        const { Estado } = req.body;
        await User.findByIdAndUpdate(req.params.id, {
            Estado: Estado
        });
        res.json({ message: 'Usuario Desactivado' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/administracion/user/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getUsuario);

//localhost:3000/administracion/search/user?q=test
router.get('/administracion/search/user', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getSearch);

//localhost:3000/administracion/rolesusuario?q=tecnico2 el nombre debe ser igual rol
router.get('/administracion/rolesusuario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getRolesUsuario);

router.get('/administracion/usersdisabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getUsuarioDisabled);
module.exports = router;
