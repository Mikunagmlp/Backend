const express= require('express');
const router = new express.Router();

router.get('/administracion/user/registro',async(req,res)=>{
    res.send('Estamos en administracion Registro de usuario');
} )

router.get('/administracion/user/editar',async(req,res)=>{
 res.send('Estamos en administracion Editar de usuario')
});

router.get('/administracion/user/permisos',async(req,res)=>{
    res.send('Estamos en administracion permisos de usuari')
});

router.get('/administracion/user/crearrol',async(req,res)=>{
    res.send('Estamos en administracion Crear nuevo rol')
});
module.exports= router;