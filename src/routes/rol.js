const express= require('express');
const router = new express.Router();

router.get('/rol/registrar',async(req,res)=>{
    res.send('Estamos en Rol Registro');
} )

router.get('/rol/editar',async(req,res)=>{
 res.send('Estamos en Rol Editar')
});

module.exports= router;