const express= require('express');
const router = new express.Router();
const User = require('../../models/usuario');

router.post('/administracion/user/registro',async(req,res)=>{
    const user = User(req.body);

    try {
        await user.save();

        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
} )

router.patch('/administracion/user/editar',async(req,res)=>{
 res.send('Estamos en administracion Editar de usuario')
});

router.get('/administracion/user/permisos',async(req,res)=>{
    res.send('Estamos en administracion permisos de usuari')
});

router.post('/administracion/user/crearrol',async(req,res)=>{
    res.send('Estamos en administracion Crear nuevo rol')
});
module.exports= router;
